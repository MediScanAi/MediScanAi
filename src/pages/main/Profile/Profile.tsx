import { Col, Row, Tabs, type TabsProps } from 'antd';
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../../../assets/styles/Profile.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import UserInfo from './UserInfo';
import AnalysisHistory from './AnalysisHistory';
import MainTests from './MainTests';
import ContactUs from './ContactUs';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';

const Profile: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const { type } = useParams();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items: TabsProps['items'] = [
    {
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={isDarkMode ? ' dark-mode-text' : ''}
        >
          <UserOutlined /> Info
        </span>
      ),
      key: 'info',
      children: <UserInfo width={width} theme={isDarkMode} />,
    },
    {
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={isDarkMode ? ' dark-mode-text' : ''}
        >
          <ExperimentOutlined /> Analysis History
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
          className={isDarkMode ? ' dark-mode-text' : ''}
        >
          <MedicineBoxOutlined /> Tests
        </span>
      ),
      children: <MainTests width={width} theme={isDarkMode} />,
    },
    {
      key: 'contact-us',
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={isDarkMode ? ' dark-mode-text' : ''}
        >
          <PhoneOutlined /> Contact Us
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
    <Row className={'profile' + (isDarkMode ? ' dark' : '')}>
      <Col className={'Column'}>
        <Tabs
          className={`tabs ${isDarkMode ? 'dark' : ''}`}
          tabPosition={width < 820 ? 'top' : 'left'}
          defaultActiveKey="1"
          style={{  color: 'white', minHeight: '70vh' }}
          items={items}
          activeKey={activeKey}
          onChange={handleTabChange}
        />
      </Col>
    </Row>
  );
};

export default Profile;
