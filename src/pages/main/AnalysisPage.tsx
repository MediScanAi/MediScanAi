import { useState } from 'react';
import { Card, Spin, message, Progress, Row, Col } from 'antd';
import { LineChart } from '../../components/charts/index';
import axios from 'axios';
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
import Title from 'antd/es/typography/Title';
import dataUpload from '../../assets/photos/dataUpload.jpg';

interface Scorecard {
  label: string;
  value: string;
  percent: number;
}

interface TrendData {
  date: string;
  value: number;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface AnalysisData {
  scorecards: Scorecard[];
  trendData: TrendData[];
  pieData: ChartData[];
  barData: ChartData[];
}

const mockAnalysisData: AnalysisData = {
  scorecards: [
    {
      label:
        "Hemoglobin (g/dL) Hemoglobin is the amount of hemoglobin in your blood. It is a protein that carries oxygen from your lungs to your body's tissues.",
      value: '13.5',
      percent: 75,
    },
    {
      label:
        'Vitamin D (ng/mL) Vitamin D is a fat-soluble vitamin that plays a crucial role in bone health.',
      value: '22',
      percent: 55,
    },
    {
      label:
        'Cholesterol (mg/dL) Cholesterol is a waxy substance found in your blood. It helps your body make hormones and keep your cells healthy.',
      value: '190',
      percent: 60,
    },
  ],
  trendData: [
    { date: '2024-01-01', value: 12 },
    { date: '2025-02-01', value: 16 },
    { date: '2024-03-01', value: 14 },
    { date: '2024-08-01', value: 19 },
  ],
  pieData: [
    { name: 'HDL (Good)', value: 45, color: '#52c41a' },
    { name: 'LDL (Bad)', value: 55, color: '#f5222d' },
  ],
  barData: [
    { name: 'Iron', value: 80, color: '#1890ff' },
    { name: 'Calcium', value: 60, color: '#722ed1' },
    { name: 'Zinc', value: 50, color: '#fa8c16' },
  ],
};

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

const AnalysisPage = () => {
  const [loading, setLoading] = useState(false);
  const useMockData = true;
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(
    useMockData ? mockAnalysisData : null
  );

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post<AnalysisData>('/api/analyze', formData);
      setAnalysisData(response.data);
    } catch (error) {
      message.error('Analysis failed.');
    } finally {
      setLoading(false);
    }

    return false;
  };

  return (
    <div style={{ padding: 24 }}>
      {loading ? (
        <Spin style={{ margin: '45vh 50vh', display: 'block' }} size="large" />
      ) : (
        <div>
          {analysisData && (
            <div>
              <Row
                style={{
                  width: '96.5%',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundImage: `url(${dataUpload})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '220px',
                  borderRadius: '15px',
                  margin: '0 auto',
                  marginBottom: '25px',
                }}
              >
                <Col
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Title
                    style={{
                      color: 'black',
                      marginBottom: 16,
                      fontWeight: 500,
                    }}
                  >
                    <b>Your Personal Analysis</b>
                  </Title>
                </Col>
              </Row>
              {analysisData && (
                <Row
                  style={{ marginTop: 24, margin: '0 auto', display: 'flex' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 32,
                      margin: '0 auto',
                      width: '96.5%',
                    }}
                  >
                    <Card title="Cholesterol Breakdown" style={{ flex: 1 }}>
                      <CustomPieChart data={analysisData.pieData} />
                    </Card>

                    <Card title="Minerals & Vitamins" style={{ flex: 2 }}>
                      <CustomBarChart data={analysisData.barData} />
                    </Card>

                    <div style={{ display: 'flex', gap: 16 }}>
                      {analysisData?.scorecards.map(
                        (item: Scorecard, index: number) => (
                          <Card
                            key={index}
                            style={{ textAlign: 'center', width: 160 }}
                          >
                            <Progress
                              type="circle"
                              percent={item.percent}
                              format={() => `${item.value}`}
                            />
                            <div style={{ marginTop: 12, fontWeight: 'bold' }}>
                              {item.label}
                            </div>
                          </Card>
                        )
                      )}
                    </div>
                  </div>
                </Row>
              )}
              <Col style={{ marginTop: 32, textAlign: 'center' }}>
                <h2
                  style={{ fontSize: 24, fontWeight: 'bold', color: '#3498db' }}
                >
                  Cholesterol Trends
                </h2>
                <p style={{ fontSize: 16, color: '#666' }}>
                  This chart shows the trend of your cholesterol levels over
                  time.
                </p>
                <LineChart data={analysisData.trendData} />
              </Col>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
