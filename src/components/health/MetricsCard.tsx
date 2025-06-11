import React from 'react';
import { Card, Typography } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import BmiStatus from './metrics/BmiStatus';
import BmrStatus from './metrics/BmrStatus';
import BodyFatStatus from './metrics/BodyFatStatus';
import IdealWeightStatus from './metrics/IdealWeightStatus';
import HealthSuggestions from './HealthSuggestions';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/components/health/metrics-card.css';

const { Title } = Typography;

type Props = {
  bmi: number | null;
  bmr: number | null;
  bodyFat: number | null;
  idealWeight: number | null;
  currentWeight: number;
};

const MetricsCard: React.FC<Props> = ({
  bmi,
  bmr,
  bodyFat,
  idealWeight,
  currentWeight,
}) => {
  const isDarkMode = useAppSelector((s) => s.theme.isDarkMode);
  const { t } = useTranslation('health');
  return (
    <Card className={`metrics-card ${isDarkMode ? 'dark' : ''}`}>
      <Title level={4} className={`metrics-title ${isDarkMode ? 'dark' : ''}`}>
        <DashboardOutlined className="metrics-icon" />{' '}
        {t('health.metrics.title')}
      </Title>
      <div className="metrics-grid">
        <div className="metric-item">
          <BmiStatus bmi={bmi} />
        </div>
        <div className="metric-item">
          <BmrStatus bmr={bmr} />
        </div>
        <div className="metric-item">
          <BodyFatStatus bodyFat={bodyFat} />
        </div>
        <div className="metric-item">
          <IdealWeightStatus
            idealWeight={idealWeight}
            currentWeight={currentWeight}
          />
        </div>
      </div>
      <div className="recommendations-section">
        <HealthSuggestions bmi={bmi} bmr={bmr} />
      </div>
    </Card>
  );
};

export default MetricsCard;
