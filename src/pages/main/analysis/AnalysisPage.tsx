import { useEffect, useState } from 'react';
import { Card, Progress, Row, Col } from 'antd';
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
import Title from 'antd/es/typography/Title';
import geneticBackground from '../../../assets/photos/geneticBackground.webp';
import bloodBackground from '../../../assets/photos/bloodBackground.webp';
import vitaminBackground from '../../../assets/photos/vitaminBackground.webp';
import urineBackground from '../../../assets/photos/urineBackground.webp';
import '../../../assets/styles/analysis.css';
import { useNavigate } from 'react-router-dom';

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
        'Hemoglobin (g/dL) - Normal range: 13.8-17.2 (men), 12.1-15.1 (women), 14.5-18.5 (children), and 14.5-16.5 (pregnant women)',
      value: '14.2',
      percent: 85,
    },
    {
      label:
        'Vitamin D (ng/mL) - Normal range: 30-100 (optimal), 10-30 (deficient), and <10 (severe deficiency), and 10-15 (insufficient)',
      value: '42',
      percent: 70,
    },
    {
      label:
        'Total Cholesterol (mg/dL) - Normal range: <200 (optimal), 200-239 (borderline high), and >240 (high), and 240-259 (very high), and >260 (extremely high)',
      value: '180',
      percent: 90,
    },
  ],
  trendData: [
    { date: '2024-01-01', value: 170 },
    { date: '2024-04-01', value: 175 },
    { date: '2024-07-01', value: 168 },
    { date: '2024-10-01', value: 172 },
  ],
  pieData: [
    { name: 'HDL (Good)', value: 65, color: '#52c41a' },
    { name: 'LDL (Bad)', value: 35, color: '#f5222d' },
  ],
  barData: [
    { name: 'Iron', value: 85, color: '#1890ff' },
    { name: 'Calcium', value: 78, color: '#722ed1' },
    { name: 'Zinc', value: 82, color: '#fa8c16' },
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
  const [width, setWidth] = useState(window.innerWidth);
  const analysisData = mockAnalysisData;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24, position: 'relative' }}>
      <div>
        {analysisData && (
          <div>
            <div
              style={{
                width: '96.5%',
                display: 'flex',
                margin: '0 auto',
              }}
            >
              <Col
                className="first-col-design"
                style={{
                  backgroundImage: `url(${bloodBackground})`,
                  marginBottom: '25px',
                  marginRight: '25px',
                }}
                onClick={() => {
                  navigate('/analysis/blood-test');
                }}
              >
                <div className="inside-dev">
                  <Col className="row-col">
                    <Title level={3} style={{ color: 'black' }}>
                      Blood Test Results
                    </Title>
                    <h5 style={{ color: 'black', margin: '10px' }}>
                      Blood test results are used to check for the presence of
                      various substances in the blood.
                    </h5>
                  </Col>
                </div>
              </Col>

              <Col
                className="first-col-design"
                style={{
                  backgroundImage: `url(${vitaminBackground})`,
                  marginBottom: '25px',
                }}
                onClick={() => {
                  navigate('/analysis/vitamin-test');
                }}
              >
                <div className="inside-dev">
                  <Col className="row-col">
                    <Title level={3} style={{ color: 'black' }}>
                      Vitamin Test Results
                    </Title>
                    <h5 style={{ color: 'black', margin: '10px' }}>
                      Vitamins and minerals are essential for your body to
                      function properly.
                    </h5>
                  </Col>
                </div>
              </Col>
            </div>

            <div
              style={{
                width: '96.5%',
                display: 'flex',
                margin: '0 auto',
              }}
            >
              <Col
                className="first-col-design"
                style={{
                  backgroundImage: `url(${urineBackground})`,
                  marginBottom: '25px',
                  marginRight: '25px',
                }}
                onClick={() => {
                  navigate('/analysis/urine-test');
                }}
              >
                <div className="inside-dev">
                  <Col className="row-col">
                    <Title level={3} style={{ color: 'black' }}>
                      Urine Test Results
                    </Title>
                    <h5 style={{ color: 'black', margin: '10px' }}>
                      Urine test results are used to check for the presence of
                      various substances in the urine.
                    </h5>
                  </Col>
                </div>
              </Col>

              <Col
                className="first-col-design"
                style={{
                  backgroundImage: `url(${geneticBackground})`,
                  marginBottom: '25px',
                }}
                onClick={() => {
                  navigate('/analysis/genetic-test');
                }}
              >
                <div className="inside-dev">
                  <Col className="row-col">
                    <Title level={3} style={{ color: 'black' }}>
                      Genetic Test Results
                    </Title>
                    <h5 style={{ color: 'black', margin: '10px' }}>
                      Genetic test results are used to check for the presence of
                      various substances in the blood.
                    </h5>
                  </Col>
                </div>
              </Col>
            </div>

            <div
              style={{
                position: 'relative',
              }}
            >
              <div className="default-analysis">
                <h2
                  style={{
                    margin: '10px',
                    color: '#3498db',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  Health Analysis Summary
                </h2>
                <p
                  style={{ marginTop: '8px', color: '#666', fontSize: '16px' }}
                >
                  This summary includes the normal data and progress indicators.
                </p>
              </div>

              <div>
                <Row
                  style={{ marginTop: 24, margin: '0 auto', display: 'flex' }}
                >
                  <div
                    style={{
                      display: width < 1100 ? 'grid' : 'flex',
                      gap: 32,
                      margin: '0 auto',
                      width: '96.5%',
                      marginTop: '150px',
                    }}
                  >
                    <Card
                      title="Cholesterol Breakdown"
                      style={{
                        flex: 5,
                        borderRadius: '15px',
                        marginRight: '25px',
                        border: 'none',
                      }}
                    >
                      <CustomPieChart data={analysisData.pieData} />
                    </Card>
                    <Card
                      title="Minerals & Vitamins"
                      style={{
                        flex: 4,
                        borderRadius: '15px',
                        marginRight: '25px',
                        border: 'none',
                      }}
                    >
                      <CustomBarChart data={analysisData.barData} />
                    </Card>
                    <div
                      style={{
                        display: 'flex',
                        gap: 16,
                        justifyContent: 'center',
                      }}
                    >
                      {analysisData?.scorecards.map(
                        (item: Scorecard, index: number) => (
                          <Card
                            key={index}
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
                        )
                      )}
                    </div>
                  </div>
                </Row>
                <Col style={{ marginTop: 32, textAlign: 'center' }}>
                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#3498db',
                    }}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
