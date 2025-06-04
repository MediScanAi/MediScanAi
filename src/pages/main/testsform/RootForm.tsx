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
import PrimaryButton from '../../../components/common/PrimaryButton.tsx';

const { Title, Text } = Typography;

function RootForm(): ReactNode | null {
  const navigate = useNavigate();
  const { testType } = useParams();
  const { t } = useTranslation();

  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
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
    <div className={`root-form-container ${isDarkMode ? ' dark' : ''}`}>
      <PrimaryButton
        style={{ left: '50px', marginTop: '10px' }}
        onClick={() => navigate('/profile/info')}
      >
        {t('rootform.backButton')}
      </PrimaryButton>

      <Row className="form-main-container">
        <Col xs={24} md={10} className="form-left-content">
          <div className="form-header">
            <Title
              level={2}
              className={`medical-title ${isDarkMode ? 'dark' : ''}`}
            >
              {t('rootform.medicalLaboratoryTestForm')}
            </Title>
            <Text className={`medical-subtitle ${isDarkMode ? 'dark' : ''}`}>
              {t('rootform.selectTestType')}
            </Text>
          </div>

          <div className="medical-image-container">
            <img
              draggable={false}
              src={laboratoryImage}
              alt={t('rootform.medicalIllustration')}
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
