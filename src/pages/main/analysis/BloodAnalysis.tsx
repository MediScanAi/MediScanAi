import { Card, Progress, Row, Col, Typography } from 'antd';
import { LineChart } from '../../../components/charts/index';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';
import '../../../assets/styles/analysis.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchBloodTestData } from '../../../app/slices/bloodTestSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../api/authApi';
import { collection } from 'firebase/firestore';
import { db } from '../../../api/authApi';
interface TrendData {
  date: string;
  value: number;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface Scorecard {
  label: string;
  value: number | null;
  percent: number;
}

const CustomPieChart = ({ data }: { data: ChartData[] }) => (
  <ResponsiveContainer width={300} height={300}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color || '#8884d8'} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

const CustomBarChart = ({ data }: { data: ChartData[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value">
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color || '#1890ff'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const { Title } = Typography;

function BloodAnalysis() {
  const dispatch = useAppDispatch();
  const bloodTestData = useAppSelector(
    (state) => state.bloodTest.bloodTestData
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        collection(db, 'users', user.uid, 'bloodTest');
        dispatch(fetchBloodTestData(user.uid));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (!bloodTestData) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        Loading your blood test data...
      </div>
    );
  }
  //   const data = {
  //     Cholesterol: bloodTestData.cholesterol || 0,
  //     Glucose: bloodTestData.glucose || 0,
  //     Hemoglobin: bloodTestData.hemoglobin || 0,
  //     Platelets: bloodTestData.platelets || 0,
  //     RBC: bloodTestData.rbc || 0,
  //     WBC: bloodTestData.wbc || 0,
  //   };

  const PieData: ChartData[] = [
    {
      name: 'Cholesterol',
      value: bloodTestData.cholesterol || 0,
      color: '#8884d8',
    },
    { name: 'Glucose', value: bloodTestData.glucose || 0, color: '#82ca9d' },
    {
      name: 'Hemoglobin',
      value: bloodTestData.hemoglobin || 0,
      color: '#ffc658',
    },
    {
      name: 'Platelets',
      value: bloodTestData.platelets || 0,
      color: '#ff8042',
    },
    { name: 'RBC', value: bloodTestData.rbc || 0, color: '#0088FE' },
    { name: 'WBC', value: bloodTestData.wbc || 0, color: '#0088FE' },
  ];

  const BarData: ChartData[] = [
    {
      name: 'Cholesterol',
      value: bloodTestData.cholesterol || 0,
      color: '#8884d8',
    },
    { name: 'Glucose', value: bloodTestData.glucose || 0, color: '#82ca9d' },
    {
      name: 'Hemoglobin',
      value: bloodTestData.hemoglobin || 0,
      color: '#ffc658',
    },
    {
      name: 'Platelets',
      value: bloodTestData.platelets || 0,
      color: '#ff8042',
    },
    { name: 'RBC', value: bloodTestData.rbc || 0, color: '#0088FE' },
    { name: 'WBC', value: bloodTestData.wbc || 0, color: '#0088FE' },
  ];

  const scorecards = [
    {
      label:
        'Hemoglobin (g/dL) - Normal range: 13.8-17.2 (men), 12.1-15.1 (women), 14.5-18.5 (children), and 14.5-16.5 (pregnant women)',
      value: bloodTestData.hemoglobin,
      percent: 85,
    },
    {
      label:
        'Glucose (mg/dL) - Normal range: 70-100 (fasting), 140-180 (post-meal), and 80-120 (random, fasting), and 180-220 (random, post-meal)',
      value: bloodTestData.glucose,
      percent: 70,
    },
    {
      label:
        'Platelets (10^9/L) - Normal range: 150-450 (men), 150-400 (women), 180-500 (children), and 150-350 (pregnant women)',
      value: bloodTestData.platelets,
      percent: 90,
    },
  ];

  const trendData: TrendData[] = [
    {
      date: `Cholesterol: ${bloodTestData.date || 0}`,
      value: bloodTestData.cholesterol || 0,
      color: '#8884d8',
    },
    {
      date: `Glucose: ${bloodTestData.date || 0}`,
      value: bloodTestData.glucose || 0,
      color: '#82ca9d',
    },
    {
      date: `Hemoglobin: ${bloodTestData.date || 0}`,
      value: bloodTestData.hemoglobin || 0,
      color: '#ffc658',
    },
    {
      date: `Platelets: ${bloodTestData.date || 0}`,
      value: bloodTestData.platelets || 0,
      color: '#ff8042',
    },
    {
      date: `RBC: ${bloodTestData.date || 0}`,
      value: bloodTestData.rbc || 0,
      color: '#0088FE',
    },
    {
      date: `WBC: ${bloodTestData.date || 0}`,
      value: bloodTestData.wbc || 0,
      color: '#0088FE',
    },
  ];

  return (
    <div>
      <Col
        style={{
          backgroundColor: 'white',
          margin: '0 auto',
          marginTop: '60px',
        }}
      >
        <div className="inside-dev">
          <Col className="row-col">
            <Title level={3} style={{ color: 'black' }}>
              Blood Test Results
            </Title>
            <h5 style={{ color: 'black', margin: '10px' }}>
              Blood test results are used to check for the presence of various
              substances in the blood.
            </h5>
          </Col>
        </div>
      </Col>

      <Card
        style={{
          flex: 4,
          borderRadius: '15px',
          marginRight: '25px',
          border: 'none',
          width: '90%',
          margin: '0 auto',
        }}
      >
        <CustomBarChart data={BarData} />
      </Card>

      <Row style={{ marginTop: '80px', margin: '0 auto', display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            gap: 32,
            margin: '0 auto',
            width: '96.5%',
            justifyContent: 'center',
          }}
        >
          <Card style={{ border: 'none' }} className="cholesterol-breakdown">
            <CustomPieChart data={PieData} />
          </Card>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              justifyContent: 'center',
            }}
          >
            <h3 style={{ fontSize: 16, color: '#8884d8' }}>
              This chart shows the breakdown of your cholesterol levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#82ca9d' }}>
              This chart shows the breakdown of your glucose levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#ffc658' }}>
              This chart shows the breakdown of your hemoglobin levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#ff8042' }}>
              This chart shows the breakdown of your platelets levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#0088FE' }}>
              This chart shows the breakdown of your RBC levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#0088FE' }}>
              This chart shows the breakdown of your WBC levels.
            </h3>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          {scorecards.map((item: Scorecard) => (
            <Card
              style={{
                textAlign: 'center',
                borderRadius: '15px',
                border: 'none',
              }}
            >
              <Progress
                type="circle"
                percent={item.percent}
                format={() => `${item.value}`}
                strokeWidth={15}
              />
              <div style={{ marginTop: 45 }}>{item.label}</div>
            </Card>
          ))}
        </div>
      </Row>

      <Col style={{ marginTop: 32, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#3498db' }}>
          Blood Test Trends (depends on your last test)
        </h2>
        <p style={{ fontSize: 16, color: '#666' }}>
          This chart shows the trend of your cholesterol levels over time.
        </p>
        <LineChart data={trendData} />
      </Col>
    </div>
  );
}

export default BloodAnalysis;
