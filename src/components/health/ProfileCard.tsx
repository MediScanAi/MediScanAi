import React from 'react';
import { Card, Descriptions, Typography, Button } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import WeightAdvice from './WeightAdvice';
import { useTranslation } from 'react-i18next';
import type { UserData } from '../../app/slices/userDataSlice';
import '../../assets/styles/components/health/health-profile-card.css';

const { Title, Text } = Typography;

type Props = {
  isDarkMode: boolean;
  userData: UserData;
};

const ProfileCard: React.FC<Props> = ({ isDarkMode, userData }) => {
  const { t } = useTranslation('health');
  const navigate = useNavigate();

  return (
    <Card className={`profile-card ${isDarkMode ? 'dark' : ''}`}>
      <div className="profile-header">
        <Title
          level={4}
          className={`profile-title ${isDarkMode ? 'dark' : ''}`}
        >
          <UserOutlined
            className={`profile-icon ${isDarkMode ? 'dark' : ''}`}
          />{' '}
          {t('health.profile.title')}
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate('/profile/info')}
            className={`edit-profile-button ${isDarkMode ? 'dark' : ''}`}
          />
        </Title>
      </div>

      <Descriptions
        bordered
        column={1}
        className={`profile-descriptions ${isDarkMode ? 'dark' : ''}`}
        size="small"
      >
        <Descriptions.Item
          className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
          label={t('health.profile.age')}
        >
          <Text className={`profile-text ${isDarkMode ? 'dark' : ''}`}>
            {userData?.age
              ? t('health.years', { years: userData.age })
              : t('health.notSet')}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item
          className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
          label={t('health.profile.weight')}
        >
          <Text className={`profile-text ${isDarkMode ? 'dark' : ''}`}>
            {userData?.weight
              ? t('health.kg', { kg: userData.weight })
              : t('health.notSet')}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item
          className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
          label={t('health.profile.height')}
        >
          <Text className={`profile-text ${isDarkMode ? 'dark' : ''}`}>
            {userData?.height
              ? t('health.cm', { cm: userData.height })
              : t('health.notSet')}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item
          className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
          label={t('health.profile.waistSize')}
        >
          <Text className={`profile-text ${isDarkMode ? 'dark' : ''}`}>
            {userData?.waistSize
              ? t('health.cm', { cm: userData.waistSize })
              : t('health.notSet')}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item
          className={`profile-descriptions-item ${isDarkMode ? 'dark' : ''}`}
          label={t('health.profile.neckSize')}
        >
          <Text className={`profile-text ${isDarkMode ? 'dark' : ''}`}>
            {userData?.neckSize
              ? t('health.cm', { cm: userData.neckSize })
              : t('health.notSet')}
          </Text>
        </Descriptions.Item>
      </Descriptions>

      <div className="profile-summary">
        <WeightAdvice
          weight={userData?.weight ?? null}
          height={userData?.height ?? null}
        />
      </div>
    </Card>
  );
};

export default ProfileCard;
