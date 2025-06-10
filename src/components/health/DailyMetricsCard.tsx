import React from 'react';
import { Card, Typography, DatePicker, Divider } from 'antd';
import {
  LineChartOutlined,
  CalendarOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import HealthCircles from './HealthCircles';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import '../../assets/styles/pages/health-page.css';
import { Metric } from '../../utils/healthHelpers';

const { Title, Text } = Typography;

type Props = {
  isDarkMode: boolean;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  metrics: Metric[];
  showConfetti: { [key: number]: boolean };
  onGoalChange: (index: number, value: string) => void;
  goalInputs: { [key: number]: string };
};

const DailyMetricsCard: React.FC<Props> = ({
  isDarkMode,
  selectedDate,
  setSelectedDate,
  metrics,
  showConfetti,
  onGoalChange,
  goalInputs,
}) => {
  const { t } = useTranslation('health');

  return (
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
          onChange={(date) => setSelectedDate(date?.toDate() || null)}
          style={{ width: '290px' }}
          disabledDate={(current) => current && current > dayjs().endOf('day')}
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

      <Divider className={`metrics-divider ${isDarkMode ? 'dark' : ''}`} />

      <div className="metrics-content">
        {!selectedDate || metrics.length === 0 ? (
          <div className={`no-data-container ${isDarkMode ? 'dark' : ''}`}>
            <InboxOutlined
              className={`no-data-icon ${isDarkMode ? 'dark' : ''}`}
            />
            <Text className={`no-data-text ${isDarkMode ? 'dark' : ''}`}>
              {t('health.noData')}
            </Text>
          </div>
        ) : (
          <div
            className={`health-circles-container ${isDarkMode ? 'dark' : ''}`}
          >
            <HealthCircles
              metrics={metrics}
              isDarkMode={isDarkMode}
              showConfetti={showConfetti}
              onGoalChange={onGoalChange}
              goalInputs={goalInputs}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default DailyMetricsCard;
