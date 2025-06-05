import { Card, Row, Col, Typography } from 'antd';
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
import type { VitaminTestFormValues } from '../../../app/slices/testSlice';
import Drugs from '../../../assets/photos/Drugs.webp';
import VitaminK from '../../../assets/photos/VitaminK.webp';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Apple from '../../../assets/photos/Apple.webp';
import Cholesterol from '../../../assets/photos/Cholesterol.webp';
import Cow from '../../../assets/photos/Cow.webp';
import Protein from '../../../assets/photos/Protein.webp';
import PopCorn from '../../../assets/photos/PopCorn.webp';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { useTranslation } from 'react-i18next';

interface ChartData {
  name: string;
  value: number;
  color: string;
  image: string;
}

interface CustomTooltipProps {
  active: boolean;
  payload: Array<{ color: string; name: string; value: string }>;
}

interface LegendPayload {
  color: string;
  value: string;
}

const CustomLegend = ({ payload }: { payload: LegendPayload[] }) => (
  <ul style={{ display: 'flex', gap: 20, listStyle: 'none', paddingLeft: 0 }}>
    {payload.map((entry, index: number) => (
      <li key={`item-${index}`} style={{ color: entry.color }}>
        ● {entry.value}
      </li>
    ))}
  </ul>
);

const { Title } = Typography;

