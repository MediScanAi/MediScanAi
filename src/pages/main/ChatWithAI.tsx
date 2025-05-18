import { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Button,
  List,
  Typography,
  Input,
  message as antdMsg,
} from 'antd';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../api/authApi';
import { deleteDoc } from 'firebase/firestore';
import { DeleteOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Text } = Typography;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  messages: Message[];
  createdAt: string;
}

const ChatWithAi = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const createNewChat = async () => {
    const user = auth.currentUser;
    if (!user) {
      antdMsg.error('You must be logged in to create a chat.');
      return;
    }

    const newChat: Chat = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
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

  const sendMessage = async () => {
    if (!input.trim() || !selectedChatId) return;

    const user = auth.currentUser;
    if (!user) {
      antdMsg.error('You must be logged in.');
      return;
    }

    const userMsg: Message = { role: 'user', content: input };
    const chatIndex = chats.findIndex((chat) => chat.id === selectedChatId);
    const updatedChat = { ...chats[chatIndex] };
    updatedChat.messages.push(userMsg);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', {
        messages: updatedChat.messages,
      });

      const aiMsg: Message = res.data.choices[0].message;
      updatedChat.messages.push(aiMsg);

      const newChats = [...chats];
      newChats[chatIndex] = updatedChat;
      setChats(newChats);

      await setDoc(
        doc(db, 'users', user.uid, 'chats', selectedChatId),
        updatedChat,
        { merge: true }
      );
    } catch (err) {
      console.error(err);
      antdMsg.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ height: '80vh' }}>
      <Sider
        width={240}
        style={{
          background: '#f9f9f9',
          padding: 16,
          borderRight: '1px solid #ddd',
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          block
          style={{ marginBottom: 24 }}
          onClick={createNewChat}
        >
          New Chat
        </Button>
        <List
          size="small"
          dataSource={chats}
          renderItem={(chat) => (
            <List.Item
              onClick={() => setSelectedChatId(chat.id)}
              style={{
                cursor: 'pointer',
                background: chat.id === selectedChatId ? '#e6f7ff' : undefined,
                borderRadius: 6,
                marginBottom: 4,
                padding: 8,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text
                  strong
                  onClick={() => setSelectedChatId(chat.id)}
                  style={{ cursor: 'pointer', flex: 1 }}
                >
                  {new Date(chat.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>

                <DeleteOutlined
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                />
              </div>
            </List.Item>
          )}
        />
      </Sider>

      <Content
        style={{
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: 8,
            marginBottom: 16,
          }}
        >
          {selectedChat?.messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 12,
                padding: '8px 12px',
                background: msg.role === 'user' ? '#e6f7ff' : '#fafafa',
                borderRadius: 8,
                maxWidth: '80%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Text>
                <strong>{msg.role === 'user' ? 'You' : 'MediScan AI'}:</strong>{' '}
                {msg.content}
              </Text>
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
            margin: '0 auto',
          }}
        />
      </Content>
    </Layout>
  );
};

export default ChatWithAi;
