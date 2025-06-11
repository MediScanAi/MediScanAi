import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../../../assets/styles/components/health/metrics-status.css';
import { getBodyFatStatus } from '../../../utils/healthHelpers';
import { bodyFatColors as colors } from '../../../utils/healthColors';

const { Title, Text } = Typography;


const BodyFatStatus: React.FC<{ bodyFat: number | null }> = ({ bodyFat }) => {
  const { t } = useTranslation('health');
  if (bodyFat === null) return null;

  const status = getBodyFatStatus(bodyFat);

  return (
    <div className="metric-container">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }}
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

export default BodyFatStatus;
