import { Col, Row, Tabs, type TabsProps } from 'antd';
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import UserInfo from './UserInfo.tsx';
import '../../../assets/styles/Profile.css';
const items: TabsProps['items'] = [
  {
    label: <span className={'menu-button'}>Info</span>,
    key: 'info',
    icon: <UserOutlined />,
    children: <UserInfo />,
  },
  {
    label: <span className={'menu-button'}>Analysis</span>,
    key: 'analysis',
    icon: <ExperimentOutlined />,
  },
  {
    key: 'doctor',
    label: <span className={'menu-button'}>Your AI Doctor</span>,
    icon: <MedicineBoxOutlined />,
  },
  {
    key: 'about',
    label: <label className={'menu-button'}>About Us</label>,
    icon: <TeamOutlined />,
  },
];

function Profile() {
  return (
    <Row>
      <Col className={'Column'}>
        <Tabs
          tabPosition={'left'}
          defaultActiveKey="1"
          style={{ padding: 10 }}
          items={items}
        />
      </Col>
    </Row>
  );
}
export default Profile;
