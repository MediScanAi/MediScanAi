import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../../../assets/styles/pages/health-page.css';
import { bmiColors as colors } from '../../../utils/healthColors';
import { getBmiStatus } from '../../../utils/healthHelpers';

const { Title, Text } = Typography;

const BmiStatus: React.FC<{ bmi: number | null }> = ({ bmi }) => {
  const { t } = useTranslation('health');
  if (bmi === null) return null;

  const status = getBmiStatus(bmi);

  return (
    <div className="metric-container">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 60, delay: 0.5 }}
        className="metric-badge"
        style={{ backgroundColor: colors[status as keyof typeof colors] ?? '#d9d9d9' }}
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

export default BmiStatus;
