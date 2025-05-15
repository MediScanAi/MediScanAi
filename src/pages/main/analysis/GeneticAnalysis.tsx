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
import type { GeneticTestFormValues } from '../../../app/slices/geneticTestSlice';

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

function GeneticAnalysis() {
  const mockAnalysisData: GeneticTestFormValues = JSON.parse(
    localStorage.getItem('geneticTestData') || '{}'
  );

  if (!mockAnalysisData) {
    return <div>No data found</div>;
  }

  console.log(mockAnalysisData);

  const data = {
    APOE: mockAnalysisData.apoe || 0,
    BRCA1: mockAnalysisData.brca1 || 0,
    BRCA2: mockAnalysisData.brca2 || 0,
    TP53: mockAnalysisData.cyp2c19 || 0,
    EGFR: mockAnalysisData.factor_v_leiden || 0,
    ALK: mockAnalysisData.mthfr || 0,
  };

  const aiCondition = Object.entries(data).map(([key, value]) => ({
    [key]: value,
  }));

  const PieData: ChartData[] = [
    { name: 'APOE', value: mockAnalysisData.apoe || 0, color: '#8884d8' },
    { name: 'BRCA1', value: mockAnalysisData.brca1 || 0, color: '#82ca9d' },
    { name: 'BRCA2', value: mockAnalysisData.brca2 || 0, color: '#ffc658' },
    { name: 'CYP2C19', value: mockAnalysisData.cyp2c19 || 0, color: '#ff8042' },
    {
      name: 'FACTORV',
      value: mockAnalysisData.factor_v_leiden || 0,
      color: '#0088FE',
    },
    { name: 'MTHFR', value: mockAnalysisData.mthfr || 0, color: '#0088FE' },
  ];

  const BarData: ChartData[] = [
    { name: 'APOE', value: mockAnalysisData.apoe || 0, color: '#8884d8' },
    { name: 'BRCA1', value: mockAnalysisData.brca1 || 0, color: '#82ca9d' },
    { name: 'BRCA2', value: mockAnalysisData.brca2 || 0, color: '#ffc658' },
    { name: 'CYP2C19', value: mockAnalysisData.cyp2c19 || 0, color: '#ff8042' },
    {
      name: 'FACTORV',
      value: mockAnalysisData.factor_v_leiden || 0,
      color: '#0088FE',
    },
    { name: 'MTHFR', value: mockAnalysisData.mthfr || 0, color: '#0088FE' },
  ];

  const scorecards = [
    {
      label:
        'APOE (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.apoe,
      percent: 85,
    },
    {
      label:
        'BRCA1 (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.brca1,
      percent: 70,
    },
    {
      label:
        'BRCA2 (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.brca2,
      percent: 90,
    },
    {
      label:
        'CYP2C19 (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.cyp2c19,
      percent: 90,
    },
    {
      label:
        'FACTORV (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.factor_v_leiden,
      percent: 90,
    },
    {
      label:
        'MTHFR (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.mthfr,
      percent: 90,
    },
  ];

  const trendData: TrendData[] = [
    {
      date: `APOE: ${mockAnalysisData.date}`,
      value: mockAnalysisData.apoe || 0,
      color: '#8884d8',
    },
    {
      date: `BRCA1: ${mockAnalysisData.date}`,
      value: mockAnalysisData.brca1 || 0,
      color: '#82ca9d',
    },
    {
      date: `BRCA2: ${mockAnalysisData.date}`,
      value: mockAnalysisData.brca2 || 0,
      color: '#ffc658',
    },
    {
      date: `CYP2C19: ${mockAnalysisData.date}`,
      value: mockAnalysisData.cyp2c19 || 0,
      color: '#ff8042',
    },
    {
      date: `FACTORV: ${mockAnalysisData.date}`,
      value: mockAnalysisData.factor_v_leiden || 0,
      color: '#0088FE',
    },
    {
      date: `MTHFR: ${mockAnalysisData.date}`,
      value: mockAnalysisData.mthfr || 0,
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
              Genetic Test Results
            </Title>
            <h5 style={{ color: 'black', margin: '10px' }}>
              Genetic test results are used to check for the presence of various
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
          <Card className="cholesterol-breakdown">
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
              This chart shows the breakdown of your APOE levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#82ca9d' }}>
              This chart shows the breakdown of your BRCA1 levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#ffc658' }}>
              This chart shows the breakdown of your BRCA2 levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#ff8042' }}>
              This chart shows the breakdown of your CYP2C19 levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#0088FE' }}>
              This chart shows the breakdown of your FACTORV levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#0088FE' }}>
              This chart shows the breakdown of your MTHFR levels.
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

export default GeneticAnalysis;
