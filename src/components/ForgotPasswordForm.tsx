import { Form, Typography, Card, message } from 'antd';
import { motion } from 'framer-motion';
import type React from 'react';
import { sendResetPasswordEmail } from '../api/authApi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PrimaryButton from './common/PrimaryButton';
import SecondaryButton from './common/SecondaryButton';
import TextInput from './common/inputs/TextInput';
import { useTranslation } from 'react-i18next';
import '../assets/styles/components/forgotPasswordForm.css';
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
  const { t } = useTranslation('forgotPassword');
  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendResetPasswordEmail(email);
      message.success(t('forgotPassword.passwordResetEmailSent'));
    } catch (_) {
      message.error(t('forgotPassword.failedToSendResetEmail'));
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
          {t('forgotPassword.resetPassword')}
        </Title>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label={t('forgotPassword.email')}
            name="resetEmail"
            rules={[
              {
                required: true,
                message: t('forgotPassword.pleaseEnterYourEmail'),
              },
              {
                type: 'email',
                message: t('forgotPassword.pleaseEnterAValidEmail'),
              },
            ]}
          >
            <TextInput
              placeholder="Enter your email"
              name="resetEmail"
              autoComplete="email"
              size="large"
            />
          </Form.Item>
          <Text className="login-description" type="secondary">
            {t(
              'forgotPassword.youWillReceiveAnEmailWithALinkToResetYourPassword'
            )}
          </Text>
          <Form.Item className="forgot-button-section">
            <PrimaryButton htmlType="submit" loading={loading}>
              {t('forgotPassword.resetPassword')}
            </PrimaryButton>
            <SecondaryButton
              htmlType="button"
              onClick={onCancel}
              className="forgot-button"
            >
              {t('forgotPassword.cancel')}
            </SecondaryButton>
          </Form.Item>
          <Text className="register-text">
            {t('forgotPassword.dontHaveAnAccount')}
            <Link to="/auth/register" className="register-link">
              {' ' + t('forgotPassword.register')}
            </Link>
          </Text>
        </Form>
      </Card>
    </motion.div>
  );
};

export default ForgotPasswordForm;
