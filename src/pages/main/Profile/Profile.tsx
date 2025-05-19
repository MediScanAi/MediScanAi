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
import UserInfo from '../Profile/UserInfo';
import AnalysisHistory from '../Profile/AnalysisHistory';
import MainTests from '../Profile/MainTests';
import ContactUs from '../Profile/ContactUs';
import {useAppSelector} from "../../../app/hooks.ts";
import React, {useEffect, useState} from "react";


const Profile: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode)
  const { type } = useParams();
  const navigate = useNavigate();
  const [width,setWidth] = useState(window.innerWidth) ;
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items: TabsProps['items'] = [
    {
      label: <span className={'menu-button'+(theme?' dark-mode-text':'')}><UserOutlined />  Info</span>,
      key: 'info',
      children: <UserInfo theme={theme} />,
    },
    {
      label: <span className={'menu-button'+(theme?' dark-mode-text':'')}><ExperimentOutlined />  Analysis History</span>,
      key: 'analysis-history',
      children: <AnalysisHistory width={width} theme={theme} />,
    },
    {
      key: 'tests',
      label: <span className={'menu-button'+(theme?' dark-mode-text':'')}><MedicineBoxOutlined />  Tests</span>,
      children: <MainTests width={width} theme={theme} />,
    },
    {
      key: 'contact-us',
      label: <span className={'menu-button'+(theme?' dark-mode-text':'')}><PhoneOutlined />  Contact Us</span>,
      children: <ContactUs  theme={theme}/>,
    },
  ];

  const activeKey =
    items.find((item) => item.key === type)?.key || 'info';

  const handleTabChange = (key: string) => {
    navigate(`/profile/${key}`);
  };

  return (
    <Row className={'Profile'+(theme?' dark-theme':'')} >
      <Col className={'Column'}>
        <Tabs
          tabPosition={width<820?'top':'left'}
          defaultActiveKey="1"
          style={{ padding: 40, marginTop: '20px' ,color:'white'}}
          items={items}
          activeKey={activeKey}
          onChange={handleTabChange}
        />
      </Col>
    </Row>
  );
}

export default Profile;