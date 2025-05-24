import { Tabs, Typography, Card, Button, Row, Col } from 'antd';
import type { TabsProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import type { ReactNode } from 'react';
import {
  HeartFilled,
  SafetyOutlined,
  HeatMapOutlined,
  MonitorOutlined,
} from '@ant-design/icons';
import formImage from '../../../assets/photos/Productivity 10.png';
import laboratoryImage from '../../../assets/photos/Education8.png';
import '../../../assets/styles/rootForm.css';
import VitaminTestForm from './VitaminTestForm';
import UrineTestForm from './UrineTestForm';
import BloodTestsForm from './BloodTestForm';
import GeneticTestForm from './GeneticTestForm';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

function RootForm(): ReactNode | null {
  const navigate = useNavigate();
  const { testType } = useParams();
  const { t } = useTranslation();

  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const items: TabsProps['items'] = [
    {
      label: (
        <span>
          <HeartFilled style={{ marginRight: 8 }} />
          {t('rootform.blood')}
        </span>
      ),
      key: 'blood-test',
      children: <BloodTestsForm />,
    },
    {
      label: (
        <span>
          <MonitorOutlined style={{ marginRight: 8 }} />
          {t('rootform.urine')}
        </span>
      ),
      key: 'urine-test',
      children: <UrineTestForm />,
    },
    {
      label: (
        <span>
          <SafetyOutlined style={{ marginRight: 8 }} />
          {t('rootform.vitamin')}
        </span>
      ),
      key: 'vitamin-test',
      children: <VitaminTestForm />,
    },
    {
      label: (
        <span>
          <HeatMapOutlined style={{ marginRight: 8 }} />
          {t('rootform.genetic')}
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
    <div className={theme ? ' dark-theme' : ''}>
      <Row className="form-welcome-section">
        <div className="welcome-top-row">
          <Button
            className="back-button"
            onClick={() => navigate('/profile/info')}
            type="primary"
          >
            {t('rootform.backButton')}
          </Button>
        </div>

        <Row className="welcome-content-container">
          <Col className="image-column">
            <img
              src={formImage}
              alt={t('platform')}
              className="form-platform-image"
            />
          </Col>
          <Col className="text-column">
            <Title className="form-welcome-title">
              {t('rootform.welcomeTitle')}
            </Title>
            <Text className="form-welcome-message">
              {t('rootform.welcomeMessage')}
            </Text>
          </Col>
        </Row>
      </Row>
      <Row className="form-main-container">
        <Col xs={24} md={10} className="form-left-content">
          <div className="form-header">
            <Title level={2} className="medical-title">
              {t('rootform.medicalLaboratoryTestForm')}
            </Title>
            <Text className="medical-subtitle">
              {t('rootform.selectTestType')}
            </Text>
          </div>

          <div className="medical-image-container">
            <img src={laboratoryImage} alt={t('rootform.medicalIllustration')} />
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
