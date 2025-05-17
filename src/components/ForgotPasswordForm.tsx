import { Form, Typography, Button, Input, message, Card } from 'antd';
import { motion } from 'framer-motion';
import type React from 'react';
import { sendResetPasswordEmail } from '../api/authApi';
import { Link } from 'react-router';
import { useState } from 'react';

const { Title, Text } = Typography;
interface ForgotPasswordFormProps {
  goBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ goBack }) => {
  const [loading, setLoading] = useState(false);
  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendResetPasswordEmail(email);
      message.success('Password reset email sent!');
    } catch (error) {
      message.error('Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: { resetEmail: string }) => {
    await handleForgotPassword(values.resetEmail);
    goBack();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%', maxWidth: 400 }}
    >
      <Card
        style={{
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
        }}
      >
        <Title level={2} style={{ fontWeight: 'bold', marginBottom: 24 }}>
          Reset your password
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="resetEmail"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
            You will receive an email with a link to reset your password.
          </Text>

          <Form.Item
            layout="horizontal"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginRight: '12px' }}
              loading={loading}
            >
              Reset Password
            </Button>
            <Button htmlType="button" onClick={goBack}>
              Cancel
            </Button>
          </Form.Item>

          <Text style={{ display: 'block', textAlign: 'center' }}>
            Don't have an account? <Link to="/auth/register">Register</Link>
          </Text>
        </Form>
      </Card>
    </motion.div>
  );
};

export default ForgotPasswordForm;
