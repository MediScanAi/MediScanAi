import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../../../assets/styles/components/health/metrics-status.css';
import { getBmrColor } from '../../../utils/healthHelpers';

const { Title, Text } = Typography;

const BmrStatus: React.FC<{ bmr: number | null }> = ({ bmr }) => {
  const { t } = useTranslation('health');
  if (bmr === null) return null;

  return (
    <div className="metric-container">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
        className="metric-badge"
        style={{ backgroundColor: getBmrColor(bmr) }}
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

export default BmrStatus;
