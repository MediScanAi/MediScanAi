import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Descriptions,
  Card,
  Row,
  Col,
  Button,
  Tag,
  Space,
  Divider,
  Statistic,
  Alert,
  Spin
} from 'antd';
import {
  SmileOutlined,
  WarningOutlined,
  FrownOutlined,
  FireOutlined,
  HeartOutlined,
  LineChartOutlined,
  UserOutlined,
  EditOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import person from '../../assets/photos/marduk.webp';
import bigPerson from '../../assets/photos/fat.png';
import midPerson from '../../assets/photos/mid.png';
import '../../assets/styles/healthPage.css';
import { motion } from 'framer-motion';
const { Title, Text, Paragraph } = Typography;
import { useAppSelector } from '../../app/hooks';

const HealthPage: React.FC = () => {
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [idealWeight, setIdealWeight] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.userData.data);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData) {
        const weight = parseFloat(userData?.weight?.toString() || '');
        const height = parseFloat(userData?.height?.toString() || '');
        const age = parseFloat(userData?.age?.toString() || '');
        const waist = parseFloat(userData?.waistSize?.toString() || '');
        const neck = parseFloat(userData?.neckSize?.toString() || '');
        const gender = userData?.sex?.toLowerCase();

        const heightM = height / 100;

        if (weight > 0 && height > 0) {
          const calculatedBmi = weight / (heightM * heightM);
          setBmi(Number(calculatedBmi.toFixed(1)));
        }

        if (weight && height && age && gender) {
          const calcBmr =
            gender === 'male'
              ? 10 * weight + 6.25 * height - 5 * age + 5
              : 10 * weight + 6.25 * height - 5 * age - 161;
          setBmr(Number(calcBmr.toFixed(0)));
        }

        if (waist && neck && height && gender === 'male') {
          const logBase10 = (val: number) => Math.log(val) / Math.LN10;
          const fatPercent =
            495 /
            (1.0324 -
              0.19077 * logBase10(waist - neck) +
              0.15456 * logBase10(height)) -
            450;
          setBodyFat(Number(fatPercent.toFixed(1)));
        }

        if (height && gender) {
          const calcIdeal =
            gender === 'male'
              ? 50 + 0.9 * (height - 152)
              : 45.5 + 0.9 * (height - 152);
          setIdealWeight(Number(calcIdeal.toFixed(1)));
        }
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userData]);

  const getBmiStatus = () => {
    if (bmi === null) return 'default';
    if (bmi < 18.5) return 'underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'healthy';
    if (bmi >= 25 && bmi <= 29.9) return 'overweight';
    return 'obese';
  };

  const renderBmiStatus = () => {
    if (bmi === null) return null;

    const status = getBmiStatus();
    const colors = {
      underweight: '#FFD700',
      healthy: '#52C41A',
      overweight: '#FA8C16',
      obese: '#F5222D'
    };

    return (
      <div className="metric-container">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.5,
          }}
          className="metric-badge"
          style={{ backgroundColor: colors[status as keyof typeof colors] }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="metric-content"
          >
            <Title level={2} className="metric-value">
              {bmi}
            </Title>
            <Text strong className="metric-label">
              BMI
            </Text>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const renderBmrStatus = () => {
    if (bmr === null) return null;

    const getBmrColor = () => {
      if (bmr < 1200) return '#FFD700';
      if (bmr >= 1200 && bmr <= 1800) return '#52C41A';
      return '#FA8C16';
    };

    return (
      <div className="metric-container">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.4,
          }}
          className="metric-badge"
          style={{ backgroundColor: getBmrColor() }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="metric-content"
          >
            <Title level={2} className="metric-value">
              {bmr}
            </Title>
            <Text strong className="metric-label">
              BMR
            </Text>

          </motion.div>
        </motion.div>
      </div>
    );
  };

  const renderBodyFatStatus = () => {
    if (bodyFat === null) return null;

    const getBodyFatStatus = () => {
      if (bodyFat < 10) return 'excellent';
      if (bodyFat >= 10 && bodyFat <= 15) return 'good';
      if (bodyFat > 15 && bodyFat <= 20) return 'average';
      return 'high';
    };

    const status = getBodyFatStatus();
    const colors = {
      excellent: '#52C41A',
      good: '#73d13d',
      average: '#FA8C16',
      high: '#F5222D'
    };

    return (
      <div className="metric-container">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.6,
          }}
          className="metric-badge"
          style={{ backgroundColor: colors[status] }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="metric-content"
          >
            <Title level={2} className="metric-value">
              {bodyFat}%
            </Title>
            <Text strong className="metric-label">
              Body Fat
            </Text>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const renderIdealWeightStatus = () => {
    if (idealWeight === null) return null;

    const currentWeight = parseFloat(userData?.weight?.toString() || '0');
    const difference = currentWeight - idealWeight;

    const getStatus = () => {
      if (Math.abs(difference) < 5) return 'ideal';
      return difference > 0 ? 'over' : 'under';
    };

    const status = getStatus();
    const colors = {
      ideal: '#52C41A',
      over: '#FA8C16',
      under: '#FFD700'
    };

    return (
      <div className="metric-container">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.8,
          }}
          className="metric-badge"
          style={{ backgroundColor: colors[status] }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="metric-content"
          >
            <Title level={2} className="metric-value">
              {idealWeight}kg
            </Title>
            <Text strong className="metric-label">
              Ideal Weight
            </Text>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const renderSuggestions = () => {

    if (bmi === null) return null;
    const status = getBmiStatus();

    const suggestions = {
      underweight: {
        icon: <WarningOutlined />,
        color: 'gold',
        title: 'Underweight',
        text: 'Your BMI is below normal. Focus on nutrient-dense foods like avocados, nuts, lean proteins, and whole grains.',
      },
      healthy: {
        icon: <SmileOutlined />,
        color: 'green',
        title: 'Healthy',
        text: 'Great job! Maintain your current habits of balanced eating and regular exercise.',
      },
      overweight: {
        icon: <WarningOutlined />,
        color: 'orange',
        title: 'Overweight',
        text: 'Try incorporating more physical activity and reducing high-calorie processed foods.',
      },
      obese: {
        icon: <FrownOutlined />,
        color: 'red',
        title: 'Obese',
        text: "It's important to take action now. Please consult with a healthcare provider.",
      }
    };

    const suggestion = suggestions[status as keyof typeof suggestions];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="suggestion-card"
      >
        <div className="suggestion-header">
          <Tag icon={suggestion.icon} color={suggestion.color} className="suggestion-tag">
            {suggestion.title}
          </Tag>
        </div>
        <Paragraph className="suggestion-text">
          {suggestion.text}
        </Paragraph>
        <Divider className="suggestion-divider" />
        <div className="suggestion-stats">
          <Space size="large">
            <Statistic
              className="suggestion-statistic"
              title="Daily Calories"
              value={bmr ? bmr + 300 : '--'}
              prefix={<FireOutlined />}
            />
            <Statistic
              className="suggestion-statistic"
              title="Exercise Goal"
              value="150 min"
              prefix={<HeartOutlined />}
            />
            <Statistic
              className="suggestion-statistic"
              title="3-month Goal"
              value={status === 'healthy' ? 'Maintain' : status === 'underweight' ? '+2-4kg' : '-5-10kg'}
              prefix={<LineChartOutlined />}
            />
          </Space>
        </div>
      </motion.div>
    );
  };

  const renderWeightAdvice = () => {
    const weight = parseFloat(userData?.weight?.toString() || '');
    const height = parseFloat(userData?.height?.toString() || '');
    const bmi = weight / Math.pow(height / 100, 2);

    if (weight < 45) {
      return (
        <Alert
          message="Low Weight Advisory"
          description="Your weight is significantly below average. Consider increasing intake of healthy high-calorie foods like nuts, avocados, and lean proteins."
          type="warning"
          showIcon
          className="health-alert"
        />
      );
    } else if (weight > 100 || bmi > 30) {
      return (
        <Alert
          message="Weight Management Recommended"
          description="Your weight is above healthy ranges. Focus on whole foods, portion control, and regular physical activity. Consult a healthcare provider for personalized advice."
          type="error"
          showIcon
          className="health-alert"
        />
      );
    } else {
      return (
        <Alert
          message="Healthy Weight Range"
          description="Your weight is within acceptable parameters. Maintain balanced nutrition and regular physical activity for optimal health."
          type="success"
          showIcon
          className="health-alert"
        />
      );
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <Spin
          className="loading-spinner"
        />
        <Title level={3} className="loading-title">
          Analyzing Your Health Profile
        </Title>
        <Text className="loading-subtitle">
          We're crunching the numbers to provide personalized insights
        </Text>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="empty-state">
        <Title level={2} className="empty-title">
          Welcome to Your Health Dashboard
        </Title>
        <Paragraph className="empty-message">
          Complete your health profile to unlock personalized insights and recommendations.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          shape="round"
          icon={<UserOutlined />}
          onClick={() => navigate('/profile/user-info')}
          className="empty-button"
        >
          Complete Your Profile
        </Button>
      </div>
    );
  }

  return (
    <div className="health-dashboard">
      <Row justify="center" className="dashboard-header">
        <Col span={24}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Title level={2} className="dashboard-title">
              Your Health Dashboard
            </Title>
            <Text className="dashboard-subtitle">
              Personalized insights based on your health metrics
            </Text>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[32, 32]} className="dashboard-content">
        <Col xs={24} md={8}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="profile-card">
              <div className="profile-header">
                <Title level={4} className="profile-title">
                  <UserOutlined /> Personal Profile
                </Title>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => navigate('/profile/user-info')}
                />
              </div>

              <Descriptions
                bordered
                column={1}
                className="profile-descriptions"
                labelStyle={{ fontWeight: 100 }}
                size="small"
              >
                <Descriptions.Item label="Age">
                  <Text>{userData?.age ? `${userData?.age} years` : 'Not set'} </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Weight">
                  <Text>{userData?.weight ? `${userData?.weight} kg` : 'Not set'} </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Height">
                  <Text>{userData?.height ? `${userData?.height} cm` : 'Not set'} </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Waist Size">
                  <Text>{userData?.waistSize ? `${userData?.waistSize} cm` : 'Not set'} </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Neck Size">
                  <Text>{userData?.neckSize ? `${userData?.neckSize} cm` : 'Not set'} </Text>
                </Descriptions.Item>
              </Descriptions>

              <Divider className="profile-divider" />

              <div className="profile-summary">
                {renderWeightAdvice()}
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} md={8}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="visualization-card">
              <div className="visualization-container">
                <img
                  src={userData?.weight && userData.weight > 80 && userData.weight < 100 ? midPerson : userData?.weight && userData.weight > 100 ? bigPerson : person}
                  alt="Health visualization"
                  className="health-visualization"
                />
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} md={8}>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="metrics-card">
              <Title level={4} className="metrics-title">
                <DashboardOutlined /> Health Metrics
              </Title>

              <div className="metrics-grid">
                <div className="metric-item">
                  {renderBmiStatus()}
                </div>
                <div className="metric-item">
                  {renderBmrStatus()}
                </div>
                <div className="metric-item">
                  {renderIdealWeightStatus()}

                </div>
                <div className="metric-item">
                  {renderBodyFatStatus()}
                </div>
              </div>

              <Divider className="metrics-divider" />
              <div className="recommendations-section">
                {renderSuggestions()}
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default HealthPage;