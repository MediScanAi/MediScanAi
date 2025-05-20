import { Tabs, Typography, Card, Button, Row, Col, Collapse } from 'antd';
import type { TabsProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import type { ReactNode } from 'react';
import {
  HeartFilled,
  SafetyOutlined,
  HeatMapOutlined,
  MonitorOutlined,
  EnterOutlined,
} from '@ant-design/icons';
import formImage from '../../../assets/photos/Productivity 10.png';
import laboratoryImage from '../../../assets/photos/Education8.png';
import '../../../assets/styles/rootForm.css';
import VitaminTestForm from './VitaminTestForm';
import UrineTestForm from './UrineTestForm';
import BloodTestsForm from './BloodTestForm';
import GeneticTestForm from './GeneticTestForm';

const { Title, Text } = Typography;

function RootForm(): ReactNode | null {
  const navigate = useNavigate();
  const { testType } = useParams();
  const user = useAppSelector((state) => state.auth.user);

  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const items: TabsProps['items'] = [
    {
      label: (
        <span>
          <HeartFilled style={{ marginRight: 8 }} />
          Blood Test
        </span>
      ),
      key: 'blood-test',
      children: <BloodTestsForm />,
    },
    {
      label: (
        <span>
          <MonitorOutlined style={{ marginRight: 8 }} />
          Urine Test
        </span>
      ),
      key: 'urine-test',
      children: <UrineTestForm />,
    },
    {
      label: (
        <span>
          <SafetyOutlined style={{ marginRight: 8 }} />
          Vitamin Test
        </span>
      ),
      key: 'vitamin-test',
      children: <VitaminTestForm />,
    },
    {
      label: (
        <span>
          <HeatMapOutlined style={{ marginRight: 8 }} />
          Genetic Test
        </span>
      ),
      key: 'genetic-test',
      children: <GeneticTestForm />,
    },
  ];

  const handleTabChange = (key: string) => {
    navigate(`/tests-form/${key}`);
  };

  const activeKey =
    items.find((item) => item.key === testType)?.key || 'blood-test';

  return (
    <div className={'root-form' + (theme ? ' dark-theme' : '')}>
      <Button
        className="back-button"
        onClick={() => navigate('/profile/info')}
        type="primary"
      >
        Back to Profile
      </Button>
      <Row className="form-welcome-section">
        <Col span={24} className="welcome-user-container">
          <Text className="welcome-user-greeting">
            Welcome back, {user?.email || 'User'}
          </Text>
        </Col>
        <Row className="welcome-content-container">
          <Col className="image-column">
            <img src={formImage} alt="platform" className="form-platform-image" />
          </Col>
          <Col className="text-column">
            <Title className="form-welcome-title">MediScanAI Diagnostic Portal</Title>
            <Text className="form-welcome-message">
              Comprehensive medical test analysis powered by AI
              Receive accurate results and personalized insights within 24 hours.
            </Text>
          </Col>
        </Row>
      </Row>

      <Col span={24}>

      </Col>

      <Row className="form-main-container">
        <Col xs={24} md={10} className="form-left-content">

          <div className="form-header">
            <Title level={2} className="medical-title">
              Medical Laboratory Test Form
            </Title>
            <Text className="medical-subtitle">
              Select a test type and provide the required specimen information
            </Text>
          </div>

          <div className="medical-image-container">
            <img
              src={laboratoryImage}
              alt="Medical illustration"
            />
          </div>
        </Col>

        <Col xs={24} md={14} className="form-right-content">
          <Card className="medical-form-card">
            <Tabs
              type="card"
              size="large"
              activeKey={activeKey}
              onChange={handleTabChange}
              items={items}
              className="medical-tabs"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default RootForm;