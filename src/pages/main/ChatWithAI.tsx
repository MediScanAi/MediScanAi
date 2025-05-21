import { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Button,
  List,
  Typography,
  Input,
  message as antdMsg,
  Dropdown,
  Menu,
} from 'antd';
import { PlusOutlined, SendOutlined, MoreOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../api/authApi';
import '../../assets/styles/chatwithai.css';
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';

const { Sider, Content } = Layout;
const { Text } = Typography;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  lastUpdated?: string;
}

const ChatWithAi = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const snapshot = await getDocs(
            collection(db, 'users', user.uid, 'chats')
          );
          const chatData: Chat[] = snapshot.docs.map(
            (doc) => doc.data() as Chat
          );
          chatData.sort(
            (a, b) =>
              new Date(b.lastUpdated || b.createdAt).getTime() -
              new Date(a.lastUpdated || a.createdAt).getTime()
          );
          setChats(chatData);
          if (chatData.length) setSelectedChatId(chatData[0].id);
        } catch (err) {
          console.error('Error loading chats:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    });
  }, [selectedChat?.messages.length]);

  const groupChatsByDate = (chats: Chat[]) => {
    const groups: { [key: string]: Chat[] } = {};
    chats.forEach((chat) => {
      const date = new Date(chat.lastUpdated || chat.createdAt);
      let label = format(date, 'MMM d, yyyy');
      if (isToday(date)) label = 'Today';
      else if (isYesterday(date)) label = 'Yesterday';
      else if (differenceInDays(new Date(), date) < 7)
        label = format(date, 'EEEE');
      if (!groups[label]) groups[label] = [];
      groups[label].push(chat);
    });
    return groups;
  };

  const createNewChat = async () => {
    const user = auth.currentUser;
    if (!user) {
      antdMsg.error('You must be logged in to create a chat.');
      return;
    }
    const now = new Date().toISOString();
    const newChat: Chat = {
      id: uuidv4(),
      title: 'New Chat',
      createdAt: now,
      lastUpdated: now,
      messages: [],
    };
    try {
      await setDoc(doc(db, 'users', user.uid, 'chats', newChat.id), newChat);
      setChats([newChat, ...chats]);
      setSelectedChatId(newChat.id);
      setInput('');
    } catch (err) {
      console.error('Failed to create new chat:', err);
      antdMsg.error('Could not create new chat');
    }
  };

  const deleteChat = async (chatId: string) => {
    const user = auth.currentUser;
    if (!user) {
      antdMsg.error('You must be logged in.');
      return;
    }
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'chats', chatId));
      const newChats = chats.filter((chat) => chat.id !== chatId);
      setChats(newChats);
      if (selectedChatId === chatId) {
        setSelectedChatId(newChats.length ? newChats[0].id : null);
      }
      antdMsg.success('Chat deleted');
    } catch (err) {
      console.error('Failed to delete chat:', err);
      antdMsg.error('Could not delete chat');
    }
  };

  const renameChat = async (chatId: string, newTitle: string) => {
    const user = auth.currentUser;
    if (!user) return;
    const updatedChats = chats.map((chat) =>
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    );
    setChats(updatedChats);
    await setDoc(
      doc(db, 'users', user.uid, 'chats', chatId),
      { title: newTitle },
      { merge: true }
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedChatId) return;
    const user = auth.currentUser;
    if (!user) {
      antdMsg.error('You must be logged in.');
      return;
    }

    const userMsg: Message = { role: 'user', content: input };
    const chatIndex = chats.findIndex((chat) => chat.id === selectedChatId);
    if (chatIndex === -1) return;

    const originalChat = chats[chatIndex];
    const updatedUserMessages = [...originalChat.messages, userMsg];

    const updatedChat: Chat = {
      ...originalChat,
      messages: updatedUserMessages,
      lastUpdated: new Date().toISOString(),
      title:
        originalChat.title === 'New Chat' && updatedUserMessages.length === 1
          ? input.slice(0, 20) + '...'
          : originalChat.title,
    };

    const newChats = [...chats];
    newChats[chatIndex] = updatedChat;
    setChats(newChats);

    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', {
        messages: updatedChat.messages,
      });

      const aiMsg: Message = res.data.choices[0].message;
      const updatedMessagesWithAI = [...updatedChat.messages, aiMsg];

      const finalChat: Chat = {
        ...updatedChat,
        messages: updatedMessagesWithAI,
        lastUpdated: new Date().toISOString(),
      };

      const finalChats = [...newChats];
      finalChats[chatIndex] = finalChat;
      setChats(finalChats);

      await setDoc(
        doc(db, 'users', user.uid, 'chats', selectedChatId),
        finalChat,
        { merge: true }
      );
    } catch (err) {
      console.error(err);
      antdMsg.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const grouped = groupChatsByDate(chats);

  return (
    <Layout style={{ height: '95vh' }}>
      <Sider
        width={240}
        style={{
          background: '#fff',
          padding: 16,
          borderRight: '1px solid #ddd',
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          block
          style={{
            marginBottom: '15px',
            borderRadius: '10px',
            backgroundColor: '#1890ff',
          }}
          onClick={createNewChat}
        >
          New Chat
        </Button>
        {Object.entries(grouped).map(([label, chats]) => (
          <div key={label} style={{ marginBottom: 12 }}>
            <Text type="secondary" style={{ marginLeft: 8 }}>
              {label}
            </Text>
            <List
              size="small"
              dataSource={chats}
              renderItem={(chat) => (
                <List.Item
                  onClick={() => setSelectedChatId(chat.id)}
                  className={
                    chat.id !== selectedChatId
                      ? 'chat-item-hover'
                      : 'selected-chat'
                  }
                  style={{
                    cursor: 'pointer',
                    background:
                      chat.id === selectedChatId
                        ? 'rgb(255, 255, 255)'
                        : '#fff',
                    borderRadius: 10,
                    marginBottom: 8,
                    padding: 8,
                    borderBottom: 'none',
                    boxShadow:
                      chat.id === selectedChatId
                        ? '0 2px 6px rgba(0, 0, 0, 0.5)'
                        : 'none',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    {editingChatId === chat.id ? (
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onPressEnter={async () => {
                          await renameChat(chat.id, editingTitle);
                          setEditingChatId(null);
                        }}
                        onBlur={() => setEditingChatId(null)}
                        autoFocus
                        size="small"
                      />
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flex: 1,
                          gap: 8,
                        }}
                      >
                        <Text strong style={{ flex: 1 }}>
                          {chat.title}
                        </Text>
                        <Dropdown
                          trigger={['click']}
                          overlay={
                            <Menu
                              onClick={({ key }) => {
                                if (key === 'rename') {
                                  setEditingChatId(chat.id);
                                  setEditingTitle(chat.title);
                                } else if (key === 'delete') {
                                  deleteChat(chat.id);
                                }
                              }}
                            >
                              <Menu.Item key="rename">Rename</Menu.Item>
                              <Menu.Item key="delete" danger>
                                Delete
                              </Menu.Item>
                            </Menu>
                          }
                        >
                          <MoreOutlined
                            onClick={(e) => e.stopPropagation()}
                            style={{ cursor: 'pointer' }}
                          />
                        </Dropdown>
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </div>
        ))}
      </Sider>

      <Content style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            borderTop: '1px solid #ddd',
            borderBottom: '1px solid #ddd',
            flex: 1,
            overflowY: 'auto',
            padding: '16px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {selectedChat?.messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '4px 16px',
              }}
            >
              <div
                style={{
                  backgroundColor:
                    msg.role === 'user' ? 'rgb(255, 255, 255)' : '#f7f9ff',
                  color: '#000',
                  padding: '12px 16px',
                  borderRadius: '15px',
                  width: '100%',
                  maxWidth: 720,
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <Text style={{ width: '100%' }}>
                  <strong>
                    {msg.role === 'user' ? 'You' : 'MediScan AI'}:
                  </strong>{' '}
                  {msg.content}
                </Text>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          suffix={
            <SendOutlined
              onClick={sendMessage}
              style={{
                fontSize: 20,
                color: loading ? '#ccc' : '#1890ff',
                cursor: 'pointer',
              }}
            />
          }
          disabled={loading}
          style={{
            borderRadius: 24,
            padding: '10px 16px',
            maxWidth: 600,
            margin: '16px auto',
          }}
        />
      </Content>
    </Layout>
  );
};

export default ChatWithAi;
