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
import type { VitaminTestFormValues } from '../../../app/slices/vitaminTestSlice';

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

function VitaminAnalysis() {
  const mockAnalysisData: VitaminTestFormValues = JSON.parse(
    localStorage.getItem('vitaminTestData') || '{}'
  );

  if (!mockAnalysisData) {
    return <div>No data found</div>;
  }

  const PieData: ChartData[] = [
    {
      name: 'Vitamin A',
      value: mockAnalysisData.vitaminA || 0,
      color: '#8884d8',
    },
    {
      name: 'Vitamin B12',
      value: mockAnalysisData.vitaminB12 || 0,
      color: '#82ca9d',
    },
    {
      name: 'Vitamin C',
      value: mockAnalysisData.vitaminC || 0,
      color: '#ffc658',
    },
    {
      name: 'Vitamin D',
      value: mockAnalysisData.vitaminD || 0,
      color: '#ff8042',
    },
    {
      name: 'Vitamin E',
      value: mockAnalysisData.vitaminE || 0,
      color: '#0088FE',
    },
    {
      name: 'Vitamin K',
      value: mockAnalysisData.vitaminK || 0,
      color: '#0088FE',
    },
  ];

  const BarData: ChartData[] = [
    {
      name: 'Vitamin A',
      value: mockAnalysisData.vitaminA || 0,
      color: '#8884d8',
    },
    {
      name: 'Vitamin B12',
      value: mockAnalysisData.vitaminB12 || 0,
      color: '#82ca9d',
    },
    {
      name: 'Vitamin C',
      value: mockAnalysisData.vitaminC || 0,
      color: '#ffc658',
    },
    {
      name: 'Vitamin C',
      value: mockAnalysisData.vitaminC || 0,
      color: '#ff8042',
    },
    {
      name: 'Vitamin D',
      value: mockAnalysisData.vitaminD || 0,
      color: '#0088FE',
    },
    {
      name: 'Vitamin E',
      value: mockAnalysisData.vitaminE || 0,
      color: '#0088FE',
    },
  ];

  const scorecards = [
    {
      label:
        'Vitamin A (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.vitaminA,
      percent: 85,
    },
    {
      label:
        'Vitamin B12 (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.vitaminB12,
      percent: 70,
    },
    {
      label:
        'Vitamin C (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.vitaminC,
      percent: 90,
    },
    {
      label:
        'Vitamin D (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.vitaminD,
      percent: 90,
    },
    {
      label:
        'Vitamin E (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.vitaminE,
      percent: 90,
    },
    {
      label:
        'Vitamin K (mg/dL) - Normal range: 0.01-0.05 (men), 0.01-0.05 (women), 0.01-0.05 (children), and 0.01-0.05 (pregnant women)',
      value: mockAnalysisData.vitaminK,
      percent: 90,
    },
  ];

  const trendData: TrendData[] = [
    {
      date: `Vitamin A: ${mockAnalysisData.date}`,
      value: mockAnalysisData.vitaminA || 0,
      color: '#8884d8',
    },
    {
      date: `Vitamin B: ${mockAnalysisData.date}`,
      value: mockAnalysisData.vitaminB12 || 0,
      color: '#82ca9d',
    },
    {
      date: `Vitamin C: ${mockAnalysisData.date}`,
      value: mockAnalysisData.vitaminC || 0,
      color: '#ffc658',
    },
    {
      date: `Vitamin D: ${mockAnalysisData.date}`,
      value: mockAnalysisData.vitaminD || 0,
      color: '#ff8042',
    },
    {
      date: `Vitamin E: ${mockAnalysisData.date}`,
      value: mockAnalysisData.vitaminE || 0,
      color: '#0088FE',
    },
    {
      date: `Vitamin K: ${mockAnalysisData.date}`,
      value: mockAnalysisData.vitaminK || 0,
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
              Vitamin Test Results
            </Title>
            <h5 style={{ color: 'black', margin: '10px' }}>
              Vitamin test results are used to check for the presence of various
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
              This chart shows the breakdown of your vitamin A levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#82ca9d' }}>
              This chart shows the breakdown of your vitamin B12 levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#ffc658' }}>
              This chart shows the breakdown of your vitamin C levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#ff8042' }}>
              This chart shows the breakdown of your vitamin D levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#0088FE' }}>
              This chart shows the breakdown of your vitamin E levels.
            </h3>
            <h3 style={{ fontSize: 16, color: '#0088FE' }}>
              This chart shows the breakdown of your vitamin K levels.
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

export default VitaminAnalysis;
