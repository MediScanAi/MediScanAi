import { Tabs, type TabsProps } from 'antd';
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../../assets/styles/pages/profile-page.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import UserInfo from './UserInfoPage';
import AnalysisHistory from './AnalysisHistoryPage';
import MainTests from './MainTestsPage';
import ContactUs from './ContactUsPage';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';

const validTabs = ['info', 'analysis-history', 'tests', 'contact-us'];

const Profile: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const { type } = useParams();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const { t } = useTranslation('profil');
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!type || !validTabs.includes(type)) {
    return <Navigate to={'/*'} replace />;
  }

  const items: TabsProps['items'] = [
    {
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={`tab-label ${isDarkMode ? 'dark-mode-text' : ''}`}
        >
          <UserOutlined /> {t('profil.info')}
        </span>
      ),
      key: 'info',
      children: <UserInfo width={width} theme={isDarkMode} />,
    },
    {
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={`tab-label ${isDarkMode ? 'dark-mode-text' : ''}`}
        >
          <ExperimentOutlined /> {t('profil.analysisHistory')}
        </span>
      ),
      key: 'analysis-history',
      children: <AnalysisHistory width={width} theme={isDarkMode} />,
    },
    {
      key: 'tests',
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={`tab-label ${isDarkMode ? 'dark-mode-text' : ''}`}
        >
          <MedicineBoxOutlined /> {t('profil.tests')}
        </span>
      ),
      children: <MainTests width={width} theme={isDarkMode} />,
    },
    {
      key: 'contact-us',
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={`tab-label ${isDarkMode ? 'dark-mode-text' : ''}`}
        >
          <PhoneOutlined /> {t('profil.contactUs')}
        </span>
      ),
      children: <ContactUs width={width} theme={isDarkMode} />,
    },
  ];

  const activeKey = items.find((item) => item.key === type)?.key || 'info';

  const handleTabChange = (key: string) => {
    navigate(`/profile/${key}`);
  };

  return (
    <div className={'profile' + (isDarkMode ? ' dark' : '')}>
      <div className="profile-container">
        <Tabs
          className={`tabs ${isDarkMode ? 'dark' : ''}`}
          tabPosition={width < 820 ? 'top' : 'left'}
          defaultActiveKey="1"
          style={{ minHeight: '70vh' }}
          items={items}
          activeKey={activeKey}
          onChange={handleTabChange}
        />
      </div>
    </div>
  );
};

export default Profile;
