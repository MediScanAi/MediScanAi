import React from 'react';
import {
  Form,
  Button,
  Card,
  Typography,
  message,
  Grid,
  Spin,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../app/slices/authSlice';
import type { AppDispatch, RootState } from '../../app/store';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import LoginWithGoogleButton from '../../components/common/LoginWithGoogleButton';
import MedicalInstruments3D from '../../assets/photos/medical_instruments.png';
import '../../assets/styles/LoginPage.css';
import PrimaryButton from '../../components/common/PrimaryButton';
import PreferencesDropdown from '../../components/preferences/PreferencesDropdown';
import SecondaryButton from '../../components/common/SecondaryButton';
import { X } from 'lucide-react';
import TextInput from '../../components/common/inputs/TextInput';
import PasswordInput from '../../components/common/inputs/PasswordInput';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const screens = useBreakpoint();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { t } = useTranslation('login');

  const onFinish = async (values: LoginFormValues) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      message.success('Login successful!');
      navigate('/');
    } catch (error: unknown) {
      message.error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const toggleForgotPassword = () => setIsForgotPassword((prev) => !prev);
  const toggleGoogleLoading = async (isLoading: boolean) => {
    setGoogleLoading(isLoading);
  };

  return (
    <div className={`login-page-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="login-preferences-dropdown">
        <PreferencesDropdown />
      </div>
      <div className="login-back-link-container">
        <SecondaryButton size="large">
          <Link to="/" className="login-back-link">
            <X />
          </Link>
        </SecondaryButton>
      </div>
      {screens.md && (
        <div className="welcome-section-login">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="welcome-text-container"
          >
            <Title level={2} className="welcome-login-title">
              {t('login.welcomeTitle')}
            </Title>
            <Text className="welcome-login-description">
              {t('login.welcomeDescription')}
            </Text>
          </motion.div>
          <motion.img
            draggable={false}
            src={MedicalInstruments3D}
            alt="Medical Instruments"
            className="welcome-login-medical"
            initial={{ opacity: 0, x: -45, y: 45 }}
            animate={{ opacity: 1, x: 0, y: -20 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </div>
      )}

      <div className="login-card-section">
        {isForgotPassword ? (
          <ForgotPasswordForm
            onCancel={toggleForgotPassword}
            isDarkMode={isDarkMode}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`login-spin-container ${isDarkMode ? 'dark' : ''}`}
          >
            <Spin spinning={googleLoading} tip="Waiting for Google response...">
              <Card className={`login-card ${isDarkMode ? 'dark' : ''}`}>
                <Title level={2} className="login-title">
                  {t('login.loginTitle')}
                </Title>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  disabled={googleLoading}
                  requiredMark={false}
                >
                  <Form.Item
                    label={t('login.forms.email')}
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: t('login.forms.invalidEmail'),
                      },
                    ]}
                  >
                    <TextInput size="large" placeholder={t('login.forms.email')} />
                  </Form.Item>

                  <Form.Item
                    label={t('login.forms.password')}
                    name="password"
                    rules={[
                      { required: true, message: t('login.forms.password') },
                    ]}
                  >
                    <PasswordInput size="large" placeholder={t('login.forms.password')} />
                  </Form.Item>

                  <Form.Item className="forgot-form">
                    <Button
                      type="link"
                      className="forgot-password-link"
                      onClick={toggleForgotPassword}
                      tabIndex={-1}
                    >
                      {t('login.forgotPassword')}
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <div className="login-form">
                      <PrimaryButton
                        htmlType="submit"
                        loading={loading}
                        size="large"
                      >
                        {t('login.loginButton')}
                      </PrimaryButton>
                      <LoginWithGoogleButton
                        toggleLoading={toggleGoogleLoading}
                      />
                    </div>
                  </Form.Item>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Text className="register-text">
                      {t('login.noAccount')} &nbsp;
                      <Link to="/auth/register" className="register-link">
                        {t('login.register')}
                      </Link>
                    </Text>
                  </motion.div>
                </Form>
              </Card>
            </Spin>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
