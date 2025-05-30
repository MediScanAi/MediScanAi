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
  Input,
  Modal,
  message,
  Steps,
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
  SnippetsOutlined,
  HeartOutlined,
  FundOutlined,
  DatabaseOutlined,
  SafetyOutlined,
  SyncOutlined,
  InfoCircleOutlined,
  CheckOutlined,
  CopyOutlined,
  InboxOutlined,
} from '@ant-design/icons';

import person from '../assets/photos/marduk.webp';
import bigPerson from '../assets/photos/fat.png';
import midPerson from '../assets/photos/mid.png';
import '../assets/styles/healthPage.css';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useTranslation } from 'react-i18next';
import {
  fetchHealthData,
  type HealthDataEntry,
} from '../app/slices/healthSlice';
import confetti from 'canvas-confetti';
import MyHealthGuide from '../pages/main/profile/MyHealthGuide';
import { auth } from '../api/authApi';

const { Title, Text, Paragraph } = Typography;

const HealthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [idealWeight, setIdealWeight] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
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

  const handleGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempGoalInput(e.target.value);
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
    const colors = ['#bb0000', '#ffffff', '#00bb00', '#0000bb'];
    const duration = 2000;
    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < duration) {
        confetti({
          particleCount: 4,
          angle: Math.random() * 360,
          spread: 60,
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
        className="suggestion-card"
      >
        <div className="suggestion-header">
          <Tag
            icon={suggestion.icon}
            color={suggestion.color}
            className="suggestion-tag"
          >
            {suggestion.title}
          </Tag>
        </div>
        <Paragraph className="suggestion-text">{suggestion.text}</Paragraph>
        <div className="suggestion-stats">
          <Space size="large">
            <Statistic
              className="suggestion-statistic"
              title={t('health.dailyCalories')}
              value={bmr ? bmr + 300 : '--'}
              prefix={<FireOutlined />}
            />
            <Statistic
              className="suggestion-statistic"
              title={t('health.exerciseGoal')}
              value={t('health.minutes', { minutes: 150 })}
              prefix={<HeartOutlined />}
            />
            <Statistic
              className="suggestion-statistic"
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
      <div className="loading-state">
        <Spin className="loading-spinner" />
        <Title level={3} className="loading-title">
          {t('health.loading.title')}
        </Title>
        <Text className="loading-subtitle">{t('health.loading.subtitle')}</Text>
      </div>
    );
  }

  if (!userData) {
    return <MyHealthGuide />;
  }

  const healthCircles = () => {
    return (
      <>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginTop: '-10px',
          }}
        >
          {fetchedHealthData.map((metric, index) => {
            const isGoalMetric = [
              'Steps',
              'Active Calories',
              'Resting Calories',
            ].includes(String(metric.type));
            return (
              <Card key={index} style={{ border: 'none', width: '150px' }}>
                {showConfetti[index] && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      pointerEvents: 'none',
                      zIndex: 10,
                    }}
                  />
                )}
                {['Steps', 'Active Calories', 'Resting Calories'].includes(
                  String(metric.type)
                ) ? (
                  <div
                    onClick={() => openModal(index)}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#1890ff',
                      marginLeft: '110px',
                    }}
                  >
                    <EditOutlined />
                  </div>
                ) : null}
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
                  strokeColor={{
                    '0%': 'white',
                    '100%':
                      isGoalMetric &&
                      Number(goalInputs[index] || 0) > 0 &&
                      Number(metric.value || 0) >=
                        Number(goalInputs[index] || 0)
                        ? '#52c41a'
                        : 'rgb(20, 102, 255)',
                  }}
                  format={() => (
                    <>
                      <div>
                        <div>{Math.round(Number(metric.value || 0))}</div>
                        <div style={{ fontSize: '15px' }}>
                          {String(metric.unit || '')}
                        </div>
                      </div>
                    </>
                  )}
                  strokeWidth={7}
                />
                <div>{String(metric.type || '')}</div>
                {isGoalMetric && (
                  <>
                    <div>
                      Your Goal:{' '}
                      {Number(goalInputs[index] || 0) > 0
                        ? goalInputs[index]
                        : '--'}
                    </div>
                  </>
                )}
              </Card>
            );
          })}
        </div>
        <Modal
          title="Set Your Goal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          {selectedMetricIndex !== null && (
            <Input
              type="number"
              value={tempGoalInput}
              onChange={handleGoalInputChange}
              placeholder="Enter goal value"
            />
          )}
        </Modal>
      </>
    );
  };

  return (
    <div
      className="health-dashboard"
      style={{
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      <Row justify="center" className="dashboard-header">
        <Col span={24}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Title level={2} className="dashboard-title">
              {t('health.dashboard.title')}
            </Title>
            <Text className="dashboard-subtitle">
              {t('health.dashboard.subtitle')}
            </Text>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Button
                style={{
                  borderRadius: '25px',
                  height: '40px',
                  marginBottom: '20px',
                }}
                type="primary"
                onClick={showModal}
              >
                Get your health data export instruction
              </Button>

              <Modal
                title={t('healthGuide.guide.connectModal.title')}
                visible={isModalVisible}
                onCancel={handleCancelModal}
                footer={[
                  <Button key="close" onClick={handleCancelModal}>
                    {t('healthGuide.guide.connectModal.closeButton')}
                  </Button>,
                ]}
                width={700}
                zIndex={1000}
              >
                <div className="modal-content">
                  <p className="modal-step-description">
                    {t('healthGuide.guide.connectModal.description')}
                  </p>

                  <div className="modal-steps-container">
                    <Steps
                      direction="vertical"
                      current={-1}
                      size="small"
                      className="modal-steps"
                    >
                      <Steps.Step
                        title={t(
                          'healthGuide.guide.connectModal.steps.download.title'
                        )}
                        description={
                          <div className="download-link-container">
                            <a
                              href="https://www.icloud.com/shortcuts/e6269ab0fef447f498eeac823f764deb"
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
                        icon={<SafetyOutlined />}
                      />
                      <Steps.Step
                        title={t(
                          'healthGuide.guide.connectModal.steps.copyUid.title'
                        )}
                        description={
                          <div className="uid-container">
                            <Text className="uid-text">{currentUser}</Text>
                            <Button
                              icon={
                                uidCopied ? <CheckOutlined /> : <CopyOutlined />
                              }
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
                        icon={<SyncOutlined />}
                      />
                      <Steps.Step
                        title={t(
                          'healthGuide.guide.connectModal.steps.runShortcut.title'
                        )}
                        description={t(
                          'healthGuide.guide.connectModal.steps.runShortcut.description'
                        )}
                        icon={<DatabaseOutlined />}
                      />
                      <Steps.Step
                        title={t(
                          'healthGuide.guide.connectModal.steps.enjoy.title'
                        )}
                        description={t(
                          'healthGuide.guide.connectModal.steps.enjoy.description'
                        )}
                        icon={<FundOutlined />}
                      />
                    </Steps>
                  </div>

                  <div className="modal-footer-note">
                    <InfoCircleOutlined
                      style={{ marginRight: '8px', color: '#1890ff' }}
                    />
                    <Text type="secondary">
                      {t('healthGuide.guide.connectModal.privacyNote')}
                    </Text>
                  </div>
                </div>
              </Modal>
            </div>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[4, 4]}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginRight: '-210px',
          }}
        >
          <Col>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ maxWidth: '300px' }}
            >
              <Card className="profile-card">
                <div className="profile-header">
                  <Title level={4} className="profile-title">
                    <UserOutlined /> {t('health.profile.title')}
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
                  className="profile-descriptions mb-20"
                  styles={{ label: { fontWeight: 100 } }}
                  size="small"
                >
                  <Descriptions.Item label={t('health.profile.age')}>
                    <Text>
                      {userData?.age
                        ? t('health.years', { years: userData.age })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('health.profile.weight')}>
                    <Text>
                      {userData?.weight
                        ? t('health.kg', { kg: userData.weight })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('health.profile.height')}>
                    <Text>
                      {userData?.height
                        ? t('health.cm', { cm: userData.height })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('health.profile.waistSize')}>
                    <Text>
                      {userData?.waistSize
                        ? t('health.cm', { cm: userData.waistSize })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={t('health.profile.neckSize')}>
                    <Text>
                      {userData?.neckSize
                        ? t('health.cm', { cm: userData.neckSize })
                        : t('health.notSet')}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>

                <div style={{ marginTop: '20px' }} className="profile-summary">
                  {renderWeightAdvice()}
                </div>
              </Card>
            </motion.div>
          </Col>

          <Col
            style={{ minWidth: '40%', display: 'flex', flexDirection: 'row' }}
            xs={18}
            md={8}
          >
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="metrics-card">
                <Title level={4} className="metrics-title">
                  <DashboardOutlined /> {t('health.metrics.title')}
                </Title>

                <div className="metrics-grid">
                  <div className="metric-item">{renderBmiStatus()}</div>
                  <div className="metric-item">{renderBmrStatus()}</div>
                  <div className="metric-item">{renderIdealWeightStatus()}</div>
                  <div className="metric-item">{renderBodyFatStatus()}</div>
                </div>
                <div className="recommendations-section">
                  {renderSuggestions()}
                </div>
              </Card>
            </motion.div>
          </Col>
        </div>

        <Col style={{ maxWidth: '16%', marginLeft: '35px' }} xs={18} md={8}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="visualization-card">
              <div className="visualization-container">
                <img
                  src={
                    userData?.weight &&
                    userData.weight > 80 &&
                    userData.weight < 100
                      ? midPerson
                      : userData?.weight && userData.weight > 100
                        ? bigPerson
                        : person
                  }
                  alt={t('health.visualization.alt')}
                  className="health-visualization"
                  style={{ height: '30vw', width: '15vw' }}
                />
              </div>
            </Card>
          </motion.div>
        </Col>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ width: '30%', position: 'relative', marginLeft: '30px' }}
        >
          <Title
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            level={4}
            className="metrics-title"
          >
            <SnippetsOutlined /> {t('health.metrics.title')}
            <DatePicker
              style={{ width: '150px', marginLeft: '20px' }}
              onChange={(date) => {
                setSelectedDate(date?.toDate() || null);
              }}
              disabledDate={(current) =>
                current && current > dayjs().endOf('day').subtract(1, 'day')
              }
            />
          </Title>

          <div style={{ position: 'relative' }}>
            {!selectedDate || fetchedHealthData.length === 0 ? (
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '10px',
                  fontSize: '16px',
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  marginLeft: '20px',
                  marginRight: '20px',
                }}
              >
                <Text>There is no data</Text>
                <InboxOutlined
                  style={{ fontSize: '100px', marginTop: '20px' }}
                />
              </div>
            ) : (
              <div
                style={{
                  borderRadius: '10px',
                  zIndex: 1,
                  opacity: selectedDate ? 1 : 0.5,
                  pointerEvents: selectedDate ? 'auto' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                  }}
                >
                  {healthCircles()}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </Row>
    </div>
  );
};

export default HealthPage;
