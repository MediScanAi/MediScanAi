import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../app/slices/authSlice';
import type { AppDispatch, RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

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
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
      <Card style={{ width: 400 }} bordered>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          Create Account
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true, message: 'Please enter your surname' }]}
          >
            <Input placeholder="Enter your surname" />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
