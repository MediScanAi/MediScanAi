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
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { fetchBloodTestData } from '../../../app/slices/bloodTestSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../api/authApi';
import { collection } from 'firebase/firestore';
import { db } from '../../../api/authApi';

const Profile: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const { type } = useParams();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        collection(db, 'users', user.uid, 'bloodTest');
        dispatch(fetchBloodTestData(user.uid));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const items: TabsProps['items'] = [
    {
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={theme ? ' dark-mode-text' : ''}
        >
          <UserOutlined /> Info
        </span>
      ),
      key: 'info',
      children: <UserInfo width={width} theme={theme} />,
    },
    {
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={theme ? ' dark-mode-text' : ''}
        >
          <ExperimentOutlined /> Analysis History
        </span>
      ),
      key: 'analysis-history',
      children: <AnalysisHistory width={width} theme={theme} />,
    },
    {
      key: 'tests',
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={theme ? ' dark-mode-text' : ''}
        >
          <MedicineBoxOutlined /> Tests
        </span>
      ),
      children: <MainTests width={width} theme={theme} />,
    },
    {
      key: 'contact-us',
      label: (
        <span
          style={{ fontSize: width < 1200 ? '16px' : '20px' }}
          className={theme ? ' dark-mode-text' : ''}
        >
          <PhoneOutlined /> Contact Us
        </span>
      ),
      children: <ContactUs width={width} theme={theme} />,
    },
  ];

  const activeKey = items.find((item) => item.key === type)?.key || 'info';

  const handleTabChange = (key: string) => {
    navigate(`/profile/${key}`);
  };

  return (
    <Row className={'Profile' + (theme ? ' dark-theme' : '')}>
      <Col className={'Column'}>
        <Tabs
          tabPosition={width < 820 ? 'top' : 'left'}
          defaultActiveKey="1"
          style={{ padding: 40, marginTop: '20px', color: 'white' }}
          items={items}
          activeKey={activeKey}
          onChange={handleTabChange}
        />
      </Col>
    </Row>
  );
};

export default Profile;
