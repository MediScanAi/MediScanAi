import { Col, Row, Tabs, type TabsProps } from 'antd';
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import UserInfo from './UserInfo';
import '../../../assets/styles/Profile.css';
import MainTests from './MainTests';
import AnalysisHistory from './AnalysisHistory';
import ContactUs from './ContactUs';
const items: TabsProps['items'] = [
  {
    label: <span className={'menu-button'}>Info</span>,
    key: 'info',
    icon: <UserOutlined />,
    children: <UserInfo />,
  },
  {
    label: <span className={'menu-button'}>Analysis History</span>,
    key: 'analysis',
    icon: <ExperimentOutlined />,
    children: <AnalysisHistory />,
  },
  {
    key: 'doctor',
    label: <span className={'menu-button'}>Tests</span>,
    icon: <MedicineBoxOutlined />,
    children: <MainTests />,
  },
  {
    key: 'about',
    label: <label className={'menu-button'}>Contact Us</label>,
    icon: <PhoneOutlined />,
    children: <ContactUs />,
  },
];

function Profile() {
  return (
    <Row style={{ marginTop: '20px' }}>
      <Col className={'Column'}>
        <Tabs
          tabPosition={'left'}
          defaultActiveKey="1"
          style={{ padding: 40, marginTop: '20px' }}
          items={items}
        />
      </Col>
    </Row>
  );
}
export default Profile;
