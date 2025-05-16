import { Card, Row, Col, Typography } from 'antd';
import { LineChart } from '../../../components/charts/index';
import {
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar
} from 'recharts';
import '../../../assets/styles/analysis.css';

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

interface UrineTestResult {
  bilirubin: string;
  blood: string;
  date: string;
  glucose: number;
  ketones: number;
  leukocyteEsterase: string;
  nitrites: string;
  ph: number;
  protein: number;
  specificGravity: number;
  urobilinogen: number;
}

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

const CustomHorizontalBarChart = ({ data }: { data: ChartData[] }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={data}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
    >
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color || '#8884d8'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const { Title } = Typography;

function UrineAnalysis() {
  const testData: UrineTestResult = {
    bilirubin: 'positive',
    blood: 'negative',
    date: '05/16/2025, 12:01 AM',
    glucose: 0,
    ketones: 30,
    leukocyteEsterase: 'negative',
    nitrites: 'negative',
    ph: 4.5,
    protein: 20,
    specificGravity: 1.005,
    urobilinogen: 0.1,
  };

  if (!testData) {
    return <div>No data found</div>;
  }

  const qualitativeToNumber = (value: string) => {
    switch (value.toLowerCase()) {
      case 'positive':
        return 100;
      case 'negative':
        return 0;
      default:
        return 50;
    }
  };

  const BarData: ChartData[] = [
    { name: 'Glucose', value: testData.glucose, color: '#8884d8' },
    { name: 'Ketones', value: testData.ketones, color: '#82ca9d' },
    { name: 'Protein', value: testData.protein, color: '#ffc658' },
    {
      name: 'Urobilinogen',
      value: testData.urobilinogen * 100,
      color: '#ff8042',
    },
  ];

  const RadarData: ChartData[] = [
    {
      name: 'Bilirubin',
      value: qualitativeToNumber(testData.bilirubin),
      color: '#0088FE',
    },
    {
      name: 'Blood',
      value: qualitativeToNumber(testData.blood),
      color: '#00C49F',
    },
    { name: 'Glucose', value: testData.glucose, color: '#FFBB28' },
    { name: 'Ketones', value: testData.ketones, color: '#FF8042' },
    {
      name: 'Leukocytes',
      value: qualitativeToNumber(testData.leukocyteEsterase),
      color: '#8884d8',
    },
    { name: 'Protein', value: testData.protein, color: '#82ca9d' },
  ];

  const trendData: TrendData[] = [
    {
      date: 'Glucose',
      value: testData.glucose,
      color: '#8884d8',
    },
    {
      date: 'Ketones',
      value: testData.ketones,
      color: '#82ca9d',
    },
    {
      date: 'Protein',
      value: testData.protein,
      color: '#ffc658',
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
              Urine Test Results
            </Title>
            <h5 style={{ color: 'black', margin: '10px' }}>
              Urinalysis results showing key markers of kidney function and
              overall health.
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
        <CustomHorizontalBarChart data={RadarData} />
      </Card>

      <Row style={{ marginTop: 32, width: '90%', margin: '0 auto' }}>
        <Card
          style={{
            borderRadius: '15px',
            border: 'none',
            width: '100%',
          }}
        >
          <CustomBarChart data={BarData} />
        </Card>
      </Row>

      <Col style={{ marginTop: 32, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#3498db' }}>
          Urine Test Trends
        </h2>
        <p style={{ fontSize: 16, color: '#666' }}>
          This chart shows the trend of your urine markers over time.
        </p>
        <LineChart data={trendData} />
      </Col>
    </div>
  );
}

export default UrineAnalysis;
