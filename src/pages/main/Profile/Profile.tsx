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
import { useAppSelector } from '../../../app/hooks.ts';

const Profile: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const { type } = useParams();
  const navigate = useNavigate();

  const items: TabsProps['items'] = [
    {
      label: <span className={'menu-button'}>Info</span>,
      key: 'info',
      icon: <UserOutlined />,
      children: <UserInfo />,
    },
    {
      label: <span className={'menu-button'}>Analysis History</span>,
      key: 'analysis-history',
      icon: <ExperimentOutlined />,
      children: <AnalysisHistory />,
    },
    {
      key: 'tests',
      label: <span className={'menu-button'}>Tests</span>,
      icon: <MedicineBoxOutlined />,
      children: <MainTests />,
    },
    {
      key: 'contact-us',
      label: <label className={'menu-button'}>Contact Us</label>,
      icon: <PhoneOutlined />,
      children: <ContactUs />,
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
          tabPosition={'left'}
          defaultActiveKey="1"
          style={{ padding: 40, marginTop: '20px', height: '80vh' }}
          items={items}
          activeKey={activeKey}
          onChange={handleTabChange}
        />
      </Col>
    </Row>
  );
};

export default Profile;
