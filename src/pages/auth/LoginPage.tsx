import React from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Grid,
  Spin,
  Switch,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../app/slices/authSlice';
import type { AppDispatch, RootState } from '../../app/store';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import LoginWithGoogleButton from '../../components/LoginWithGoogleButton';
import Rocket3D from '../../assets/photos/rocket.png';
import '../../assets/styles/LoginPage.css';
import { toggleTheme } from '../../app/slices/theme';
import PrimaryButton from '../../components/common/PrimaryButton';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

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

  const handleThemeChange = () => dispatch(toggleTheme());

  return (
    <div className={`login-page-container ${isDarkMode ? 'dark' : 'light'}`}>
      <Switch
        className="theme-toggle"
        checked={isDarkMode}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        onChange={handleThemeChange}
      />
      {screens.md && (
        <div className="welcome-section">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ duration: 0.5 }}
            className="welcome-text-container fade-in"
          >
            <Title level={2} className="welcome-title">
              Welcome back to MediScan AI
            </Title>
            <Text className="welcome-description">
              Log in to continue your journey with us. Your health insights all
              in one place!
            </Text>
          </motion.div>
          <motion.img
            src={Rocket3D}
            alt="Rocket"
            className="welcome-rocket"
            initial={{ opacity: 0, x: -45, y: 45 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
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
                  Log in
                </Title>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  requiredMark={false}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Invalid email',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Email"
                      className="login-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Enter your password' }]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Password"
                      className="login-input"
                    />
                  </Form.Item>

                  <Form.Item style={{ textAlign: 'right', marginBottom: 10 }}>
                    <Button
                      type="link"
                      className="forgot-password-link"
                      onClick={toggleForgotPassword}
                      tabIndex={-1}
                    >
                      Forgot your password?
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <div
                      style={{
                        display: 'flex',
                        gap: 10,
                        marginTop: 5,
                        marginBottom: 8,
                      }}
                    >
                      <PrimaryButton
                        htmlType="submit"
                        loading={loading}
                        size="large"
                      >
                        Login
                      </PrimaryButton>
                      <LoginWithGoogleButton
                        toggleLoading={toggleGoogleLoading}
                      />
                    </div>
                  </Form.Item>

                  <Text className="register-text">
                    Don't have an account?{' '}
                    <Link to="/auth/register" className="register-link">
                      Register
                    </Link>
                  </Text>
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
