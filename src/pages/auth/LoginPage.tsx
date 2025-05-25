import {
  Form,
  Input,
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
import LoginWithGoogleButton from '../../components/LoginWithGoogleButton';
import Rocket3D from '../../assets/photos/rocket.png';

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
  const screens = useBreakpoint();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    const { email, password } = values;
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      message.success('Login successful!');
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error('Login failed');
      }
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword((prev) => !prev);
  };

  const toggleGoogleLoading = async (isLoading: boolean) => {
    setGoogleLoading(isLoading);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: screens.md ? 'row' : 'column',
        background: `
          radial-gradient(
            circle at 10% 30%,
            #4666e5 0%,
            #2b398b 50%,
            #161c3d 100%
          )
        `,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {screens.md && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'transparent',
            flexDirection: 'column',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <Title
              level={3}
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#fff',
              }}
            >
              Welcome back to MediScan AI
            </Title>
          </motion.div>
          <motion.img
            src={Rocket3D}
            alt="3D Rocket"
            style={{
              width: '440px',
              maxWidth: '95%',
              height: 'auto',
              objectFit: 'contain',
              userSelect: 'none',
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            draggable={false}
          />
        </div>
      )}

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: screens.md ? '0 7vw' : '40px 0 0 0',
          background: 'transparent',
        }}
      >
        {isForgotPassword ? (
          <ForgotPasswordForm goBack={toggleForgotPassword} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              width: '100%',
              maxWidth: 400,
              position: 'relative',
            }}
          >
            <Spin spinning={googleLoading} tip="Waiting for Google response...">
              <Card
                style={{
                  borderRadius: '32px',
                  boxShadow: '0 8px 32px 0 rgba(34,56,122,0.25)',
                  background: 'rgba(28, 52, 125, 0.80)',
                  color: '#fff',
                  padding: 48,
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(14px)',
                  transition: 'box-shadow 0.2s, border 0.2s',
                }}
              >
                <Title
                  level={2}
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 18,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  Log in
                </Title>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  style={{ marginTop: 18 }}
                  requiredMark={false}
                >
                  <Form.Item
                    label={
                      <span style={{ fontWeight: 500, color: '#e1e7fa' }}>
                        Email
                      </span>
                    }
                    name="email"
                    rules={[
                      { required: true, message: 'Enter your email' },
                      { type: 'email', message: 'Invalid email' },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Email"
                      style={{
                        borderRadius: 12,
                        borderColor: '#5271c3',
                        background: '#e6ecfa',
                        fontSize: 16,
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span style={{ fontWeight: 500, color: '#e1e7fa' }}>
                        Password
                      </span>
                    }
                    name="password"
                    rules={[{ required: true, message: 'Enter your password' }]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Password"
                      style={{
                        borderRadius: 12,
                        borderColor: '#5271c3',
                        background: '#e6ecfa',
                        fontSize: 16,
                      }}
                    />
                  </Form.Item>

                  <Form.Item style={{ textAlign: 'right', marginBottom: 10 }}>
                    <Button
                      type="link"
                      style={{
                        color: '#92c4ff',
                        fontWeight: 500,
                        padding: 0,
                        height: 'auto',
                        fontSize: 15,
                      }}
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
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size="large"
                        style={{
                          flex: 1,
                          borderRadius: 12,
                          fontWeight: 600,
                          fontSize: 16,
                          height: 44,
                          background:
                            'linear-gradient(90deg, #5e8fff 0%, #4368e2 100%)',
                          border: 'none',
                        }}
                      >
                        Login
                      </Button>
                      <LoginWithGoogleButton
                        toggleLoading={toggleGoogleLoading}
                      />
                    </div>
                  </Form.Item>
                  <Text
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      marginTop: 10,
                      color: '#e6ecfa',
                    }}
                  >
                    Don't have an account?{' '}
                    <Link
                      to="/auth/register"
                      style={{ color: '#b3d1ff', fontWeight: 500 }}
                    >
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
