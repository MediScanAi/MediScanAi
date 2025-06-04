import { Form, Typography, Card, message } from 'antd';
import { motion } from 'framer-motion';
import type React from 'react';
import { sendResetPasswordEmail } from '../api/authApi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PrimaryButton from './common/PrimaryButton';
import SecondaryButton from './common/SecondaryButton';
import TextInput from './common/inputs/TextInput';

const { Title, Text } = Typography;

interface ForgotPasswordFormProps {
  onCancel: () => void;
  isDarkMode?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onCancel,
  isDarkMode,
}) => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendResetPasswordEmail(email);
      message.success('Password reset email sent!');
    } catch (_) {
      message.error('Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: { resetEmail: string }) => {
    await handleForgotPassword(values.resetEmail);
    onCancel();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`login-spin-container${isDarkMode ? ' dark' : ''}`}
    >
      <Card className={`login-card${isDarkMode ? ' dark' : ''}`}>
        <Title level={3} className="login-title">
          Reset your password
        </Title>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label="Email"
            name="resetEmail"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <TextInput
              placeholder="Enter your email"
              name="resetEmail"
              autoComplete="email"
              size="large"
            />
          </Form.Item>
          <Text
            className="login-description"
            type="secondary"
            style={{ marginBottom: 20, display: 'block' }}
          >
            You will receive an email with a link to reset your password.
          </Text>
          <Form.Item
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 5,
              marginBottom: 8,
              justifyContent: 'center',
            }}
          >
            <PrimaryButton htmlType="submit" loading={loading}>
              Reset Password
            </PrimaryButton>
            <SecondaryButton
              htmlType="button"
              onClick={onCancel}
              style={{
                marginLeft: 10,
              }}
            >
              Cancel
            </SecondaryButton>
          </Form.Item>
          <Text className="register-text">
            Don't have an account?{' '}
            <Link to="/auth/register" className="register-link">
              Register
            </Link>
          </Text>
        </Form>
      </Card>
    </motion.div>
  );
};

export default ForgotPasswordForm;
