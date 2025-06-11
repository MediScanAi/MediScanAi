import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../../../assets/styles/components/health/metrics-status.css';
import { idealWeightColors as colors } from '../../../utils/healthColors';
const { Title, Text } = Typography;

type Props = {
  idealWeight: number | null;
  currentWeight: number;
};

const IdealWeightStatus: React.FC<Props> = ({ idealWeight, currentWeight }) => {
  const { t } = useTranslation('health');
  if (idealWeight === null) return null;

  const difference = currentWeight - idealWeight;
  const getStatus = () => {
    if (Math.abs(difference) < 5) return 'ideal';
    return difference > 0 ? 'over' : 'under';
  };

  const status = getStatus();

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
        style={{ backgroundColor: colors[status as keyof typeof colors] }}
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

export default IdealWeightStatus;
