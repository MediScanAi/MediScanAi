import { Tabs, Typography, Card, Row, Col } from 'antd';
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
import laboratoryImage from '../../../assets/photos/Education8.webp';
import '../../../assets/styles/rootForm.css';
import VitaminTestForm from './VitaminTestForm';
import UrineTestForm from './UrineTestForm';
import BloodTestsForm from './BloodTestForm';
import GeneticTestForm from './GeneticTestForm';
import { useTranslation } from 'react-i18next';
import SecondaryButton from '../../../components/common/SecondaryButton.tsx';

const { Title, Text } = Typography;

function RootForm(): ReactNode | null {
  const navigate = useNavigate();
  const { testType } = useParams();
  const { t } = useTranslation('rootForm');

  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const items: TabsProps['items'] = [
    {
      label: (
        <span>
          <HeartFilled style={{ marginRight: 8 }} />
          {t('rootForm.blood')}
        </span>
      ),
      key: 'blood-test',
      children: <BloodTestsForm />,
    },
    {
      label: (
        <span>
          <MonitorOutlined style={{ marginRight: 8 }} />
          {t('rootForm.urine')}
        </span>
      ),
      key: 'urine-test',
      children: <UrineTestForm />,
    },
    {
      label: (
        <span>
          <SafetyOutlined style={{ marginRight: 8 }} />
          {t('rootForm.vitamin')}
        </span>
      ),
      key: 'vitamin-test',
      children: <VitaminTestForm />,
    },
    {
      label: (
        <span>
          <HeatMapOutlined style={{ marginRight: 8 }} />
          {t('rootForm.genetic')}
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
    <div className={`root-form-container ${isDarkMode ? ' dark' : ''}`}>
      <SecondaryButton
        className="back-button"
        onClick={() => navigate('/profile/info')}
      >
        {t('rootForm.backButton')}
      </SecondaryButton>

      <Row className="form-main-container">
        <Col xs={24} md={10} className="form-left-content">
          <div className="form-header">
            <Title
              level={2}
              className={`medical-title ${isDarkMode ? 'dark' : ''}`}
            >
              {t('rootForm.medicalLaboratoryTestForm')}
            </Title>
            <Text className={`medical-subtitle ${isDarkMode ? 'dark' : ''}`}>
              {t('rootForm.selectTestType')}
            </Text>
          </div>

          <div className="medical-image-container">
            <img
              draggable={false}
              src={laboratoryImage}
              alt={t('rootForm.medicalIllustration')}
              style={{ width: '90%' }}
            />
          </div>
        </Col>

        <Col xs={24} md={14}>
          <Card className={`medical-form-card ${isDarkMode ? 'dark' : ''}`}>
            <Tabs
              type="card"
              size="large"
              activeKey={activeKey}
              onChange={handleTabChange}
              items={items}
              className={`medical-tabs ${isDarkMode ? 'dark' : ''}`}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default RootForm;