function VitaminAnalysis() {
  const { t } = useTranslation('vitaminAnalysis');
  const vitaminTestData = useAppSelector((state) => state.tests.vitamin);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [width, setWidth] = useState(window.innerWidth);
  const [expandedWarnings, setExpandedWarnings] = useState<{
    [key: string]: boolean;
  }>({});

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className={`custom-tooltip ${isDarkMode ? 'dark' : ''}`}>
          <p style={{ color: item.color }} className="custom-tooltip-text">
            {item.name}
          </p>
          <p className="custom-tooltip-text">
            <b>Value:</b> {item.value}
          </p>
        </div>
      );
    }
    return null;
  };

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

  const getVitaminRisks = (data: VitaminTestFormValues) => {
    const risks: string[] = [];

    if (data.vitaminA !== undefined && data.vitaminA !== null) {
      if (data.vitaminA < 20)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminA.low'));
      if (data.vitaminA > 65)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminA.high'));
    }

    if (data.vitaminB12 !== undefined && data.vitaminB12 !== null) {
      if (data.vitaminB12 < 200)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminB12.low'));
      if (data.vitaminB12 > 900)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminB12.high'));
    }

    if (data.vitaminC !== undefined && data.vitaminC !== null) {
      if (data.vitaminC < 0.2)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminC.low'));
      if (data.vitaminC > 2.0)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminC.high'));
    }

    if (data.vitaminD !== undefined && data.vitaminD !== null) {
      if (data.vitaminD < 20)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminD.low'));
      if (data.vitaminD > 50)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminD.high'));
    }

    if (data.vitaminE !== undefined && data.vitaminE !== null) {
      if (data.vitaminE < 5)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminE.low'));
      if (data.vitaminE > 20)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminE.high'));
    }

    if (data.vitaminK !== undefined && data.vitaminK !== null) {
      if (data.vitaminK < 0.1)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminK.low'));
      if (data.vitaminK > 2.2)
        risks.push(t('vitaminAnalysis.warnings.conditions.vitaminK.high'));
    }

    return risks;
  };

  const vitaminExplanations: { [key: string]: string } = {
    [t('vitaminAnalysis.warnings.conditions.vitaminA.low')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminA.low'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminA.high')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminA.high'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminB12.low')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminB12.low'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminB12.high')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminB12.high'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminC.low')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminC.low'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminC.high')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminC.high'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminD.low')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminD.low'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminD.high')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminD.high'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminE.low')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminE.low'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminE.high')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminE.high'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminK.low')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminK.low'
    ),
    [t('vitaminAnalysis.warnings.conditions.vitaminK.high')]: t(
      'vitaminAnalysis.warnings.explanations.vitaminK.high'
    ),
  };

  const PieData: ChartData[] = [
    {
      name: t('vitaminAnalysis.parameters.vitaminA'),
      value: vitaminTestData?.vitaminA || 0,
      color: '#f39c12',
      image: Cholesterol,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminB12'),
      value: vitaminTestData?.vitaminB12 || 0,
      color: '#16a085',
      image: Cow,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminC'),
      value: vitaminTestData?.vitaminC || 0,
      color: '#e74c3c',
      image: Apple,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminD'),
      value: vitaminTestData?.vitaminD || 0,
      color: '#8e44ad',
      image: Protein,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminE'),
      value: vitaminTestData?.vitaminE || 0,
      color: '#2980b9',
      image: PopCorn,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminK'),
      value: vitaminTestData?.vitaminK || 0,
      color: '#27ae60',
      image: VitaminK,
    },
  ];

  const BarData: ChartData[] = [...PieData];

  const interestingFacts: { [key: string]: string[] } = {
    [t('vitaminAnalysis.parameters.vitaminA')]: t(
      'vitaminAnalysis.interestingFacts.vitaminA',
      { returnObjects: true }
    ) as string[],
    [t('vitaminAnalysis.parameters.vitaminB12')]: t(
      'vitaminAnalysis.interestingFacts.vitaminB12',
      { returnObjects: true }
    ) as string[],
    [t('vitaminAnalysis.parameters.vitaminC')]: t(
      'vitaminAnalysis.interestingFacts.vitaminC',
      { returnObjects: true }
    ) as string[],
    [t('vitaminAnalysis.parameters.vitaminD')]: t(
      'vitaminAnalysis.interestingFacts.vitaminD',
      { returnObjects: true }
    ) as string[],
    [t('vitaminAnalysis.parameters.vitaminE')]: t(
      'vitaminAnalysis.interestingFacts.vitaminE',
      { returnObjects: true }
    ) as string[],
    [t('vitaminAnalysis.parameters.vitaminK')]: t(
      'vitaminAnalysis.interestingFacts.vitaminK',
      { returnObjects: true }
    ) as string[],
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={`analysis-page ${isDarkMode ? 'dark' : ''}`}>
      <Row className="welcome-section">
        <Col className="welcome-section-column">
          <Typography
            className={`welcome-text ${isDarkMode ? 'dark' : ''}`}
            style={{
              fontSize: width > 768 ? '30px' : '20px',
            }}
          >
            {t('vitaminAnalysis.title')}
          </Typography>
          <Typography
            className={`platform-title ${isDarkMode ? 'dark' : ''}`}
            style={{ fontSize: width > 768 ? '50px' : '30px' }}
          >
            {t('vitaminAnalysis.subtitle')}
          </Typography>
        </Col>
        <Col>
          <img
            draggable={false}
            src={Drugs}
            alt="platform"
            style={{
              width: width > 768 ? '230px' : '80px',
              height: width > 768 ? '230px' : '80px',
            }}
            className="welcome-image"
          />
        </Col>
      </Row>

      <div>
        {vitaminTestData?.vitaminA ? (
          <>
            <Card
              className={`card2-design ${isDarkMode ? 'dark' : ''}`}
              style={{ border: 'none' }}
            >
              <Col
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: width > 768 ? 'row' : 'column',
                }}
              >
                <CustomBarChart data={BarData} />
              </Col>
            </Card>

            {vitaminTestData.vitaminA && (
              <Card className={`warning-section ${isDarkMode ? 'dark' : ''}`}>
                <Title
                  level={3}
                  style={{ color: 'rgb(255, 0, 0)', fontFamily: 'Poppins' }}
                >
                  {t('vitaminAnalysis.warnings.title')}
                  <PrimaryButton
                    style={{ marginLeft: 20 }}
                    onClick={() => {
                      const warnings = getVitaminRisks(
                        vitaminTestData as VitaminTestFormValues
                      );
                      navigate('/ai-doctor', {
                        state: {
                          vitaminTests: vitaminTestData,
                          vitaminWarnings: warnings,
                        },
                      });
                    }}
                  >
                    {t('vitaminAnalysis.warnings.analyzeButton')}
                  </PrimaryButton>
                </Title>
                <ul style={{ paddingLeft: 20 }}>
                  {getVitaminRisks(vitaminTestData as VitaminTestFormValues)
                    .length > 0 ? (
                    getVitaminRisks(
                      vitaminTestData as VitaminTestFormValues
                    ).map((risk, index) => (
                      <li
                        className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                        key={index}
                        style={{ fontSize: 16, marginBottom: 8 }}
                      >
                        {risk}
                        {vitaminExplanations[risk] && (
                          <div>
                            <Button
                              type="link"
                              style={{ padding: 0, color: '#3498db' }}
                              onClick={() => toggleWarning(risk)}
                            >
                              {expandedWarnings[risk]
                                ? t('vitaminAnalysis.warnings.showLess')
                                : t('vitaminAnalysis.warnings.showMore')}
                            </Button>
                            {expandedWarnings[risk] && (
                              <p
                                className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                                style={{
                                  marginTop: 5,
                                  fontSize: 14,
                                }}
                              >
                                {vitaminExplanations[risk]}
                              </p>
                            )}
                          </div>
                        )}
                      </li>
                    ))
                  ) : (
                    <p
                      className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                      style={{ fontSize: 16 }}
                    >
                      {t('vitaminAnalysis.warnings.allGood')}
                    </p>
                  )}
                </ul>
              </Card>
            )}
          </>
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
            <Title
              className={`platform-title ${isDarkMode ? 'dark' : ''}`}
              style={{ textAlign: 'center' }}
              level={width > 768 ? 2 : 4}
            >
              {t('vitaminAnalysis.noData.title')}
            </Title>
            <PrimaryButton onClick={() => navigate('/tests-form/vitamin-test')}>
              {t('vitaminAnalysis.noData.button')}
            </PrimaryButton>
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
        {PieData.map((item) => (
          <Card
            key={item.name}
            className={`interesting-card ${isDarkMode ? 'dark' : ''}`}
            style={{
              flex: width > 900 ? '0 1 calc(50% - 10px)' : '1 1 100%',
            }}
          >
            <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Title
                level={2}
                className={`interesting-card-title ${isDarkMode ? 'dark' : ''}`}
              >
                {item.name}
              </Title>
              <img
                draggable={false}
                style={{
                  width: '16%',
                  height: '16%',
                }}
                src={item.image}
              />
            </Row>
            <p
              className={`interesting-card-text ${isDarkMode ? 'dark' : ''}`}
              style={{ margin: 0, fontSize: 16 }}
            >
              {interestingFacts[item.name]}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default VitaminAnalysis;
