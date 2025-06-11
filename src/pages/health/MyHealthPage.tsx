import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Typography, message } from 'antd';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import confetti from 'canvas-confetti';
import {
  fetchHealthData,
  type HealthDataEntry,
} from '../../app/slices/healthSlice';
import { auth } from '../../api/authApi';
import PrimaryButton from '../../components/common/buttons/PrimaryButton';
import MyHealthGuide from './MyHealthGuidePage';
import ProfileCard from '../../components/health/ProfileCard';
import MetricsCard from '../../components/health/MetricsCard';
import DailyMetricsCard from '../../components/health/DailyMetricsCard';
import ExportDataModal from '../../components/health/ExportDataModal';
import '../../assets/styles/pages/health-page.css';
import { hasEntries, toMetricsArray } from '../../utils/healthHelpers';
import type { Metric } from '../../utils/healthHelpers';

const { Title, Text } = Typography;
const HealthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('health');
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [goalInputs, setGoalInputs] = useState<{ [key: number]: string }>({});
  const [showConfetti, setShowConfetti] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [uidCopied, setUidCopied] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const userData = useAppSelector((state) => state.userData.data);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const currentUserUid = auth.currentUser?.uid;

  const showExportModal = () => setIsExportModalVisible(true);
  const handleCancelExportModal = () => {
    setIsExportModalVisible(false);
    setUidCopied(false);
  };
  const copyUid = () => {
    navigator.clipboard.writeText(currentUserUid || 'No UID found');
    setUidCopied(true);
    message.success('UID copied to clipboard!');
    setTimeout(() => setUidCopied(false), 2000);
  };

  const handleGoalChange = (index: number, newGoal: string) => {
    setGoalInputs((prev) => ({
      ...prev,
      [index]: newGoal,
    }));
    const metric = metrics[index];
    if (metric) {
      const goal = Number(newGoal || 0);
      const value = Number(metric.value || 0);
      if (goal > 0 && value >= goal) triggerConfettiAnimation();
    }
  };

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
          origin: { x: Math.random(), y: Math.random() * 0.6 },
          colors,
        });
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  useEffect(() => {
    const initialGoals: { [key: number]: string } = {};
    metrics.forEach((metric, idx) => {
      initialGoals[idx] = String(metric.max || '');
    });
    setGoalInputs(initialGoals);
  }, [metrics]);

  useEffect(() => {
    const newConfettiState: { [key: number]: boolean } = {};
    metrics.forEach((metric, idx) => {
      const goal = Number(goalInputs[idx] || 0);
      const value = Number(metric.value || 0);
      newConfettiState[idx] = goal > 0 && value >= goal;
    });
    setShowConfetti(newConfettiState);
  }, [metrics, goalInputs]);

  useEffect(() => {
    if (user && user.uid) {
      const dateStr = dayjs(selectedDate || new Date()).format('YYYY-MM-DD');
      dispatch(fetchHealthData({ uid: user.uid, date: dateStr }))
        .unwrap()
        .then((data: HealthDataEntry | null) => {
          if (data && hasEntries(data)) {
            setMetrics(data.entries);
          } else if (data) {
            setMetrics(toMetricsArray(data));
          } else {
            setMetrics([]);
          }
        });
    }
  }, [user, dispatch, selectedDate]);

  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [idealWeight, setIdealWeight] = useState<number | null>(null);

  useEffect(() => {
    if (!userData) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => {
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
      } else setBmi(null);
      if (weight && height && age && gender) {
        const calcBmr =
          gender === 'male'
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;
        setBmr(Number(calcBmr.toFixed(0)));
      } else setBmr(null);
      if (waist && neck && height) {
        const logBase10 = (val: number) => Math.log(val) / Math.LN10;
        const fatPercent =
          495 /
            (1.0324 -
              0.19077 * logBase10(waist - neck) +
              0.15456 * logBase10(height)) -
          450;
        setBodyFat(Number(fatPercent.toFixed(1)));
      } else setBodyFat(null);
      if (height && gender) {
        const calcIdeal =
          gender === 'male'
            ? 50 + 0.9 * (height - 152)
            : 45.5 + 0.9 * (height - 152);
        setIdealWeight(Number(calcIdeal.toFixed(1)));
      } else setIdealWeight(null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userData]);

  const profileFetched = !!userData;
  const profileComplete =
    profileFetched &&
    userData.age &&
    userData.weight &&
    userData.height &&
    userData.waistSize &&
    userData.neckSize;

  if (!profileFetched || loading) {
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

  if (!profileComplete) {
    return <MyHealthGuide />;
  }

  return (
    <div className={`health-dashboard ${isDarkMode ? 'dark' : ''}`}>
      <div className="dashboard-header">
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
            onClick={showExportModal}
            style={{ marginTop: '10px', marginBottom: '-30px' }}
          >
            {t('health.getDataExportInstructions')}
          </PrimaryButton>
        </div>
      </div>
      <div className="health-content">
        <Row gutter={[24, 24]} className="health-main-row">
          <Col xs={24} lg={8} className="profile-column">
            <ProfileCard isDarkMode={isDarkMode} userData={userData} />
          </Col>
          <Col
            xs={24}
            lg={8}
            className="metrics-column"
            style={{ display: 'flex' }}
          >
            <MetricsCard
              bmi={bmi}
              bmr={bmr}
              bodyFat={bodyFat}
              idealWeight={idealWeight}
              currentWeight={parseFloat(userData.weight?.toString() || '0')}
            />
          </Col>
          <Col xs={24} lg={8} style={{ display: 'flex' }}>
            <DailyMetricsCard
              isDarkMode={isDarkMode}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              metrics={metrics}
              showConfetti={showConfetti}
              onGoalChange={handleGoalChange}
              goalInputs={goalInputs}
            />
          </Col>
        </Row>
      </div>
      <ExportDataModal
        isModalVisible={isExportModalVisible}
        handleCancelModal={handleCancelExportModal}
        currentUser={currentUserUid}
        uidCopied={uidCopied}
        copyUid={copyUid}
      />
    </div>
  );
};

export default HealthPage;
