import React, { useState } from 'react';
import { Card, Button, Progress, Modal } from 'antd';
import { EditOutlined, TrophyOutlined } from '@ant-design/icons';
import NumberInput from '../common/inputs/NumberInput';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/components/health/health-circles.css';
import { Metric } from '../../utils/healthHelpers';

type Props = {
  metrics: Metric[];
  isDarkMode: boolean;
  showConfetti: { [key: number]: boolean };
  onGoalChange: (index: number, value: string) => void;
  goalInputs: { [key: number]: string };
};

const HealthCircles: React.FC<Props> = ({
  metrics,
  isDarkMode,
  showConfetti,
  onGoalChange,
  goalInputs,
}) => {
  const { t } = useTranslation('health');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number | null>(
    null
  );
  const [tempGoalInput, setTempGoalInput] = useState<string>('');

  const openModal = (index: number) => {
    setSelectedMetricIndex(index);
    setTempGoalInput(goalInputs[index] || '');
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedMetricIndex !== null) {
      onGoalChange(selectedMetricIndex, tempGoalInput);
    }
    setIsModalOpen(false);
    setTempGoalInput('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTempGoalInput('');
  };

  const handleGoalInputChange = (value: string | number | null) => {
    setTempGoalInput(value !== null ? String(value) : '');
  };

  return (
    <>
      <div className="health-circles-grid">
        {metrics.map((metric, index) => {
          const isGoalMetric = [
            'Steps',
            'Active Calories',
            'Resting Calories',
          ].includes(String(metric.type));
          const value = Number(metric.value || 0);
          const goal = Number(goalInputs[index] || 0);

          // Progress bar color logic
          const getProgressColor = () => {
            if (!isGoalMetric) return { '0%': '#4776E6', '100%': '#8E54E9' };
            if (goal <= 0) return { '0%': '#4776E6', '100%': '#8E54E9' };

            const percentage = Math.min((value / goal) * 100, 100);

            if (percentage >= 100)
              return { '0%': '#52C41A', '100%': '#52C41A' };
            if (percentage >= 75) return { '0%': '#4776E6', '100%': '#52C41A' };
            if (percentage >= 50) return { '0%': '#FAAD14', '100%': '#4776E6' };
            return { '0%': '#FF4D4F', '100%': '#FAAD14' };
          };

          return (
            <Card
              key={index}
              className={`health-metric-card ${isDarkMode ? 'dark' : ''}`}
            >
              {showConfetti[index] && <div className="confetti-container" />}
              <Progress
                type="circle"
                percent={
                  isGoalMetric
                    ? goal > 0
                      ? Math.min((value / goal) * 100, 100)
                      : 0
                    : 100
                }
                strokeColor={getProgressColor()}
                strokeWidth={8}
                format={() => (
                  <div
                    className={`progress-content ${isDarkMode ? 'dark' : ''}`}
                  >
                    <div
                      className={`progress-value ${isDarkMode ? 'dark' : ''}`}
                    >
                      {Math.round(value)}
                    </div>
                    <div
                      className={`progress-unit ${isDarkMode ? 'dark' : ''}`}
                    >
                      {String(metric.unit || '')}
                    </div>
                  </div>
                )}
              />
              <div className={`metric-type ${isDarkMode ? 'dark' : ''}`}>
                {String(metric.type || '')}
              </div>
              {isGoalMetric && (
                <div className={`metric-goal ${isDarkMode ? 'dark' : ''}`}>
                  <Button
                    onClick={() => openModal(index)}
                    className={`edit-goal-button ${isDarkMode ? 'dark' : ''}`}
                  >
                    <EditOutlined />
                  </Button>
                  <>
                    {t('health.goal')}: {goal > 0 ? goalInputs[index] : '---'}
                  </>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <Modal
        title={
          <span className={`goal-modal-title ${isDarkMode ? 'dark' : ''}`}>
            <TrophyOutlined className="goal-input-icon" />
            {'  '}{t('health.setGoal')}
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t('health.save')}
        cancelText={t('health.cancel')}
        className={`goal-modal ${isDarkMode ? 'dark' : ''}`}
      >
        {selectedMetricIndex !== null && (
          <NumberInput
            value={tempGoalInput}
            onChange={handleGoalInputChange}
            placeholder={t('health.enterGoalValue')}
            className='goal-input'
            size='large'
          />
        )}
      </Modal>
    </>
  );
};

export default HealthCircles;
