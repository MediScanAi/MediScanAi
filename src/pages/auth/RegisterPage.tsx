import { Form, Input, Button, Card, Typography, message, Grid } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../app/slices/authSlice';
import type { AppDispatch, RootState } from '../../app/store';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/photos/background.png';

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
  const { loading } = useSelector((state: RootState) => state.auth);
  const screens = useBreakpoint();

  const onFinish = async (values: RegisterFormValues) => {
    const { email, password } = values;
    try {
      await dispatch(registerUser({ email, password })).unwrap();
      message.success('Registration successful!');
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error('Registration failed');
      }
    }
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
        style={{ width: '100%', maxWidth: 400 }}
      >
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
            maxHeight: '90vh',
            overflowY: 'auto',
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
                { required: true, message: 'Enter your email' },
                { type: 'email', message: 'Invalid email' },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Enter your password' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={loading}>
                Register
              </Button>
            </Form.Item>

            <Text style={{ display: 'block', textAlign: 'center' }}>
              Already have an account? <Link to="/login">Login</Link>
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
