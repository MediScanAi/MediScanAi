import { Card, Row, Col, Typography, Progress } from 'antd';
import {
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';
import '../../../assets/styles/analysis.css';
import Done from '../../../assets/photos/Done.webp';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Chocolate from '../../../assets/photos/Chocolate.webp';
import PH from '../../../assets/photos/PH.webp';
import Nitrites from '../../../assets/photos/Nitrite.webp';
import Protein from '../../../assets/photos/Protein.webp';
import Ketones from '../../../assets/photos/Ketones.webp';
import Bilirubin from '../../../assets/photos/Bilirubin.webp';
import BloodMultic from '../../../assets/photos/BloodMultic.png';
import Urobilinogen from '../../../assets/photos/Urobilinogen.webp';
import Urine from '../../../assets/photos/Urine.webp';
import LeukocyteEsterase from '../../../assets/photos/LeukocyteEsterase.webp';
import { useEffect } from 'react';
import { useState } from 'react';
import type { UrineTestFormValues } from '../../../app/slices/testSlice';
import { useAppSelector } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';

interface ChartData {
  name: string;
  value: number | string;
  color: string;
  image: string;
}

interface Scorecard {
  label: string;
  value: string | number | null | undefined;
  percent: number;
}

interface CustomTooltipProps {
  active: boolean;
  payload: Array<{ color: string; name: string; value: string }>;
}

interface LegendPayload {
  color: string;
  value: string;
}


const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
        <div
            style={{ background: '#fff', padding: 10, border: '1px solid #ccc' }}
        >
          <p style={{ margin: 0, color: item.color }}>{item.name}</p>
          <p style={{ margin: 0 }}>
            <b>Value:</b> {item.value}
          </p>
        </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: { payload: LegendPayload[] }) => (
    <ul style={{ display: 'flex', gap: 20, listStyle: 'none', paddingLeft: 0 }}>
      {payload.map((entry, index: number) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            ● {entry.value}
          </li>
      ))}
    </ul>
);

