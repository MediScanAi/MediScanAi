import { Tabs, Typography, Card, Button } from 'antd';
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
import '../../../assets/styles/rootForm.css';
import VitaminTestForm from './VitaminTestForm';
import UrineTestForm from './UrineTestForm';
import BloodTestsForm from './BloodTestForm';
import GeneticTestForm from './GeneticTestForm';

const { Title, Text } = Typography;

function RootForm(): ReactNode | null {
  const navigate = useNavigate();
  const { testType } = useParams();
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
      <div className="medical-form-container">
        <div className="welcome-banner">
          <div className="welcome-content">
            <Title level={2} className="welcome-title">
              Welcome to Our Medical Laboratory Portal
            </Title>
            <Text className="welcome-message">
              Your health is our priority. Get accurate test results with our
              MediScanAi technologies.
            </Text>
          </div>
        </div>

        <div className="form-content">
          <div className="form-header">
            <Button
              className="back-button"
              onClick={() => navigate('/profile')}
              type="primary"
            >
              <EnterOutlined style={{ width: 16, height: 16, fontSize: 18 }} />
              Back to Profile
            </Button>

            <div className="header-content">
              <Title level={1} className="medical-title">
                Medical Laboratory Test Form
              </Title>
              <p className="medical-subtitle">
                Select a test type and provide the required specimen information
              </p>
            </div>
          </div>

          <Card className="medical-form-card">
            <Tabs
              type="card"
              centered
              size="large"
              activeKey={activeKey}
              onChange={handleTabChange}
              items={items}
              className="medical-tabs"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RootForm;
