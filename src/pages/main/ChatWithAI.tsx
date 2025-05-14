import { useState } from 'react';
import { Input, Button, Card, List, Typography, Spin } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Text } = Typography;

const ChatWithAI = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', {
        messages: updatedMessages,
      });

      const aiMessage = res.data.choices[0].message;
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="💬 Chat with MediScan AI"
      style={{ maxWidth: 800, margin: 'auto' }}
    >
      <List
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <Text>
              <strong> {item.role === 'user' ? 'You' : 'MediScan AI'}:</strong>
            </Text>
            &nbsp;
            <Text>{item.content}</Text>
          </List.Item>
        )}
        style={{ maxHeight: 400, overflowY: 'auto', marginBottom: 16 }}
      />

      <TextArea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        placeholder="Type your question..."
      />
      <div style={{ textAlign: 'right', marginTop: 8 }}>
        <Button type="primary" onClick={sendMessage} disabled={loading}>
          {loading ? <Spin /> : 'Send'}
        </Button>
      </div>
    </Card>
  );
};

export default ChatWithAI;
