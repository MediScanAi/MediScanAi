import { Col, Row, Tabs, type TabsProps } from 'antd';
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import UserInfo from './UserInfo.tsx';
import '../../../assets/styles/Profile.css';
import MainTests from '../testsform/MainTests.tsx';
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
    children: (
      <div>
        <p>Contact Us</p>
        <p>Phone: +1234567890</p>
        <p>Email: mediscan@center.com</p>
        <p>Address: 123 Main St, Anytown, USA</p>
        <p>Hours: Mon - Fri: 9:00 AM - 5:00 PM</p>
        <p>LinkedIn: <a>Mediscan Center</a></p>
      </div>
    ),
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
