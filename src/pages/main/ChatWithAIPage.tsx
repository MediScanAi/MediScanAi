import { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Button,
  List,
  Typography,
  Input,
  message as antdMsg,
  Dropdown,
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
import '../../assets/styles/pages/chat-with-ai-page.css';
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
import PrimaryButton from '../../components/common/buttons/PrimaryButton';
import MediScanAILogo from '../../assets/photos/Logo.webp';
import i18n from '../../i18n';

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
  const { t } = useTranslation('chatWithAI');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const tests = useAppSelector((state) => state.tests);
  const [currentUtterance, setCurrentUtterance] =
    useState<SpeechSynthesisUtterance | null>(null);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const location = useLocation();
  const {
    bloodTests,
    bloodWarnings,
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
      testDescription += t('chat.bloodTestResults', { bloodTestsString });

      if (bloodWarnings?.length > 0) {
        warningsDescription += t('chat.bloodTestWarnings', { bloodWarnings });
      }
    }

    if (geneticTests) {
      const geneticTestsString = Object.entries(geneticTests)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      testDescription += t('chat.geneticTestResults', { geneticTestsString });

      if (geneticWarnings?.length > 0) {
        warningsDescription += t('chat.geneticTestWarnings', {
          geneticWarnings,
        });
      }
    }

    if (vitaminTests) {
      const vitaminTestsString = Object.entries(vitaminTests)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      testDescription += t('chat.vitaminTestResults', { vitaminTestsString });

      if (vitaminWarnings?.length > 0) {
        warningsDescription += t('chat.vitaminTestWarnings', {
          vitaminWarnings,
        });
      }
    }

    if (urineTests) {
      const urineTestsString = Object.entries(urineTests)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      testDescription += t('chat.urineTestResults', { urineTestsString });

      if (urineWarnings?.length > 0) {
        warningsDescription += t('chat.urineTestWarnings', { urineWarnings });
      }
    }

    if (testDescription) {
      const finalPrompt = `${testDescription}${warningsDescription || t('chat.noSignificantHealthWarnings')} ${t('chat.describeResults')} ${t('chat.recommendPlan')}`;
      setInput(finalPrompt);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [
    bloodTests,
    bloodWarnings,
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

    if (i18n.language === 'ru') {
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
      if (isToday(date)) label = t('chat.today');
      else if (isYesterday(date)) label = t('chat.yesterday');
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
      antdMsg.error(t('chat.youMustBeLoggedInToCreateChat'));
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
      antdMsg.error(t('chat.couldNotCreateNewChat'));
    }
  };

  const deleteChat = async (chatId: string) => {
    const user = auth.currentUser;
    if (!user) {
      antdMsg.error(t('chat.youMustBeLoggedInToDeleteChat'));
      return;
    }
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'chats', chatId));
      const newChats = chats.filter((chat) => chat.id !== chatId);
      setChats(newChats);
      if (selectedChatId === chatId) {
        setSelectedChatId(newChats.length ? newChats[0].id : null);
      }
      antdMsg.success(t('chat.chatDeleted'));
    } catch (err) {
      console.error('Failed to delete chat:', err);
      antdMsg.error(t('chat.couldNotDeleteChat'));
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
      antdMsg.error(t('chat.youMustBeLoggedInToSendMessage'));
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
      antdMsg.error(t('chat.failedToSendMessage'));
    } finally {
      setLoading(false);
    }
  };

  const grouped = groupChatsByDate(chats);

  const analysisItems: MenuProps['items'] = [
    {
      label: (
        <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>
          {t('chat.bloodTests')}
        </Text>
      ),
      key: 'blood-test',
      onClick: () => {
        if (tests.blood) {
          const bloodTests = Object.entries(tests?.blood || '');
          setInput(
            t('chat.bloodTestResults', {
              bloodTestsString: bloodTests
                .map(([key, value]) => `${key}: ${value}`)
                .join(', '),
            }) +
              t('chat.describeResults') +
              t('chat.recommendPlan')
          );
        } else {
          message.error(t('chat.noBloodTests'));
        }
      },
    },
    {
      label: (
        <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>
          {t('chat.urineTests')}
        </Text>
      ),
      key: 'urine-test',
      onClick: () => {
        if (tests.urine) {
          const urineTests = Object.entries(tests?.urine || '');
          setInput(
            t('chat.urineTestResults', {
              urineTestsString: urineTests
                .map(([key, value]) => `${key}: ${value}`)
                .join(', '),
            }) +
              t('chat.describeResults') +
              t('chat.recommendPlan')
          );
        } else {
          message.error(t('chat.noUrineTests'));
        }
      },
    },
    {
      label: (
        <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>
          {t('chat.vitaminTests')}
        </Text>
      ),
      key: 'vitamin-test',
      onClick: () => {
        if (tests.vitamin) {
          const vitaminsTests = Object.entries(tests?.vitamin || '');
          setInput(
            t('chat.vitaminTestResults', {
              vitaminTestsString: vitaminsTests
                .map(([key, value]) => `${key}: ${value}`)
                .join(', '),
            }) +
              t('chat.describeResults') +
              t('chat.recommendPlan')
          );
        } else {
          message.error(t('chat.noVitaminTests'));
        }
      },
    },
    {
      label: (
        <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>
          {t('chat.geneticTests')}
        </Text>
      ),
      key: 'genetic-test',
      onClick: () => {
        if (tests.genetic) {
          const geneticTests = Object.entries(tests?.genetic || '');
          setInput(
            t('chat.geneticTestResults', {
              geneticTestsString: geneticTests
                .map(([key, value]) => `${key}: ${value}`)
                .join(', '),
            }) +
              t('chat.describeResults') +
              t('chat.recommendPlan')
          );
        } else {
          message.error(t('chat.noGeneticTests'));
        }
      },
    },
  ];
  const featureItems: MenuProps['items'] = [
    {
      label: (
        <Dropdown
          trigger={['hover']}
          menu={{
            items: analysisItems,
            style: { background: isDarkMode ? 'rgb(57, 92, 195)' : '#fff' },
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DiffOutlined style={{ color: isDarkMode ? '#ffffff' : 'black' }} />
            <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>
              {t('chat.scanAnalysis')}
            </Text>
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
            const hide = message.loading(t('chat.parsingPDF'), 0);
            const reader = new FileReader();

            reader.onload = async () => {
              try {
                const base64 = (reader.result as string).split(',')[1];
                const res = await axios.post('/api/parse-pdf', {
                  fileBase64: base64,
                });
                setInput(res.data.text.trim());
                message.success(t('chat.pdfParsedSuccessfully'));
                onSuccess?.({}, new XMLHttpRequest());
              } catch {
                message.error(t('chat.failedToParsePDF'));
              } finally {
                hide();
                setLoading(false);
              }
            };

            reader.onerror = () => {
              hide();
              message.error(t('chat.failedToReadPDF'));
              setLoading(false);
            };

            reader.readAsDataURL(file as Blob);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UploadOutlined
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            />
            <Text className={`chat-with-ai-label ${isDarkMode ? 'dark' : ''}`}>
              {t('chat.pdfUpload')}
            </Text>
            {loading && <Spin size="small" style={{ marginLeft: 8 }} />}
          </div>
        </Upload>
      ),
      key: 'upload-pdf',
    },
  ];

  return (
    <Layout className={`chat-with-ai ${isDarkMode ? 'dark' : ''}`}>
      <Sider
        width={240}
        style={{
          background: isDarkMode ? 'rgb(38, 63, 137)' : '#fff',
        }}
      >
        <div className="sider-div">
          <PrimaryButton
            icon={<PlusOutlined />}
            className="new-button"
            onClick={createNewChat}
          >
            {t('chat.newChat')}
          </PrimaryButton>
        </div>
        {Object.entries(grouped).map(([label, chats]) => (
          <div key={label} className="chats-list-container">
            <Text
              className={`chat-with-ai-label chat-list-label ${isDarkMode ? 'dark' : ''}`}
              type="secondary"
            >
              {label}
            </Text>
            <List
              size="small"
              dataSource={chats}
              className="chats-list-container"
              renderItem={(chat) => (
                <List.Item
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`chat-item-hover ${isDarkMode ? 'dark' : ''}`}
                  style={{
                    background:
                      chat.id !== selectedChatId
                        ? isDarkMode
                          ? 'transparent'
                          : 'rgb(255, 255, 255)'
                        : isDarkMode
                          ? 'rgb(38, 63, 137)'
                          : '#fff',
                    boxShadow:
                      chat.id === selectedChatId
                        ? '0 2px 6px rgba(0, 0, 0, 0.5)'
                        : 'none',
                  }}
                >
                  <div className="list-item-div">
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
                      <>
                        <Text
                          className={`chat-item-title ${isDarkMode ? 'dark' : ''}`}
                          strong
                        >
                          {chat.title}
                        </Text>
                        <Dropdown
                          className={`chat-with-ai-dropdown ${isDarkMode ? 'dark' : ''}`}
                          trigger={['click']}
                          menu={{
                            items: [
                              {
                                key: 'rename',
                                label: t('chat.rename'),
                                style: {
                                  color: isDarkMode ? '#ffffff' : '#000000',
                                },
                              },
                              {
                                key: 'delete',
                                label: t('chat.delete'),
                                danger: true,
                                style: {
                                  color: isDarkMode ? '#ffffff' : '#000000',
                                },
                              },
                            ],
                            onClick: ({ key }) => {
                              if (key === 'rename') {
                                setEditingChatId(chat.id);
                                setEditingTitle(chat.title);
                              } else if (key === 'delete') {
                                deleteChat(chat.id);
                              }
                            },
                            style: {
                              background: isDarkMode
                                ? 'rgb(38, 63, 137)'
                                : '#fff',
                            },
                          }}
                        >
                          <MoreOutlined
                            onClick={(e) => e.stopPropagation()}
                            className={`more-icon ${isDarkMode ? 'dark' : ''}`}
                          />
                        </Dropdown>
                      </>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </div>
        ))}
      </Sider>

      <Content style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="chat-content-container custom-scrollbar">
          {selectedChat?.messages.map((msg, idx) => (
            <div className="message-row" key={idx}>
              <div
                className={`message-container ${
                  msg.role === 'user' ? 'user-message' : 'ai-message'
                } ${isDarkMode ? 'dark' : ''}`}
              >
                <div className="message-buttons">
                  <Button
                    style={{ color: isDarkMode ? '#ffffff' : 'black' }}
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(msg.content);
                      message.success(t('chat.copiedToClipboard'));
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
                  {msg.role === 'user' ? (
                    <UserOutlined
                      style={{ color: isDarkMode ? '#ffffff' : 'black' }}
                    />
                  ) : (
                    <img
                      draggable={false}
                      src={MediScanAILogo}
                      alt="MediScan AI"
                      className="role-image"
                    />
                  )}
                </>
                <Text
                  style={{
                    color:
                      msg.role === 'user' && isDarkMode
                        ? '#ffffff'
                        : isDarkMode
                          ? '#ffffff'
                          : 'black',
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
            <div className="loading-indicator">
              <Spin tip={t('chat.thinking')} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
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
                  color: loading ? '#ccc' : '#1890ff',
                }}
                className={`plus-icon ${isDarkMode ? 'dark' : ''}`}
              />
            </Dropdown>

            <div className="chat-textarea-wrapper">
              <Input.TextArea
                className="chat-textarea custom-scrollbar"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={t('chat.typeYourMessage')}
                autoSize={{ minRows: 1, maxRows: 7 }}
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
