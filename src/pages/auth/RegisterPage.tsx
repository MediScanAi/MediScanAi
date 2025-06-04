import React, { useEffect, useState } from 'react';
import {
  Form,
  Card,
  Typography,
  Spin,
  message,
  Row,
  Col,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setUser } from '../../app/slices/authSlice';
import type { AppDispatch, RootState } from '../../app/store';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAuth, reload } from 'firebase/auth';
import { mapFirebaseUser } from '../../api/authApi';
import LoginWithGoogleButton from '../../components/LoginWithGoogleButton';
import PrimaryButton from '../../components/common/PrimaryButton';
import '../../assets/styles/RegisterPage.css';
import Notebook3D from '../../assets/photos/Notebook.webp';
import '../../assets/styles/LoginPage.css';
import PreferencesDropdown from '../../components/preferences/PreferencesDropdown';
import SecondaryButton from '../../components/common/SecondaryButton';
import { X } from 'lucide-react';
import TextInput from '../../components/common/inputs/TextInput';
import NumberInput from '../../components/common/inputs/NumberInput';
import SelectInput from '../../components/common/inputs/SelectInput';
import PasswordInput from '../../components/common/inputs/PasswordInput';

const { Title, Text } = Typography;

interface RegisterFormValues {
  surname: string;
  name: string;
  gender?: string;
  age?: number;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((s: RootState) => s.auth);
  const isDarkMode = useSelector((s: RootState) => s.theme.isDarkMode);

  const [waitingVerification, setWaitingVerification] = useState(false);
  const [checking, setChecking] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const toggleGoogleLoading = (isLoading: boolean) =>
    setGoogleLoading(isLoading);

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      setWaitingVerification(true);
    }
  }, []);

  const onFinish = async ({
    name,
    surname,
    email,
    password,
    gender,
    age,
  }: RegisterFormValues) => {
    try {
      await dispatch(
        registerUser({ name, surname, email, password, gender, age })
      ).unwrap();
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
      const mapped = mapFirebaseUser(auth.currentUser);
      dispatch(setUser(mapped));
      message.success('Welcome to MediScan AI!');
      navigate('/');
    } else {
      message.warning('E-mail not verified yet');
    }
    setChecking(false);
  };

  return (
    <div className={`register-page-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="register-preferences-dropdown">
        <PreferencesDropdown />
      </div>
      <div className="register-back-link-container">
        <SecondaryButton size="large">
          <Link to="/" className="register-back-link">
            <X />
          </Link>
        </SecondaryButton>
      </div>

      <div className="register-content-row">
        <div className="register-card-section wide">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`register-spin-container ${isDarkMode ? 'dark' : ''}`}
          >
            <Spin spinning={googleLoading} tip="Waiting for Google response...">
              <Card
                className={`register-card wide ${isDarkMode ? 'dark' : ''}`}
              >
                <Title level={2} className="register-title">
                  Create an account
                </Title>
                {waitingVerification && (
                  <div className="verification-overlay">
                    <div>
                      <Title level={4}>Check your e-mail</Title>
                      <Text>
                        Please verify your e-mail address through the link we
                        sent to your inbox. Once verified, click the button
                        below.
                      </Text>
                      <br />
                      <PrimaryButton
                        style={{ marginTop: 24 }}
                        onClick={handleCheckVerification}
                        loading={checking}
                      >
                        I've verified
                      </PrimaryButton>
                    </div>
                  </div>
                )}
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  requiredMark={false}
                  className={waitingVerification ? 'blurred' : ''}
                >
                  <Row gutter={20}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Enter your name' }]}
                      >
                        <TextInput placeholder="Enter your name" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Surname"
                        name="surname"
                        rules={[
                          { required: true, message: 'Enter your surname' },
                        ]}
                      >
                        <TextInput
                          placeholder="Enter your surname"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Gender" name="gender">
                        <SelectInput
                          placeholder="Select gender"
                          size="large"
                          allowClear
                          options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                          ]}
                        ></SelectInput>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Age"
                        name="age"
                        rules={[
                          { required: true, message: 'Enter a valid age' },
                        ]}
                      >
                        <NumberInput
                          min={0}
                          max={120}
                          size="large"
                          placeholder="Enter your age"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: 'Enter your email' },
                          { type: 'email', message: 'Invalid email' },
                        ]}
                      >
                        <TextInput
                          placeholder="Enter your email"
                          type="email"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: 'Enter your password' },
                          {
                            pattern:
                              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                            message:
                              'Min 8 chars with uppercase, digit and special character',
                          },
                        ]}
                      >
                        <PasswordInput
                          placeholder="Create a password"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <div className="register-button-container">
                      <PrimaryButton htmlType="submit" loading={loading}>
                        Register
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
                    className="login-suggestion-container"
                  >
                    <Text className="login-suggestion-text">
                      Already have an account?{' '}
                      <Link to="/auth/login" className="login-link">
                        Login
                      </Link>
                    </Text>
                  </motion.div>
                </Form>
              </Card>
            </Spin>
          </motion.div>
        </div>
        <div className="welcome-register-section">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Title level={2} className="welcome-register-title">
              Welcome to MediScan AI
            </Title>
            <Text className="welcome-register-description">
              Join us to unlock personalized healthcare insights powered by
              advanced AI analytics.
            </Text>
          </motion.div>
          <motion.img
            src={Notebook3D}
            alt="Welcome"
            className="welcome-register-image"
            initial={{ opacity: 0, x: -45, y: 45 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
