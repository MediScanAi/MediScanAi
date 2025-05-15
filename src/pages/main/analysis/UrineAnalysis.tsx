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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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

interface Scorecard {
  label: string;
  value: string | number;
  percent: number;
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

const CustomRadarChart = ({ data }: { data: ChartData[] }) => (
  <ResponsiveContainer width="100%" height={400}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis />
      <Radar
        name="Urine Test"
        dataKey="value"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Tooltip />
      <Legend />
    </RadarChart>
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
    }, // scaled for visibility
  ];

  const PieData: ChartData[] = [
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
    {
      name: 'Leukocytes',
      value: qualitativeToNumber(testData.leukocyteEsterase),
      color: '#FFBB28',
    },
    {
      name: 'Nitrites',
      value: qualitativeToNumber(testData.nitrites),
      color: '#FF8042',
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

  const scorecards = [
    {
      label: 'Bilirubin - Normal: Negative',
      value: testData.bilirubin,
      percent: testData.bilirubin === 'positive' ? 100 : 0,
      color: testData.bilirubin === 'positive' ? '#ff4d4f' : '#52c41a',
    },
    {
      label: 'Blood - Normal: Negative',
      value: testData.blood,
      percent: testData.blood === 'positive' ? 100 : 0,
      color: testData.blood === 'positive' ? '#ff4d4f' : '#52c41a',
    },
    {
      label: 'Glucose (mg/dL) - Normal: 0-15',
      value: testData.glucose,
      percent: Math.min(100, (testData.glucose / 15) * 100),
      color: testData.glucose > 15 ? '#ff4d4f' : '#52c41a',
    },
    {
      label: 'Ketones (mg/dL) - Normal: 0-5',
      value: testData.ketones,
      percent: Math.min(100, (testData.ketones / 5) * 100),
      color: testData.ketones > 5 ? '#ff4d4f' : '#52c41a',
    },
    {
      label: 'pH - Normal: 4.5-8',
      value: testData.ph,
      percent: ((testData.ph - 4.5) / (8 - 4.5)) * 100,
      color: testData.ph < 4.5 || testData.ph > 8 ? '#ff4d4f' : '#52c41a',
    },
    {
      label: 'Protein (mg/dL) - Normal: 0-20',
      value: testData.protein,
      percent: Math.min(100, (testData.protein / 20) * 100),
      color: testData.protein > 20 ? '#ff4d4f' : '#52c41a',
    },
  ];

  const trendData: TrendData[] = [
    {
      date: testData.date,
      value: testData.glucose,
      color: '#8884d8',
    },
    {
      date: testData.date,
      value: testData.ketones,
      color: '#82ca9d',
    },
    {
      date: testData.date,
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
        <CustomRadarChart data={RadarData} />
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
          <Card className="urine-breakdown">
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
            <h3 style={{ fontSize: 16, color: '#0088FE' }}>
              Bilirubin:{' '}
              {testData.bilirubin === 'positive' ? 'Abnormal' : 'Normal'}
            </h3>
            <h3 style={{ fontSize: 16, color: '#00C49F' }}>
              Blood: {testData.blood === 'positive' ? 'Abnormal' : 'Normal'}
            </h3>
            <h3 style={{ fontSize: 16, color: '#FFBB28' }}>
              Leukocytes:{' '}
              {testData.leukocyteEsterase === 'positive'
                ? 'Abnormal'
                : 'Normal'}
            </h3>
            <h3 style={{ fontSize: 16, color: '#FF8042' }}>
              Nitrites:{' '}
              {testData.nitrites === 'positive' ? 'Abnormal' : 'Normal'}
            </h3>
            <h3 style={{ fontSize: 16, color: '#8884d8' }}>
              pH: {testData.ph} (
              {testData.ph < 4.5
                ? 'Too acidic'
                : testData.ph > 8
                  ? 'Too alkaline'
                  : 'Normal'}
              )
            </h3>
            <h3 style={{ fontSize: 16, color: '#82ca9d' }}>
              Specific Gravity: {testData.specificGravity} (Normal: 1.005-1.030)
            </h3>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {scorecards.map((item: Scorecard, index: number) => (
            <Card
              key={index}
              style={{
                textAlign: 'center',
                borderRadius: '15px',
                border: 'none',
                width: '200px',
              }}
            >
              <Progress
                type="circle"
                percent={item.percent}
                format={() => `${item.value}`}
                strokeWidth={15}
                strokeColor={item.color}
              />
              <div style={{ marginTop: 15 }}>{item.label}</div>
            </Card>
          ))}
        </div>
      </Row>

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
