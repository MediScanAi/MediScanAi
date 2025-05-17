import { Form, Input, Button, Card, Typography, message, Grid } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../app/slices/authSlice';
import type { AppDispatch, RootState } from '../../app/store';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/photos/background.png';
import { useEffect, useState } from 'react';
import { getAuth, reload } from 'firebase/auth';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface RegisterFormValues {
  surname: string;
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((s: RootState) => s.auth);
  const screens = useBreakpoint();

  const [waitingVerification, setWaitingVerification] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      setWaitingVerification(true);
    }
  }, []);

  const onFinish = async ({ email, password }: RegisterFormValues) => {
    try {
      await dispatch(registerUser({ email, password })).unwrap();
      message.info(
        "We've sent a verification e-mail. Please check your inbox."
      );
      setWaitingVerification(true);
    } catch {
      message.error('Registration failed');
    }
  };

  const handleCheckVerification = async () => {
    const auth = getAuth();
    if (!auth.currentUser) return;
    setChecking(true);
    await reload(auth.currentUser);
    if (auth.currentUser.emailVerified) {
      message.success('Welcome to MediScan AI!');
      navigate('/');
    } else {
      message.warning('E-mail not verified yet');
    }
    setChecking(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: screens.md ? 'row' : 'column-reverse',
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 40%, rgba(255,255,255,0)), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        alignItems: 'center',
        justifyContent: screens.md ? 'space-between' : 'center',
        padding: screens.md ? '0 10%' : '20px',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 400, position: 'relative' }}
      >
        {waitingVerification && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.85)',
              borderRadius: 16,
              zIndex: 10,
              display: 'grid',
              placeItems: 'center',
              padding: 24,
              textAlign: 'center',
            }}
          >
            <div>
              <Title level={4}>Check your e-mail</Title>
              <Text>
                Click the link we sent to verify your address, then press the
                button below.
              </Text>
              <Button
                type="primary"
                block
                style={{ marginTop: 24 }}
                onClick={handleCheckVerification}
                loading={checking}
              >
                I've verified
              </Button>
            </div>
          </div>
        )}

        <Card
          style={{
            borderRadius: 16,
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
            maxHeight: '90vh',
            overflowY: 'auto',
            filter: waitingVerification ? 'blur(2px)' : undefined,
            pointerEvents: waitingVerification ? 'none' : 'auto',
          }}
        >
          <Title level={2} style={{ fontWeight: 'bold', marginBottom: 20 }}>
            Create an Account
          </Title>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Surname"
              name="surname"
              rules={[{ required: true, message: 'Enter your surname' }]}
            >
              <Input placeholder="Surname" />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Enter your name' }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Enter your e-mail' },
                { type: 'email', message: 'Invalid e-mail' },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Enter your password' },
                {
                  pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    'Min 8 chars with uppercase, digit and special character',
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={loading}>
                Register
              </Button>
            </Form.Item>

            <Text style={{ display: 'block', textAlign: 'center' }}>
              Already have an account? <Link to="/auth/login">Login</Link>
            </Text>
          </Form>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: screens.md ? 'right' : 'center',
          margin: screens.md ? 0 : 20,
          color: '#fff',
        }}
      >
        <Title level={1} style={{ fontSize: screens.md ? 40 : 30 }}>
          Welcome to MediScan AI
        </Title>
        <Text style={{ fontSize: screens.md ? 20 : 16 }}>
          Join us to unlock personalized healthcare insights powered by advanced
          AI analytics.
        </Text>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
