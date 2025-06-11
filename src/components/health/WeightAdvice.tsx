import React from 'react';
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/components/health/weight-advice.css';

type Props = {
  weight: number | null;
  height: number | null;
};

const WeightAdvice: React.FC<Props> = ({ weight, height }) => {
  const { t } = useTranslation('health');
  if (!weight || !height) return null;

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

export default WeightAdvice;
