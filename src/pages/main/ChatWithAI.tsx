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
  type MenuProps,
  type UploadProps,
  message,
} from 'antd';
import {
  PlusOutlined,
  SendOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  SoundOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
// import * as pdfjsLib from 'pdfjs-dist';
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
import { Upload } from 'antd';
import { DiffOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../app/hooks';
import { Spin } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

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
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const tests = useAppSelector((state) => state.tests);
  const [currentUtterance, setCurrentUtterance] =
    useState<SpeechSynthesisUtterance | null>(null);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const getVoice = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    if (language === 'ru') {
      const russianVoice = voices.find(
        (voice) => voice.lang === 'ru-RU' || voice.lang.startsWith('ru-')
      );
      return (
        russianVoice || voices.find((voice) => voice.lang === 'en-US') || null
      );
    } else {
      return voices.find((voice) => voice.lang === 'en-US') || null;
    }
  };

  const speakMessage = (e: React.MouseEvent, msg: Message) => {
    e.stopPropagation();
    const synth = window.speechSynthesis;

    if (currentUtterance && synth.speaking) {
      synth.cancel();
      setCurrentUtterance(null);
      return;
    }

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(msg.content);

    const voice = getVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    // Adjust speech parameters
    utterance.rate = 0.9; // Slower speed for better comprehension
    utterance.pitch = 1; // Normal pitch

    setCurrentUtterance(utterance);
    synth.speak(utterance);

    utterance.onend = () => {
      setCurrentUtterance(null);
    };
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ru' : 'en'));
  };

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
    if (!input.trim()) return;
    const user = auth.currentUser;
    if (!user) {
      antdMsg.error('You must be logged in.');
      return;
    }

    let chatId = selectedChatId;
    let chatIndex = chats.findIndex((chat) => chat.id === chatId);
    let originalChat: Chat;

    if (!chatId || chatIndex === -1) {
      const now = new Date().toISOString();
      chatId = uuidv4();
      originalChat = {
        id: chatId,
        title: input.slice(0, 20) + '...',
        createdAt: now,
        lastUpdated: now,
        messages: [],
      };
      await setDoc(doc(db, 'users', user.uid, 'chats', chatId), originalChat);
      setChats([originalChat, ...chats]);
      setSelectedChatId(chatId);
      chatIndex = 0;
    } else {
      originalChat = chats[chatIndex];
    }

    const userMsg: Message = { role: 'user', content: input };
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

      await setDoc(doc(db, 'users', user.uid, 'chats', chatId), finalChat, {
        merge: true,
      });
    } catch (err) {
      console.error(err);
      antdMsg.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const grouped = groupChatsByDate(chats);

  // const handlePdfUpload = (file: File) => {
  //   if (file.type !== 'application/pdf') {
  //     message.error('You can only upload PDF files!');
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = async (e) => {
  //     try {
  //       const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);
  //       const pdf = await pdfjsLib.getDocument(typedarray).promise;

  //       let fullText = '';
  //       for (let i = 1; i <= pdf.numPages; i++) {
  //         const page = await pdf.getPage(i);
  //         const textContent = await page.getTextContent();
  //         const pageText = textContent.items.map((item: any) => item.str).join(' ');
  //         fullText += pageText + '\n';
  //       }

  //       // Set the input with extracted PDF text for analysis
  //       setInput(`Analyze the following PDF content:\n${fullText}`);

  //       // Optionally, send the message automatically
  //       sendMessage();
  //     } catch (error) {
  //       message.error('Failed to parse PDF file');
  //       console.error(error);
  //     }
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  const props: UploadProps = {
    accept: 'application/pdf',
    beforeUpload: (file) => {
      const isPdf = file.type === 'application/pdf';
      if (!isPdf) {
        message.error('You can only upload PDF files!');
      }
      return isPdf || Upload.LIST_IGNORE;
    },
    // onChange(info) {
    //   if (info.file.status === 'done' || info.file.originFileObj) {
    //     handlePdfUpload(info.file.originFileObj as File);
    //   }
    // },
  };

  const analysisItems: MenuProps['items'] = [
    {
      label: <Text>Blood Tests</Text>,
      key: 'blood-test',
      onClick: () => {
        if (tests.blood) {
          const bloodTests = Object.entries(tests?.blood || '');
          setInput(`${bloodTests.map(([key, value]) => `${key}: ${value}`).join(', ')} 
          Describe my results in detail and recommend a plan of action about my health warnings.`);
        }
      },
    },
    {
      label: <Text>Urine Tests</Text>,
      key: 'urine-test',
      onClick: () => {
        if (tests.urine) {
          const urineTests = Object.entries(tests?.urine || '');
          setInput(`${urineTests.map(([key, value]) => `${key}: ${value}`).join(', ')} 
          Describe my results in detail and recommend a plan of action about my health warnings.`);
        }
      },
    },
    {
      label: <Text>Vitamin Tests</Text>,
      key: 'vitamin-test',
      onClick: () => {
        if (tests.vitamin) {
          const vitaminsTests = Object.entries(tests?.vitamin || '');
          setInput(`${vitaminsTests.map(([key, value]) => `${key}: ${value}`).join(', ')} 
          Describe my results in detail and recommend a plan of action about my health warnings.`);
        }
      },
    },
    {
      label: <Text>Genetic Tests</Text>,
      key: 'genetic-test',
      onClick: () => {
        if (tests.genetic) {
          const geneticTests = Object.entries(tests?.genetic || '');
          setInput(`${geneticTests.map(([key, value]) => `${key}: ${value}`).join(', ')} 
          Describe my results in detail and recommend a plan of action about my health warnings.`);
        }
      },
    },
  ];

  const featureItems: MenuProps['items'] = [
    {
      label: (
        <Dropdown trigger={['hover']} menu={{ items: analysisItems }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DiffOutlined />
            <Text>Scan Analysis</Text>
          </div>
        </Dropdown>
      ),
      key: 'scan-analysis',
    },
    {
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UploadOutlined />
          <Upload {...props}>
            <Text>PDF Upload</Text>
          </Upload>
        </div>
      ),
      key: 'upload-pdf',
    },
  ];

  return (
    <Layout style={{ height: '94vh', borderBottom: '1px solid #ddd' }}>
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
                className="message-container"
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
                  marginBottom: '36px',
                  position: 'relative',
                }}
              >
                <div className="message-buttons">
                  <Button
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(msg.content);
                      message.success('Copied to clipboard!');
                    }}
                  />
                  <Button
                    type="text"
                    icon={<SoundOutlined />}
                    onClick={(e) => speakMessage(e, msg)}
                  />
                </div>
                <Text
                  style={{
                    width: '100%',
                    color: msg.role === 'user' ? '#000' : '#000',
                    paddingRight: '24px',
                  }}
                >
                  <strong>
                    {msg.role === 'user' ? 'You' : 'MediScan AI'}:
                  </strong>{' '}
                  {msg.content}
                </Text>
              </div>
            </div>
          ))}
          {loading && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '10px',
              }}
            >
              <Spin tip="MediScan AI is thinking..." />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown trigger={['click']} menu={{ items: featureItems }}>
              <PlusCircleOutlined
                style={{
                  fontSize: 20,
                  color: loading ? '#ccc' : '#1890ff',
                  cursor: 'pointer',
                  marginRight: 10,
                }}
              />
            </Dropdown>

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
                loading ? (
                  <Spin size="small" />
                ) : (
                  <SendOutlined
                    onClick={sendMessage}
                    style={{
                      fontSize: 20,
                      color: '#1890ff',
                      cursor: 'pointer',
                    }}
                  />
                )
              }
              disabled={loading}
              style={{
                borderRadius: 24,
                padding: '10px 16px',
                maxWidth: 600,
                minWidth: 600,
                margin: '16px auto',
              }}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ChatWithAi;
