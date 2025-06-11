import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Typography,
  Descriptions,
  Card,
  Row,
  Col,
  Button,
  Tag,
  Space,
  Statistic,
  Alert,
  Spin,
  DatePicker,
  Progress,
  Modal,
  message,
  Steps,
  Divider,
} from 'antd';
import {
  SmileOutlined,
  WarningOutlined,
  FrownOutlined,
  FireOutlined,
  LineChartOutlined,
  UserOutlined,
  EditOutlined,
  DashboardOutlined,
  HeartOutlined,
  FundOutlined,
  DatabaseOutlined,
  SafetyOutlined,
  SyncOutlined,
  CheckOutlined,
  CopyOutlined,
  InboxOutlined,
  CalendarOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

import '../../assets/styles/pages/health-page.css';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useTranslation } from 'react-i18next';
import {
  fetchHealthData,
  type HealthDataEntry,
} from '../../app/slices/healthSlice';
import confetti from 'canvas-confetti';
import MyHealthGuide from './MyHealthGuidePage';
import { auth } from '../../api/authApi';
import PrimaryButton from '../../components/common/buttons/PrimaryButton';
import NumberInput from '../../components/common/inputs/NumberInput';

const { Title, Text, Paragraph } = Typography;

const HealthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [idealWeight, setIdealWeight] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('health');
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.userData.data);
  const healthData = useAppSelector((state) => state.healthData);
  const user = useAppSelector((state) => state.auth.user);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [fetchedHealthData, setFetchedHealthData] = useState<HealthDataEntry[]>(
    Array.isArray(healthData.data?.entries) ? healthData.data.entries : []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number | null>(
    null
  );
  const [goalInputs, setGoalInputs] = useState<{ [key: number]: string }>({});
  const [showConfetti, setShowConfetti] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [tempGoalInput, setTempGoalInput] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uidCopied, setUidCopied] = useState(false);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const currentUser = auth.currentUser?.uid;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setUidCopied(false);
  };

  const copyUid = () => {
    navigator.clipboard.writeText(currentUser || 'No UID found');
    setUidCopied(true);
    message.success('UID copied to clipboard!');
    setTimeout(() => setUidCopied(false), 2000);
  };

  useEffect(() => {
    const initialGoals: { [key: number]: string } = {};
    fetchedHealthData.forEach((metric, index) => {
      initialGoals[index] = String(metric.max || '');
    });
    setGoalInputs(initialGoals);
  }, [fetchedHealthData]);

  const openModal = (index: number) => {
    setSelectedMetricIndex(index);
    setTempGoalInput(goalInputs[index] || '');
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedMetricIndex !== null) {
      const newGoal = tempGoalInput;
      setGoalInputs((prev) => ({
        ...prev,
        [selectedMetricIndex]: newGoal,
      }));

      const metric = fetchedHealthData[selectedMetricIndex];
      if (metric) {
        const goal = Number(newGoal || 0);
        const value = Number(metric.value || 0);
        if (goal > 0 && value >= goal) {
          triggerConfettiAnimation();
        }
      }
    }
    setIsModalOpen(false);
    setTempGoalInput('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTempGoalInput('');
  };

  const handleGoalInputChange = (value: string | number | null) => {
    setTempGoalInput(value !== null ? String(value) : '');
  };

  useEffect(() => {
    if (user && user.uid) {
      const dateStr = dayjs(selectedDate || new Date()).format('YYYY-MM-DD');
      dispatch(fetchHealthData({ uid: user.uid, date: dateStr }))
        .unwrap()
        .then((data) => {
          if (Array.isArray(data?.entries)) {
            setFetchedHealthData(data.entries);
          } else {
            setFetchedHealthData([]);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch health data:', error);
        });
    }
  }, [user, dispatch, selectedDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData) {
        const weight = parseFloat(userData?.weight?.toString() || '');
        const height = parseFloat(userData?.height?.toString() || '');
        const age = parseFloat(userData?.age?.toString() || '');
        const waist = parseFloat(userData?.waistSize?.toString() || '');
        const neck = parseFloat(userData?.neckSize?.toString() || '');
        const gender = userData?.gender?.toLowerCase();
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

        if (waist && neck && height) {
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

  useEffect(() => {
    const newConfettiState: { [key: number]: boolean } = {};

    fetchedHealthData.forEach((metric, index) => {
      const goal = Number(goalInputs[index] || 0);
      const value = Number(metric.value || 0);
      const achieved = goal > 0 && value >= goal;
      newConfettiState[index] = achieved;
    });

    setShowConfetti(newConfettiState);
  }, [fetchedHealthData, goalInputs]);

  const triggerConfettiAnimation = () => {
    const colors = ['#4776E6', '#8E54E9', '#FF8C00', '#FF4500'];
    const duration = 2000;
    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < duration) {
        confetti({
          particleCount: 6,
          angle: Math.random() * 360,
          spread: 70,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6,
          },
          colors,
        });

        requestAnimationFrame(frame);
      }
    };

    frame();
  };

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
      obese: '#F5222D',
    };

    return (
      <div className="metric-container">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 60,
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
              {t('health.bmi')}
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
              {t('health.bmr')}
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
      high: '#F5222D',
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
              {t('health.bodyFat')}
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
      under: '#FFD700',
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
              {t('health.idealWeight')}
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
        title: t('health.status.underweight'),
        text: t('health.suggestions.underweight'),
      },
      healthy: {
        icon: <SmileOutlined />,
        color: 'green',
        title: t('health.status.healthy'),
        text: t('health.suggestions.healthy'),
      },
      overweight: {
        icon: <WarningOutlined />,
        color: 'orange',
        title: t('health.status.overweight'),
        text: t('health.suggestions.overweight'),
      },
      obese: {
        icon: <FrownOutlined />,
        color: 'red',
        title: t('health.status.obese'),
        text: t('health.suggestions.obese'),
      },
    };

    const suggestion = suggestions[status as keyof typeof suggestions];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className={`suggestion-card ${isDarkMode ? 'dark' : ''}`}
      >
        <div className="suggestion-header">
          <Tag
            icon={suggestion.icon}
            color={suggestion.color}
            className={`suggestion-tag ${isDarkMode ? 'dark' : ''}`}
          >
            {suggestion.title}
          </Tag>
        </div>
        <Paragraph className={`suggestion-text ${isDarkMode ? 'dark' : ''}`}>
          {suggestion.text}
        </Paragraph>
        <div className={`suggestion-stats ${isDarkMode ? 'dark' : ''}`}>
          <Space size="large">
            <Statistic
              className={`suggestion-statistic ${isDarkMode ? 'dark' : ''}`}
              title={t('health.dailyCalories')}
              value={bmr ? bmr + 300 : '--'}
              prefix={<FireOutlined />}
            />
            <Statistic
              className={`suggestion-statistic ${isDarkMode ? 'dark' : ''}`}
              title={t('health.exerciseGoal')}
              value={t('health.minutes', { minutes: 150 })}
              prefix={<HeartOutlined />}
            />
            <Statistic
              className={`suggestion-statistic ${isDarkMode ? 'dark' : ''}`}
              title={t('health.threeMonthGoal')}
              value={
                status === 'healthy'
                  ? t('health.maintain')
                  : status === 'underweight'
                    ? t('health.gainWeight', { kg: '2-4' })
                    : t('health.loseWeight', { kg: '5-10' })
              }
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
          message={t('health.alerts.lowWeight.title')}
          description={t('health.alerts.lowWeight.description')}
          type="warning"
          showIcon
          className="health-alert"
        />
      );
    } else if (weight > 100 || bmi > 30) {
      return (
        <Alert
          message={t('health.alerts.highWeight.title')}
          description={t('health.alerts.highWeight.description')}
          type="error"
          showIcon
          className="health-alert"
        />
      );
    } else {
      return (
        <Alert
          message={t('health.alerts.healthyWeight.title')}
          description={t('health.alerts.healthyWeight.description')}
          type="success"
          showIcon
          className="health-alert"
        />
      );
    }
  };

  if (loading) {
    return (
      <div className={`loading-state ${isDarkMode ? 'dark' : ''}`}>
        <Spin className="loading-spinner" />
        <Title
          level={3}
          className={`loading-title ${isDarkMode ? 'dark' : ''}`}
        >
          {t('health.loading.title')}
        </Title>
        <Text className={`loading-subtitle ${isDarkMode ? 'dark' : ''}`}>
          {t('health.loading.subtitle')}
        </Text>
      </div>
    );
  }

  if (
    !userData?.age ||
    !userData?.weight ||
    !userData?.height ||
    !userData?.waistSize ||
    !userData?.neckSize
  ) {
    return <MyHealthGuide />;
  }

  const healthCircles = () => {
    return (
      <>
        <div className="health-circles-grid">
          {fetchedHealthData.map((metric, index) => {
            const isGoalMetric = [
              'Steps',
              'Active Calories',
              'Resting Calories',
            ].includes(String(metric.type));
            const getProgressColor = () => {
              if (!isGoalMetric) return { '0%': '#4776E6', '100%': '#8E54E9' };

              const value = Number(metric.value || 0);
              const goal = Number(goalInputs[index] || 0);

              if (goal <= 0) return { '0%': '#4776E6', '100%': '#8E54E9' };

              const percentage = Math.min((value / goal) * 100, 100);

              if (percentage >= 100)
                return { '0%': '#52C41A', '100%': '#52C41A' };
              if (percentage >= 75)
                return { '0%': '#4776E6', '100%': '#52C41A' };
              if (percentage >= 50)
                return { '0%': '#FAAD14', '100%': '#4776E6' };
              return { '0%': '#FF4D4F', '100%': '#FAAD14' };
            };

            return (
              <Card
                key={index}
                className={`health-metric-card ${isDarkMode ? 'dark' : ''}`}
              >
                {showConfetti[index] && <div className="confetti-container" />}

                <Progress
                  type="circle"
                  percent={
                    isGoalMetric
                      ? Number(goalInputs[index] || 0) > 0
                        ? Math.min(
                            (Number(metric.value || 0) /
                              Number(goalInputs[index] || 0)) *
                              100,
                            100
                          )
                        : 0
                      : 100
                  }
                  strokeColor={getProgressColor()}
                  strokeWidth={8}
                  format={() => (
                    <div
                      className={`progress-content ${isDarkMode ? 'dark' : ''}`}
                    >
                      <div
                        className={`progress-value ${isDarkMode ? 'dark' : ''}`}
                      >
                        {Math.round(Number(metric.value || 0))}
                      </div>
                      <div
                        className={`progress-unit ${isDarkMode ? 'dark' : ''}`}
                      >
                        {String(metric.unit || '')}
                      </div>
                    </div>
                  )}
                />
                <div className={`metric-type ${isDarkMode ? 'dark' : ''}`}>
                  {String(metric.type || '')}
                </div>
                {isGoalMetric && (
                  <div className={`metric-goal ${isDarkMode ? 'dark' : ''}`}>
                    {isGoalMetric && (
                      <Button
                        onClick={() => openModal(index)}
                        className={`edit-goal-button ${isDarkMode ? 'dark' : ''}`}
                      >
                        <EditOutlined />
                      </Button>
                    )}
                    <>
                      {t('health.goal')}:{' '}
                      {Number(goalInputs[index] || 0) > 0
                        ? goalInputs[index]
                        : '---'}
                    </>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
        <Modal
          title={
            <span className={`goal-modal-title ${isDarkMode ? 'dark' : ''}`}>
              {t('health.setGoal')}
            </span>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={t('health.save')}
          cancelText={t('health.cancel')}
          className={`goal-modal ${isDarkMode ? 'dark' : ''}`}
        >
          {selectedMetricIndex !== null && (
            <NumberInput
              value={tempGoalInput}
              onChange={handleGoalInputChange}
              placeholder={t('health.enterGoalValue')}
              prefix={<TrophyOutlined className="goal-input-icon" />}
              className="goal-input"
            />
          )}
        </Modal>
      </>
    );
  };

  return (
    <div className={`health-dashboard ${isDarkMode ? 'dark' : ''}`}>
      <div className="dashboard-header">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Title
            level={2}
            className={`dashboard-title ${isDarkMode ? 'dark' : ''}`}
          >
            {t('health.dashboard.title')}
          </Title>
          <Text className={`dashboard-subtitle ${isDarkMode ? 'dark' : ''}`}>
            {t('health.dashboard.subtitle')}
          </Text>
          <div className="header-actions">
            <PrimaryButton
              type="primary"
              onClick={showModal}
              icon={<DatabaseOutlined />}
              style={{ marginTop: '10px', marginBottom: '-30px' }}
            >
              {t('health.getDataExportInstructions')}
            </PrimaryButton>
          </div>
        </motion.div>
      </div>

      <div className="health-content">
        <Row gutter={[24, 24]} className="health-main-row">
          <Col xs={24} lg={8} className="profile-column">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="profile-motion-div"
            >
              <Card className={`profile-card ${isDarkMode ? 'dark' : ''}`}>
                <div className="profile-header">
                  <Title
                    level={4}
                    className={`profile-title ${isDarkMode ? 'dark' : ''}`}
                  >
                    <UserOutlined
                      className={`profile-icon ${isDarkMode ? 'dark' : ''}`}
                    />{' '}
                    {t('health.profile.title')}
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => navigate('/profile/info')}
                      className={`edit-profile-button ${isDarkMode ? 'dark' : ''}`}
                    />
                  </Title>
                </div>

                <Descriptions
                  bordered
                  column={1}
                  className={`profile-descriptions ${isDarkMode ? 'dark' : ''}`}
                  size="small"
                >
                  <Descriptions.Item
                    className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
                    label={t('health.profile.age')}
                  >
                    <Text
                      className={`profile-text ${isDarkMode ? 'dark' : ''}`}
                    >
                      {userData?.age
                        ? t('health.years', { years: userData.age })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
                    label={t('health.profile.weight')}
                  >
                    <Text
                      className={`profile-text ${isDarkMode ? 'dark' : ''}`}
                    >
                      {userData?.weight
                        ? t('health.kg', { kg: userData.weight })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
                    label={t('health.profile.height')}
                  >
                    <Text
                      className={`profile-text ${isDarkMode ? 'dark' : ''}`}
                    >
                      {userData?.height
                        ? t('health.cm', { cm: userData.height })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
                    label={t('health.profile.waistSize')}
                  >
                    <Text
                      className={`profile-text ${isDarkMode ? 'dark' : ''}`}
                    >
                      {userData?.waistSize
                        ? t('health.cm', { cm: userData.waistSize })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
                    label={t('health.profile.neckSize')}
                  >
                    <Text
                      className={`profile-text ${isDarkMode ? 'dark' : ''}`}
                    >
                      {userData?.neckSize
                        ? t('health.cm', { cm: userData.neckSize })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>

                <div className="profile-summary">{renderWeightAdvice()}</div>
              </Card>
            </motion.div>
          </Col>

          <Col
            xs={24}
            lg={8}
            style={{ display: 'flex' }}
            className="metrics-column"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ flex: 1 }}
            >
              <Card className={`metrics-card ${isDarkMode ? 'dark' : ''}`}>
                <Title
                  level={4}
                  className={`metrics-title ${isDarkMode ? 'dark' : ''}`}
                >
                  <DashboardOutlined className="metrics-icon" />{' '}
                  {t('health.metrics.title')}
                </Title>

                <div className="metrics-grid">
                  <div className="metric-item">{renderBmiStatus()}</div>
                  <div className="metric-item">{renderBmrStatus()}</div>
                  <div className="metric-item">{renderBodyFatStatus()}</div>
                  <div className="metric-item">{renderIdealWeightStatus()}</div>
                </div>
                <div className="recommendations-section">
                  {renderSuggestions()}
                </div>
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} lg={8} style={{ display: 'flex' }}>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ flex: 1 }}
            >
              <Card className={`metrics-card ${isDarkMode ? 'dark' : ''}`}>
                <div className="metrics-header">
                  <Title
                    level={4}
                    className={`daily-metrics-title ${isDarkMode ? 'dark' : ''}`}
                  >
                    <LineChartOutlined
                      className={`daily-metrics-icon ${isDarkMode ? 'dark' : ''}`}
                    />{' '}
                    {t('health.dailyMetrics')}
                  </Title>
                  <DatePicker
                    onChange={(date) => {
                      setSelectedDate(date?.toDate() || null);
                    }}
                    style={{ width: '290px' }}
                    disabledDate={(current) =>
                      current && current > dayjs().endOf('day')
                    }
                    placeholder={t('health.selectDate')}
                    suffixIcon={
                      <CalendarOutlined
                        className={`date-picker-icon ${isDarkMode ? 'dark' : ''}`}
                      />
                    }
                    className={`date-picker ${isDarkMode ? 'dark' : ''}`}
                    classNames={{
                      root: isDarkMode ? 'dark-date-picker-dropdown' : '',
                    }}
                  />
                </div>

                <Divider
                  className={`metrics-divider ${isDarkMode ? 'dark' : ''}`}
                />

                <div className="metrics-content">
                  {!selectedDate || fetchedHealthData.length === 0 ? (
                    <div
                      className={`no-data-container ${isDarkMode ? 'dark' : ''}`}
                    >
                      <InboxOutlined
                        className={`no-data-icon ${isDarkMode ? 'dark' : ''}`}
                      />
                      <Text
                        className={`no-data-text ${isDarkMode ? 'dark' : ''}`}
                      >
                        {t('health.noData')}
                      </Text>
                    </div>
                  ) : (
                    <div
                      className={`health-circles-container ${isDarkMode ? 'dark' : ''}`}
                    >
                      {healthCircles()}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>

      <Modal
        title={t('healthGuide.guide.connectModal.title')}
        open={isModalVisible}
        onCancel={handleCancelModal}
        footer={[
          <Button key="close" onClick={handleCancelModal}>
            {t('healthGuide.guide.connectModal.closeButton')}
          </Button>,
        ]}
        width={600}
        className={`modal-container ${isDarkMode ? 'dark' : ''}`}
      >
        <div className={`modal-content ${isDarkMode ? 'dark' : ''}`}>
          <p className={`modal-step-description ${isDarkMode ? 'dark' : ''}`}>
            {t('healthGuide.guide.connectModal.description')}
          </p>

          <div className={`modal-steps-container ${isDarkMode ? 'dark' : ''}`}>
            <Steps
              direction="vertical"
              current={-1}
              size="small"
              className={`modal-steps ${isDarkMode ? 'dark' : ''}`}
            >
              <Steps.Step
                title={t('healthGuide.guide.connectModal.steps.download.title')}
                className={`modal-step ${isDarkMode ? 'dark' : ''}`}
                description={
                  <div className="download-link-container">
                    <a
                      href="https://www.icloud.com/shortcuts/803c34db628144028b7af3529bab00d2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      {t(
                        'healthGuide.guide.connectModal.steps.download.linkText'
                      )}
                    </a>
                  </div>
                }
                icon={<SafetyOutlined className="text-white" />}
              />
              <Steps.Step
                title={t('healthGuide.guide.connectModal.steps.copyUid.title')}
                className={`modal-step ${isDarkMode ? 'dark' : ''}`}
                description={
                  <div className="uid-container">
                    <Text className="uid-text">{currentUser}</Text>
                    <Button
                      icon={uidCopied ? <CheckOutlined /> : <CopyOutlined />}
                      size="small"
                      onClick={copyUid}
                    >
                      {uidCopied
                        ? t(
                            'healthGuide.guide.connectModal.steps.copyUid.button.copied'
                          )
                        : t(
                            'healthGuide.guide.connectModal.steps.copyUid.button.copy'
                          )}
                    </Button>
                  </div>
                }
                icon={<SyncOutlined className="text-white" />}
              />
              <Steps.Step
                title={t(
                  'healthGuide.guide.connectModal.steps.runShortcut.title'
                )}
                description={t(
                  'healthGuide.guide.connectModal.steps.runShortcut.description'
                )}
                icon={<DatabaseOutlined className="text-white" />}
              />
              <Steps.Step
                title={t('healthGuide.guide.connectModal.steps.enjoy.title')}
                description={t(
                  'healthGuide.guide.connectModal.steps.enjoy.description'
                )}
                icon={<FundOutlined className="text-white" />}
              />
            </Steps>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HealthPage;
