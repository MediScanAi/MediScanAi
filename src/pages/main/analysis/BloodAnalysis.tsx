import { Card, Progress, Row, Col, Typography } from 'antd';
// import { LineChart } from '../../../components/charts/index';
// import {
//     ResponsiveContainer,
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     Legend,
//     BarChart,
//     XAxis,
//     YAxis,
//     Bar,
// } from 'recharts';
// import { useAppSelector } from '../../../app/hooks';
import '../../../assets/styles/analysis.css';
import { useEffect } from 'react';

// interface Scorecard {
//     label: string;
//     value: string;
//     percent: number;
// }

// interface TrendData {
//     date: string;
//     value: number;
// }

// interface ChartData {
//     name: string;
//     value: number;
//     color: string;
// }

//   interface AnalysisData {
//     scorecards: Scorecard[];
//     trendData: TrendData[];
//     pieData: ChartData[];
//     barData: ChartData[];
//   }

// const mockAnalysisData: object = {
//     scorecards: JSON.parse(localStorage.getItem('bloodTest') || '[]'),
// };

// const CustomPieChart = ({ data }: { data: ChartData[] }) => (
//     <ResponsiveContainer width={300} height={300}>
//         <PieChart>
//             <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
//                 {data.map((entry, index) => (
//                     <Cell key={index} fill={entry.color || '#8884d8'} />
//                 ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//         </PieChart>
//     </ResponsiveContainer>
// );

// const CustomBarChart = ({ data }: { data: ChartData[] }) => (
//     <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value">
//                 {data.map((entry, index) => (
//                     <Cell key={index} fill={entry.color || '#1890ff'} />
//                 ))}
//             </Bar>
//         </BarChart>
//     </ResponsiveContainer>
// );

const { Title } = Typography;

function BloodAnalysis() {
    const width = window.innerWidth;
    // const analysisData = mockAnalysisData;

    console.log(JSON.parse(localStorage.getItem('bloodTest') || '[]'));

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('bloodTest') || '[]'));
    }, []);

    return (
        <div>
            <Col
                className="first-col-design"
                style={{
                    backgroundColor: 'white',
                    margin: '0 auto',
                    marginTop: '25px',
                }}
            >
                <div className="inside-dev">
                    <Col
                        className="row-col"
                    >
                        <Title level={3} style={{ color: 'black' }}>
                            Blood Test Results
                        </Title>
                        <h5 style={{ color: 'black', margin: '10px' }}>
                            Blood test results are used to check for the presence of various substances in the blood.
                        </h5>
                    </Col>
                </div>
            </Col>

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
                    {/* <Card title="Cholesterol Breakdown" style={{ flex: 5, borderRadius: '15px', marginRight: '25px', border: 'none' }}>
                        <CustomPieChart data={analysisData.pieData} />
                    </Card>
                    <Card title="Minerals & Vitamins" style={{ flex: 4, borderRadius: '15px', marginRight: '25px', border: 'none' }}>
                        <CustomBarChart data={analysisData.barData} />
                    </Card>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                        {analysisData?.scorecards.map(
                            (item: Scorecard, index: number) => (
                                <Card
                                    key={index}
                                    style={{ textAlign: 'center', borderRadius: '15px', border: 'none' }}
                                >
                                    <Progress
                                        type="circle"
                                        percent={item.percent}
                                        format={() => `${item.value}`}
                                        strokeWidth={15}
                                    />
                                    <div style={{ marginTop: 45 }}>
                                        {item.label}
                                    </div>
                                </Card>
                            )
                        )}
                    </div> */}
                </div>
            </Row>
            <Col style={{ marginTop: 32, textAlign: 'center' }}>
                <h2
                    style={{ fontSize: 24, fontWeight: 'bold', color: '#3498db' }}
                >
                    Cholesterol Trends
                </h2>
                <p style={{ fontSize: 16, color: '#666' }}>
                    This chart shows the trend of your cholesterol levels over time.
                </p>
                {/* <LineChart data={analysisData.trendData} /> */}
            </Col>
        </div>
    );
}

export default BloodAnalysis;