const CustomBarChart = ({ data }: { data: ChartData[] }) => (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00c6ff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0072ff" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
        <Legend content={<CustomLegend payload={[]} />} />
        <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="url(#barGradient)">
          {data.map((entry, index) => (
              <Cell key={index} fill={entry.color || 'url(#barGradient)'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
);

const { Title } = Typography;

function UrineAnalysis() {
  const { t } = useTranslation(['urineAnalysis']);
  const urineTestData = useAppSelector((state) => state.tests.urine);
  const [width, setWidth] = useState(window.innerWidth);
  const [expandedWarnings, setExpandedWarnings] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleWarning = (warning: string) => {
    setExpandedWarnings((prev) => ({
      ...prev,
      [warning]: !prev[warning],
    }));
  };

  const navigate = useNavigate();

  const BarData: ChartData[] = [
    {
      name: t('urineAnalysis.parameters.bilirubin'),
      value: urineTestData?.bilirubin || 0,
      color: '#f39c12',
      image: Bilirubin,
    },
    {
      name: t('urineAnalysis.parameters.blood'),
      value: urineTestData?.blood || 0,
      color: '#16a085',
      image: BloodMultic,
    },
    {
      name: t('urineAnalysis.parameters.nitrites'),
      value: urineTestData?.nitrites || 0,
      color: '#e74c3c',
      image: Nitrites,
    },
    {
      name: t('urineAnalysis.parameters.leukocyteEsterase'),
      value: urineTestData?.leukocyteEsterase || 0,
      color: '#8e44ad',
      image: LeukocyteEsterase,
    },
    {
      name: t('urineAnalysis.parameters.glucose'),
      value: urineTestData?.glucose || 0,
      color: '#2980b9',
      image: Chocolate,
    },
    {
      name: t('urineAnalysis.parameters.ketones'),
      value: urineTestData?.ketones || 0,
      color: '#27ae60',
      image: Ketones,
    },
    {
      name: t('urineAnalysis.parameters.ph'),
      value: urineTestData?.ph || 0,
      color: '#27ae60',
      image: PH,
    },
    {
      name: t('urineAnalysis.parameters.protein'),
      value: urineTestData?.protein || 0,
      color: '#27ae60',
      image: Protein,
    },
    {
      name: t('urineAnalysis.parameters.specificGravity'),
      value: urineTestData?.specificGravity || 0,
      color: '#27ae60',
      image: Done,
    },
    {
      name: t('urineAnalysis.parameters.urobilinogen'),
      value: urineTestData?.urobilinogen || 0,
      color: '#27ae60',
      image: Urobilinogen,
    },
  ];

  const scorecards = [
    {
      label: t('urineAnalysis.parameters.bilirubin'),
      value: urineTestData?.bilirubin,
      percent:
          urineTestData?.bilirubin === 'positive'
              ? 100
              : urineTestData?.bilirubin === 'negative'
                  ? 0
                  : 52,
    },
    {
      label: t('urineAnalysis.parameters.blood'),
      value: urineTestData?.blood,
      percent:
          urineTestData?.blood === 'positive'
              ? 100
              : urineTestData?.blood === 'negative'
                  ? 0
                  : 52,
    },
    {
      label: t('urineAnalysis.parameters.nitrites'),
      value: urineTestData?.nitrites,
      percent:
          urineTestData?.nitrites === 'positive'
              ? 100
              : urineTestData?.nitrites === 'negative'
                  ? 0
                  : 52,
    },
    {
      label: t('urineAnalysis.parameters.leukocyteEsterase'),
      value: urineTestData?.leukocyteEsterase,
      percent:
          urineTestData?.leukocyteEsterase === 'positive'
              ? 100
              : urineTestData?.leukocyteEsterase === 'negative'
                  ? 0
                  : 52,
    },
  ];

  const getUrineDiseaseRisks = (data: UrineTestFormValues | null) => {
    if (!data) return [];

    const risks: string[] = [];
    const conditions =  t('urineAnalysis.warnings.conditions',{returnObjects:true});
    const explanations = t('urineAnalysis.warnings.explanations', { returnObjects: true });
    console.log(conditions.bilirubin)
    if (data.bilirubin !== undefined && Number(data.bilirubin) > 0) {
      risks.push(conditions.bilirubin);
    }
    if (data.blood !== undefined && Number(data.blood) > 0) {
      risks.push(conditions.blood);
    }
    if (data.nitrites !== undefined && Number(data.nitrites) > 0) {
      risks.push(conditions.nitrites);
    }
    if (data.leukocyteEsterase !== undefined && Number(data.leukocyteEsterase) > 0) {
      risks.push(conditions.leukocyteEsterase);
    }
    if (data.glucose !== undefined && Number(data.glucose) > 0) {
      risks.push(conditions.glucose);
    }
    if (data.ketones !== undefined && Number(data.ketones) > 0) {
      risks.push(conditions.ketones);
    }
    if (data.ph !== undefined && (Number(data.ph) < 4.5 || Number(data.ph) > 8)) {
      risks.push(conditions.ph);
    }
    if (data.protein !== undefined && Number(data.protein) > 0) {
      risks.push(conditions.protein);
    }
    if (data.specificGravity !== undefined &&
        (Number(data.specificGravity) < 1.005 || Number(data.specificGravity) > 1.03)) {
      risks.push(conditions.specificGravity);
    }
    if (data.urobilinogen !== undefined && Number(data.urobilinogen) > 1.0) {
      risks.push(conditions.urobilinogen);
    }
    return risks;
  };

  const interestingFacts = t('urineAnalysis.interestingFacts', { 
    returnObjects: true 
  }) as Record<string, string[]>;
  const urineWarnings = urineTestData
      ? getUrineDiseaseRisks(urineTestData as UrineTestFormValues)
      : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
      <div>
        <Row
            className="welcome-section"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -45,
            }}
        >
          <Col className="welcome-section-column">
            <Typography
                className="welcome-text"
                style={{
                  fontSize: width > 768 ? '30px' : '20px',
                  marginTop: 50,
                  marginLeft: 5,
                }}
            >
              {t('urineAnalysis.title')}
            </Typography>
            <Typography
                className="platform-title"
                style={{ fontSize: width > 768 ? '50px' : '30px' }}
            >
              {t('urineAnalysis.subtitle')}
            </Typography>
          </Col>
          <Col>
            <img
                src={Urine}
                alt="platform"
                style={{
                  marginBottom: -50,
                  width: width > 768 ? '300px' : '80px',
                  height: width > 768 ? '300px' : '80px',
                  objectFit: 'cover',
                  borderRadius: 15,
                }}
            />
          </Col>
        </Row>

        <div>
          {urineTestData ? (
              <div>
                <Card className="card2-design" style={{ border: 'none' }}>
                  <Col className="card2-col-design">
                    <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          marginBottom: '20px',
                        }}
                    ></div>
                  </Col>
                  <Col
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                  >
                    <CustomBarChart data={BarData.slice(4)} />
                  </Col>
                  <Col
                      style={{
                        display: 'flex',
                        flexDirection: width > 768 ? 'row' : 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                  >
                    {scorecards.map((item: Scorecard, idx) => (
                        <Card
                            key={idx}
                            style={{
                              textAlign: 'center',
                              borderRadius: '15px',
                              border: 'none',
                            }}
                        >
                          <Progress
                              type="circle"
                              percent={Math.min(item.percent, 100)}
                              format={() => item.value || 'N/A'}
                              strokeWidth={7}
                          />
                          <div style={{ marginTop: 45 }}>{item.label}</div>
                        </Card>
                    ))}
                  </Col>
                </Card>
                <Card
                    style={{
                      margin: '20px auto',
                      width: '90%',
                      backgroundColor: '#fffbe6',
                      border: '1px solid #faad14',
                      borderRadius: 10,
                      padding: 16,
                    }}
                >
                  <Title
                      level={3}
                      style={{ color: 'rgb(255, 0, 0)', fontFamily: 'Poppins' }}
                  >
                    {t('urineAnalysis.warnings.title')}
                    <Button
                        className="consult-button"
                        type="primary"
                        size="large"
                        style={{ marginLeft: 20 }}
                        onClick={() => {
                          const warnings = getUrineDiseaseRisks(
                              urineTestData as UrineTestFormValues
                          );
                          navigate('/ai-doctor', {
                            state: {
                              urineTests: urineTestData,
                              urineWarnings: warnings,
                            },
                          });
                        }}
                    >
                      {t('urineAnalysis.warnings.analyzeButton')}
                    </Button>
                  </Title>
                  <ul style={{ paddingLeft: 20 }}>
                    {urineWarnings.length > 0 ? (
                        urineWarnings.map((risk, index) => {
                          const riskKey = risk.split('—')[0].trim().substring(3);
                          return (
                              <li key={index} style={{ fontSize: 16, marginBottom: 8 }}>
                                {risk}
                                <div>
                                  <Button
                                      type="link"
                                      style={{ padding: 0 }}
                                      onClick={() => toggleWarning(riskKey)}
                                  >
                                    {expandedWarnings[riskKey]
                                        ? t('urineAnalysis.warnings.showLess')
                                        : t('urineAnalysis.warnings.showMore')}
                                  </Button>
                                  {expandedWarnings[riskKey] && (
                                      <p
                                          style={{
                                            marginTop: 5,
                                            fontSize: 14,
                                            color: '#555',
                                          }}
                                      >
                                        {t(`urineAnalysis.warnings.explanations.${riskKey.toLowerCase()}`)}
                                      </p>
                                  )}
                                </div>
                              </li>
                          );
                        })
                    ) : (
                        <p style={{ fontSize: 16 }}>
                          {t('urineAnalysis.warnings.allGood')}
                        </p>
                    )}
                  </ul>
                </Card>
              </div>
          ) : (
              <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
              >
                <Title style={{ textAlign: 'center' }} level={2}>
                  {t('urineAnalysis.noData.title')}
                </Title>
                <Button
                    className="consult-button"
                    type="primary"
                    size="large"
                    onClick={() => navigate('/tests-form/urine-test')}
                >
                  {t('urineAnalysis.noData.button')}
                </Button>
              </div>
          )}
        </div>

        <div
            style={{
              width: '90%',
              margin: '20px auto 40px auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '20px',
            }}
        >
          {BarData.map((item:{name:string,image:string,value:string|number}) => (
              <Card
                  key={item.name}
                  style={{
                    flex: width > 900 ? '0 1 calc(50% - 10px)' : '1 1 100%',
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
              >
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Title
                      level={2}
                      style={{
                        color: '#3498db',
                        fontFamily: 'Poppins',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                  >
                    {item.name}
                  </Title>
                  <img
                      style={{
                        width: '16%',
                        height: '16%',
                      }}
                      src={item.image}
                   alt={''}/>
                </Row>
                <p style={{ margin: 0, fontSize: 16 }}>
                  {interestingFacts[item.name.toLowerCase()]?.join('\n')}
                </p>
              </Card>
          ))}
        </div>
      </div>
  );
}

export default UrineAnalysis;