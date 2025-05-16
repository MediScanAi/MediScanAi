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
  value: string | null;
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

const convertGeneticValue = (field: string, value: string | null): number => {
  if (!value) return 0;

  switch (field) {
    case 'brca1':
    case 'brca2':
    case 'factor_v_leiden':
      return value === 'positive' ? 1 : 0;

    case 'apoe':
      return {
        'ε2/ε2': 1,
        'ε3/ε3': 2,
        'ε3/ε4': 3,
        'ε4/ε4': 4,
      }[value] || 0;

    case 'mthfr':
      return {
        'Normal': 1,
        'Heterozygous': 2,
        'Homozygous': 3,
      }[value] || 0;

    case 'cyp2c19':
      return {
        'Category I': 1,
        'Category II': 2,
        'Category III': 3,
      }[value] || 0;

    default:
      return 0;
  }
};

function GeneticAnalysis() {
  const mockAnalysisData: GeneticTestFormValues = JSON.parse(
    localStorage.getItem('geneticTestData') || '{}'
  );

  if (!mockAnalysisData) {
    return <div>No data found</div>;
  }

  const PieData: ChartData[] = [
    { name: 'APOE', value: convertGeneticValue('apoe', mockAnalysisData.apoe?.toString() || null), color: '#8884d8' },
    { name: 'BRCA1', value: convertGeneticValue('brca1', mockAnalysisData.brca1?.toString() || null), color: '#82ca9d' },
    { name: 'BRCA2', value: convertGeneticValue('brca2', mockAnalysisData.brca2?.toString() || null), color: '#ffc658' },
    { name: 'CYP2C19', value: convertGeneticValue('cyp2c19', mockAnalysisData.cyp2c19?.toString() || null), color: '#ff8042' },
    { name: 'FACTORV', value: convertGeneticValue('factor_v_leiden', mockAnalysisData.factor_v_leiden?.toString() || null), color: '#0088FE' },
    { name: 'MTHFR', value: convertGeneticValue('mthfr', mockAnalysisData.mthfr?.toString() || null), color: '#00C49F' },
  ];

  const BarData = [...PieData]; 

  const scorecards: Scorecard[] = [
    {
      label: `APOE: ${mockAnalysisData.apoe}`,
      value: mockAnalysisData.apoe?.toString() || null,
      percent: convertGeneticValue('apoe', mockAnalysisData.apoe?.toString() || null) * 25,
    },
    {
      label: `BRCA1: ${mockAnalysisData.brca1}`,
      value: mockAnalysisData.brca1?.toString() || null,
      percent: convertGeneticValue('brca1', mockAnalysisData.brca1?.toString() || null) * 100,
    },
    {
      label: `BRCA2: ${mockAnalysisData.brca2}`,
      value: mockAnalysisData.brca2?.toString() || null,
      percent: convertGeneticValue('brca2', mockAnalysisData.brca2?.toString() || null) * 100,
    },
    {
      label: `CYP2C19: ${mockAnalysisData.cyp2c19}`,
      value: mockAnalysisData.cyp2c19?.toString() || null,
      percent: convertGeneticValue('cyp2c19', mockAnalysisData.cyp2c19?.toString() || null) * 33.33,
    },
    {
      label: `FACTOR V Leiden: ${mockAnalysisData.factor_v_leiden}`,
      value: mockAnalysisData.factor_v_leiden?.toString() || null,
      percent: convertGeneticValue('factor_v_leiden', mockAnalysisData.factor_v_leiden?.toString() || null) * 100,
    },
    {
      label: `MTHFR: ${mockAnalysisData.mthfr}`,
      value: mockAnalysisData.mthfr?.toString() || null,
      percent: convertGeneticValue('mthfr', mockAnalysisData.mthfr?.toString() || null) * 33.33,
    },
  ];

  const trendData: TrendData[] = [
    {
      date: `APOE: ${mockAnalysisData.date}`,
      value: convertGeneticValue('apoe', mockAnalysisData.apoe?.toString() || null),
      color: '#8884d8',
    },
    {
      date: `BRCA1: ${mockAnalysisData.date}`,
      value: convertGeneticValue('brca1', mockAnalysisData.brca1?.toString() || null),
      color: '#82ca9d',
    },
    {
      date: `BRCA2: ${mockAnalysisData.date}`,
      value: convertGeneticValue('brca2', mockAnalysisData.brca2?.toString() || null),
      color: '#ffc658',
    },
    {
      date: `CYP2C19: ${mockAnalysisData.date}`,
      value: convertGeneticValue('cyp2c19', mockAnalysisData.cyp2c19?.toString() || null),
      color: '#ff8042',
    },
    {
      date: `FACTORV: ${mockAnalysisData.date}`,
      value: convertGeneticValue('factor_v_leiden', mockAnalysisData.factor_v_leiden?.toString() || null),
      color: '#0088FE',
    },
    {
      date: `MTHFR: ${mockAnalysisData.date}`,
      value: convertGeneticValue('mthfr', mockAnalysisData.mthfr?.toString() || null),
      color: '#00C49F',
    },
  ];

  return (
    <div>
      <Col style={{ backgroundColor: 'white', margin: '0 auto', marginTop: '60px' }}>
        <div className="inside-dev">
          <Col className="row-col">
            <Title level={3} style={{ color: 'black' }}>Genetic Test Results</Title>
            <h5 style={{ color: 'black', margin: '10px' }}>
              Genetic test results show categorical gene risk factors.
            </h5>
          </Col>
        </div>
      </Col>

      <Card style={{ flex: 4, borderRadius: '15px', marginRight: '25px', border: 'none', width: '90%', margin: '0 auto' }}>
        <CustomBarChart data={BarData} />
      </Card>

      <Row style={{ marginTop: '80px', margin: '0 auto', display: 'flex' }}>
        <div style={{ display: 'flex', gap: 32, margin: '0 auto', width: '96.5%', justifyContent: 'center' }}>
          <Card className="cholesterol-breakdown">
            <CustomPieChart data={PieData} />
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
            {PieData.map(item => (
              <h3 key={item.name} style={{ fontSize: 16, color: item.color }}>
                {`This chart shows the breakdown of your ${item.name} levels.`}
              </h3>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '0 auto', flexWrap: 'wrap' }}>
          {scorecards.map((item: Scorecard, idx) => (
            <Card key={idx} style={{ textAlign: 'center', borderRadius: '15px', border: 'none' }}>
              <Progress
                type="circle"
                percent={Math.min(item.percent, 100)}
                format={() => item.value || 'N/A'}
                strokeWidth={15}
              />
              <div style={{ marginTop: 45 }}>{item.label}</div>
            </Card>
          ))}
        </div>
      </Row>

      <Col style={{ marginTop: 32, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#3498db' }}>
          Genetic Marker Trends
        </h2>
        <p style={{ fontSize: 16, color: '#666' }}>
          This chart shows gene trends based on latest test results.
        </p>
        <LineChart data={trendData} />
      </Col>
    </div>
  );
}

export default GeneticAnalysis;
