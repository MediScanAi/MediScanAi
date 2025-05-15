import { Tabs, Typography, Card } from 'antd';
import type { TabsProps } from 'antd';
import BloodTestsForm from './BloodTestForm';
import UrineTestForm from './UrineTestForm';
import VitaminTestForm from './VitaminTestForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import type { ReactNode } from 'react';

const { Title } = Typography;

function RootForm(): ReactNode | null {
  const navigate = useNavigate();
  const { testType } = useParams();
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  const items: TabsProps['items'] = [
    {
      label: 'Blood Test',
      key: 'blood-test',
      children: <BloodTestsForm />,
    },
    {
      label: 'Urine Test',
      key: 'urine-test',
      children: <UrineTestForm />,
    },
    {
      label: 'Vitamin Test',
      key: 'vitamin-test',
      children: <VitaminTestForm />,
    },
  ];

  const handleTabChange = (key: string) => {
    navigate(`/tests-form/${key}`);
  };

  const activeKey =
    items.find((item) => item.key === testType)?.key || 'blood-test';

  return (
    <div className={'root-form' + ' ' + (theme ? 'dark-theme' : '')}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={1} style={{ color: 'black', marginBottom: 0 }}>
          Medical Test Form
        </Title>
        <p style={{ fontSize: 18, color: 'black' }}>
          Select a test and fill out the required information
        </p>
      </div>

      <Card
        style={{
          width: '100%',
          maxWidth: 960,
          borderRadius: 12,
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          background: '#fff',
          position: 'relative',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Tabs
          type="card"
          centered
          size="large"
          activeKey={activeKey}
          onChange={handleTabChange}
          items={items}
        />
      </Card>
    </div>
  );
}

export default RootForm;
