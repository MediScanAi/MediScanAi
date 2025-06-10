import React from 'react';
import { Tag, Space, Statistic, Typography } from 'antd';
import {
  SmileOutlined,
  WarningOutlined,
  FrownOutlined,
  FireOutlined,
  LineChartOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/hooks';
import '../../assets/styles/components/health/health-suggestions.css';
import { getBmiStatus } from '../../utils/healthHelpers';

const { Paragraph } = Typography;

type Props = {
  bmi: number | null;
  bmr: number | null;
};

const HealthSuggestions: React.FC<Props> = ({ bmi, bmr }) => {
  const status = getBmiStatus(bmi);
  const { t } = useTranslation('health');
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  if (bmi === null) return null;
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

export default HealthSuggestions;
