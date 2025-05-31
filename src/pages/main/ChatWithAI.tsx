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
  message,
} from 'antd';
import {
  PlusOutlined,
  SendOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  SoundOutlined,
  UserOutlined,
} from '@ant-design/icons';
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
import { Upload } from 'antd';
import { DiffOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../app/hooks';
import { Spin } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../components/common/PrimaryButton';
import MediScanAILogo from '../../assets/photos/Logo.png';

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
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const tests = useAppSelector((state) => state.tests);
  const [currentUtterance, setCurrentUtterance] =
    useState<SpeechSynthesisUtterance | null>(null);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const location = useLocation();
  const {
    bloodTests,
    healthWarnings,
    geneticTests,
    geneticWarnings,
    vitaminTests,
    vitaminWarnings,
    urineTests,
    urineWarnings,
  } = location.state || {};
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const synth = window.speechSynthesis;

  const navigate = useNavigate();

  useEffect(() => {
    let testDescription = '';
    let warningsDescription = '';

    if (bloodTests) {
      const bloodTestsString = Object.entries(bloodTests)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      testDescription += `Blood Test Results: ${bloodTestsString}. `;

      if (healthWarnings?.length > 0) {
        warningsDescription += `Blood Test Warnings: ${healthWarnings.join('; ')}. `;
      }
    }

    if (geneticTests) {
      const geneticTestsString = Object.entries(geneticTests)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      testDescription += `Genetic Test Results: ${geneticTestsString}. `;

      if (geneticWarnings?.length > 0) {
        warningsDescription += `Genetic Test Warnings: ${geneticWarnings.join('; ')}. `;
      }
    }

    if (vitaminTests) {
      const vitaminTestsString = Object.entries(vitaminTests)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      testDescription += `Vitamin Test Results: ${vitaminTestsString}. `;

      if (vitaminWarnings?.length > 0) {
        warningsDescription += `Vitamin Test Warnings: ${vitaminWarnings.join('; ')}. `;
      }
    }

    if (urineTests) {
      const urineTestsString = Object.entries(urineTests)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      testDescription += `Urine Test Results: ${urineTestsString}. `;

      if (urineWarnings?.length > 0) {
        warningsDescription += `Urine Test Warnings: ${urineWarnings.join('; ')}. `;
      }
    }

    if (testDescription) {
      const finalPrompt = `${testDescription}${warningsDescription || 'No significant health warnings.'} Describe these results in detail and recommend a comprehensive plan of action.`;
      setInput(finalPrompt);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [
    bloodTests,
    healthWarnings,
    geneticTests,
    geneticWarnings,
    vitaminTests,
    vitaminWarnings,
    urineTests,
    urineWarnings,
    location.pathname,
    navigate,
  ]);

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

  useEffect(() => {
    return () => {
      synth.cancel();
    };
  }, []);

  const speakMessage = (e: React.MouseEvent, msg: Message) => {
    e.stopPropagation();
    if (currentUtterance && synth.speaking) {
      synth.cancel();
      setCurrentUtterance(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(msg.content);

    const voice = getVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.rate = 0.8;
    utterance.pitch = 1.2;

    setCurrentUtterance(utterance);
    synth.speak(utterance);

    utterance.onend = () => {
      setCurrentUtterance(null);
    };
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

  const analysisItems: MenuProps['items'] = [
    {
      label: <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>Blood Tests</Text>,
      key: 'blood-test',
      onClick: () => {
        if (tests.blood) {
          const bloodTests = Object.entries(tests?.blood || '');
          setInput(`Your blood test results: ${bloodTests.map(([key, value]) => `${key}: ${value}`).join(', ')} 
          Describe my results in detail and recommend a plan of action about my health warnings.`);
        } else {
          message.error('You have no blood tests.');
        }
      },
    },
    {
      label: <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>Urine Tests</Text>,
      key: 'urine-test',
      onClick: () => {
        if (tests.urine) {
          const urineTests = Object.entries(tests?.urine || '');
          setInput(`Your urine test results: ${urineTests.map(([key, value]) => `${key}: ${value}`).join(', ')} 
          Describe my results in detail and recommend a plan of action about my health warnings.`);
        } else {
          message.error('You have no urine tests.');
        }
      },
    },
    {
      label: <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>Vitamin Tests</Text>,
      key: 'vitamin-test',
      onClick: () => {
        if (tests.vitamin) {
          const vitaminsTests = Object.entries(tests?.vitamin || '');
          setInput(`Your vitamin test results: ${vitaminsTests.map(([key, value]) => `${key}: ${value}`).join(', ')} 
          Describe my results in detail and recommend a plan of action about my health warnings.`);
        } else {
          message.error('You have no vitamin tests.');
        }
      },
    },
    {
      label: <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>Genetic Tests</Text>,
      key: 'genetic-test',
      onClick: () => {
        if (tests.genetic) {
          const geneticTests = Object.entries(tests?.genetic || '');
          setInput(`Your genetic test results: ${geneticTests.map(([key, value]) => `${key}: ${value}`).join(', ')} 
          Describe my results in detail and recommend a plan of action about my health warnings.`);
        } else {
          message.error('You have no genetic tests.');
        }
      },
    },
  ];
  const featureItems: MenuProps['items'] = [
    {
      label: (
        <Dropdown trigger={['hover']} menu={{ items: analysisItems, style: { background: isDarkMode ? 'rgb(57, 92, 195)' : '#fff' } }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DiffOutlined style={{ color: isDarkMode ? '#ffffff' : '#000000' }} />
            <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>{t('chat.scanAnalysis')}</Text>
          </div>
        </Dropdown>
      ),
      key: 'scan-analysis',
    },
    {
      label: (
        <Upload
          showUploadList={false}
          accept=".pdf,.word"
          customRequest={async ({ file, onSuccess }) => {
            setLoading(true);
            const hide = message.loading('Parsing PDF...', 0);
            const reader = new FileReader();

            reader.onload = async () => {
              try {
                const base64 = (reader.result as string).split(',')[1];
                const res = await axios.post('/api/parse-pdf', {
                  fileBase64: base64,
                });
                setInput(res.data.text.trim());
                message.success('PDF parsed successfully');
                onSuccess?.({}, new XMLHttpRequest());
              } catch {
                message.error('Failed to parse PDF');
              } finally {
                hide();
                setLoading(false);
              }
            };

            reader.onerror = () => {
              hide();
              message.error('Failed to read PDF file');
              setLoading(false);
            };

            reader.readAsDataURL(file as Blob);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UploadOutlined style={{ color: isDarkMode ? '#ffffff' : '#000000' }} />
            <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>{t('chat.pdfUpload')}</Text>
            {loading && <Spin size="small" style={{ marginLeft: 8 }} />}
          </div>
        </Upload>
      ),
      key: 'upload-pdf',
    },
  ];

  return (
    <Layout className={`chat-with-ai ${isDarkMode ? 'dark' : ''}`} style={{ height: '94vh', borderBottom: '1px solid #ddd' }}>
      <Sider
        width={240}
        style={{
          background: isDarkMode ? 'rgb(38, 63, 137)' : '#fff',
          padding: 16,
          borderRight: '1px solid rgb(49, 82, 181)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PrimaryButton
            icon={<PlusOutlined />}
            style={{ width: '200px' }}
            onClick={createNewChat}
          >
            {t('chat.newChat')}
          </PrimaryButton>
        </div>
        {Object.entries(grouped).map(([label, chats]) => (
          <div key={label} style={{ marginBottom: 12 }}>
            <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`} type="secondary" style={{ marginLeft: 8 }}>
              {label}
            </Text>
            <List
              size="small"
              dataSource={chats}
              renderItem={(chat) => (
                <List.Item
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`chat-item-hover ${isDarkMode ? 'dark' : ''}`}
                  style={{
                    cursor: 'pointer',
                    background:
                      chat.id !== selectedChatId
                        ? isDarkMode ? 'rgb(99, 121, 185)' : 'rgb(255, 255, 255)'
                        : isDarkMode ? 'rgb(38, 63, 137)' : '#fff',
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
                        <Text className={`chat-item-title ${isDarkMode ? 'dark' : ''}`} strong style={{ flex: 1 }}>
                          {chat.title}
                        </Text>
                        <Dropdown
                          className={`chat-with-ai-dropdown ${isDarkMode ? 'dark' : ''}`}
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
                              style={{
                                background: isDarkMode ? 'rgb(38, 63, 137)' : '#fff',
                                border: 'none',
                              }}
                            >
                              <Menu.Item style={{ color: isDarkMode ? '#ffffff' : '#000000' }} key="rename">
                                {t('chat.rename')}
                              </Menu.Item>
                              <Menu.Item style={{ color: isDarkMode ? '#ffffff' : '#000000' }} key="delete" danger>
                                {t('chat.delete')}
                              </Menu.Item>
                            </Menu>
                          }
                        >
                          <MoreOutlined
                            onClick={(e) => e.stopPropagation()}
                            style={{ cursor: 'pointer', color: isDarkMode ? '#ffffff' : '#000000' }}
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
                  background: msg.role === 'user'
                    ? isDarkMode
                      ? 'linear-gradient(135deg, rgba(56, 128, 255, 0.9) 0%, rgba(0, 80, 200, 0.9) 100%)'
                      : 'linear-gradient(135deg, rgba(100, 149, 237, 0.15) 0%, rgba(66, 135, 245, 0.15) 100%)'
                    : isDarkMode
                      ? 'linear-gradient(135deg, rgba(28, 52, 125, 0.7) 0%, rgba(14, 36, 90, 0.7) 100%)'
                      : 'linear-gradient(135deg, rgba(240, 248, 255, 0.95) 0%, rgba(225, 239, 255, 0.95) 100%)',
                  padding: '12px 16px',
                  border: msg.role === 'user'
                    ? isDarkMode ? '1px solid rgba(100, 149, 237, 0.5)' : '1px solid rgba(56, 128, 255, 0.2)'
                    : 'none',
                  borderRadius: '15px',
                  width: '100%',
                  maxWidth: 720,
                  boxShadow: isDarkMode
                    ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                    : '0 2px 12px rgba(56, 128, 255, 0.15)',
                  whiteSpace: 'pre-wrap',
                  marginBottom: '36px',
                  position: 'relative',
                }}
              >
                <div className="message-buttons">
                  <Button
                    style={{ color: isDarkMode ? '#ffffff' : 'black' }}
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(msg.content);
                      message.success('Copied to clipboard!');
                    }}
                  />
                  <Button
                    style={{ color: isDarkMode ? '#ffffff' : 'black' }}
                    type="text"
                    icon={<SoundOutlined />}
                    onClick={(e) => speakMessage(e, msg)}
                  />
                </div>
                <>
                  {msg.role === 'user' ? <UserOutlined style={{ color: isDarkMode ? '#ffffff' : 'black' }} /> : <img src={MediScanAILogo} alt="MediScan AI" style={{ width: '30px', height: '30px' }} />}
                </>
                <Text
                  style={{
                    width: '100%',
                    color: msg.role === 'user' && isDarkMode ? '#ffffff' : isDarkMode ? '#ffffff' : 'black',
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
            background: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown
              trigger={['click']}
              menu={{
                items: featureItems,
                style: {
                  background: isDarkMode ? 'rgb(57, 92, 195)' : '#fff',
                  padding: 0,
                },
              }}
            >
              <PlusCircleOutlined
                style={{
                  fontSize: 20,
                  color: loading ? '#ccc' : '#1890ff',
                  cursor: 'pointer',
                  marginRight: 10,
                }}
              />
            </Dropdown>

            <div
              style={{
                position: 'relative',
                width: '100%',
                minWidth: 600,
              }}
            >
              <Input.TextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                autoSize={{ minRows: 1, maxRows: 7 }}
                style={{
                  borderRadius: 24,
                  padding: '10px 16px',
                  margin: '16px auto',
                  maxHeight: 10,
                }}
                className="custom-scrollbar"
                disabled={loading}
              />
              {loading ? (
                <Spin
                  size="small"
                  style={{ position: 'absolute', right: 16, bottom: 28 }}
                />
              ) : (
                <SendOutlined
                  onClick={sendMessage}
                  style={{
                    fontSize: 20,
                    color: '#1890ff',
                    cursor: 'pointer',
                    position: 'absolute',
                    right: 16,
                    bottom: 28,
                    zIndex: 1000,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ChatWithAi;
