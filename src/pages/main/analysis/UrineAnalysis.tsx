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
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import PrimaryButton from '../../../components/common/PrimaryButton';
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
  const { t } = useTranslation('urineAnalysis');
  const urineTestData = useAppSelector((state) => state.tests.urine);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [expandedWarnings, setExpandedWarnings] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleWarning = (warning: string) => {
    setExpandedWarnings((prev) => ({
      ...prev,
      [warning]: !prev[warning],
    }));
  };

  const BarData: ChartData[] = [
    {
      name: t('urineAnalysis.bilirubin'),
      value: urineTestData?.bilirubin || 0,
      color: '#f39c12',
      image: Bilirubin,
    },
    {
      name: t('urineAnalysis.blood'),
      value: urineTestData?.blood || 0,
      color: '#16a085',
      image: BloodMultic,
    },
    {
      name: t('urineAnalysis.nitrites'),
      value: urineTestData?.nitrites || 0,
      color: '#e74c3c',
      image: Nitrites,
    },
    {
      name: t('urineAnalysis.leukocyteEsterase'),
      value: urineTestData?.leukocyteEsterase || 0,
      color: '#8e44ad',
      image: LeukocyteEsterase,
    },
    {
      name: t('urineAnalysis.glucose'),
      value: urineTestData?.glucose || 0,
      color: '#2980b9',
      image: Chocolate,
    },
    {
      name: t('urineAnalysis.ketones'),
      value: urineTestData?.ketones || 0,
      color: '#27ae60',
      image: Ketones,
    },
    {
      name: t('urineAnalysis.ph'),
      value: urineTestData?.ph || 0,
      color: '#27ae60',
      image: PH,
    },
    {
      name: t('urineAnalysis.protein'),
      value: urineTestData?.protein || 0,
      color: '#27ae60',
      image: Protein,
    },
    {
      name: t('urineAnalysis.specificGravity'),
      value: urineTestData?.specificGravity || 0,
      color: '#27ae60',
      image: Done,
    },
    {
      name: t('urineAnalysis.urobilinogen'),
      value: urineTestData?.urobilinogen || 0,
      color: '#27ae60',
      image: Urobilinogen,
    },
  ];

  const scorecards = [
    {
      label: t('urineAnalysis.bilirubin'),
      value: t(
        `urineAnalysis.result.${urineTestData?.bilirubin || 'negative'}`
      ),
      percent:
        urineTestData?.bilirubin === 'positive'
          ? 100
          : urineTestData?.bilirubin === 'negative'
            ? 0
            : 52,
    },
    {
      label: t('urineAnalysis.blood'),
      value: t(`urineAnalysis.result.${urineTestData?.blood || 'negative'}`),
      percent:
        urineTestData?.blood === 'positive'
          ? 100
          : urineTestData?.blood === 'negative'
            ? 0
            : 52,
    },
    {
      label: t('urineAnalysis.nitrites'),
      value: t(`urineAnalysis.result.${urineTestData?.nitrites || 'negative'}`),
      percent:
        urineTestData?.nitrites === 'positive'
          ? 100
          : urineTestData?.nitrites === 'negative'
            ? 0
            : 52,
    },
    {
      label: t('urineAnalysis.leukocyteEsterase'),
      value: t(
        `urineAnalysis.result.${urineTestData?.leukocyteEsterase || 'negative'}`
      ),
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

    if (data.bilirubin !== undefined && Number(data.bilirubin) > 0) {
      risks.push(t('urineAnalysis.warnings.conditions.bilirubin'));
    }
    if (data.blood !== undefined && Number(data.blood) > 0) {
      risks.push(t('urineAnalysis.warnings.conditions.blood'));
    }
    if (data.nitrites !== undefined && Number(data.nitrites) > 0) {
      risks.push(t('urineAnalysis.warnings.conditions.nitrites'));
    }
    if (
      data.leukocyteEsterase !== undefined &&
      Number(data.leukocyteEsterase) > 0
    ) {
      risks.push(t('urineAnalysis.warnings.conditions.leukocyteEsterase'));
    }
    if (data.glucose !== undefined && Number(data.glucose) > 0) {
      risks.push(t('urineAnalysis.warnings.conditions.glucose'));
    }
    if (data.ketones !== undefined && Number(data.ketones) > 0) {
      risks.push(t('urineAnalysis.warnings.conditions.ketones'));
    }
    if (
      data.ph !== undefined &&
      (Number(data.ph) < 4.5 || Number(data.ph) > 8)
    ) {
      risks.push(t('urineAnalysis.warnings.conditions.ph'));
    }
    if (data.protein !== undefined && Number(data.protein) > 0) {
      risks.push(t('urineAnalysis.warnings.conditions.protein'));
    }
    if (
      data.specificGravity !== undefined &&
      (Number(data.specificGravity) < 1.005 ||
        Number(data.specificGravity) > 1.03)
    ) {
      risks.push(t('urineAnalysis.warnings.conditions.specificGravity'));
    }
    if (data.urobilinogen !== undefined && Number(data.urobilinogen) > 1.0) {
      risks.push(t('urineAnalysis.warnings.conditions.urobilinogen'));
    }

    return risks;
  };

  const diseaseExplanations: { [key: string]: string } = {
    [t('urineAnalysis.warnings.conditions.bilirubin')]: t(
      'urineAnalysis.warnings.explanations.bilirubin'
    ),
    [t('urineAnalysis.warnings.conditions.blood')]: t(
      'urineAnalysis.warnings.explanations.blood'
    ),
    [t('urineAnalysis.warnings.conditions.nitrites')]: t(
      'urineAnalysis.warnings.explanations.nitrites'
    ),
    [t('urineAnalysis.warnings.conditions.leukocyteEsterase')]: t(
      'urineAnalysis.warnings.explanations.leukocyteEsterase'
    ),
    [t('urineAnalysis.warnings.conditions.glucose')]: t(
      'urineAnalysis.warnings.explanations.glucose'
    ),
    [t('urineAnalysis.warnings.conditions.ketones')]: t(
      'urineAnalysis.warnings.explanations.ketones'
    ),
    [t('urineAnalysis.warnings.conditions.ph')]: t(
      'urineAnalysis.warnings.explanations.ph'
    ),
    [t('urineAnalysis.warnings.conditions.protein')]: t(
      'urineAnalysis.warnings.explanations.protein'
    ),
    [t('urineAnalysis.warnings.conditions.specificGravity')]: t(
      'urineAnalysis.warnings.explanations.specificGravity'
    ),
    [t('urineAnalysis.warnings.conditions.urobilinogen')]: t(
      'urineAnalysis.warnings.explanations.urobilinogen'
    ),
  };

  const interestingFacts: { [key: string]: string[] } = {
    [t('urineAnalysis.bilirubin')]: t(
      'urineAnalysis.interestingFacts.bilirubin',
      { returnObjects: true }
    ) as string[],
    [t('urineAnalysis.blood')]: t('urineAnalysis.interestingFacts.blood', {
      returnObjects: true,
    }) as string[],
    [t('urineAnalysis.nitrites')]: t(
      'urineAnalysis.interestingFacts.nitrites',
      { returnObjects: true }
    ) as string[],
    [t('urineAnalysis.leukocyteEsterase')]: t(
      'urineAnalysis.interestingFacts.leukocyteEsterase',
      { returnObjects: true }
    ) as string[],
    [t('urineAnalysis.glucose')]: t('urineAnalysis.interestingFacts.glucose', {
      returnObjects: true,
    }) as string[],
    [t('urineAnalysis.ketones')]: t('urineAnalysis.interestingFacts.ketones', {
      returnObjects: true,
    }) as string[],
    [t('urineAnalysis.ph')]: t('urineAnalysis.interestingFacts.ph', {
      returnObjects: true,
    }) as string[],
    [t('urineAnalysis.protein')]: t('urineAnalysis.interestingFacts.protein', {
      returnObjects: true,
    }) as string[],
    [t('urineAnalysis.specificGravity')]: t(
      'urineAnalysis.interestingFacts.specificGravity',
      { returnObjects: true }
    ) as string[],
    [t('urineAnalysis.urobilinogen')]: t(
      'urineAnalysis.interestingFacts.urobilinogen',
      { returnObjects: true }
    ) as string[],
  };

  const navigate = useNavigate();

  const urineWarnings = urineTestData
    ? getUrineDiseaseRisks(urineTestData as UrineTestFormValues)
    : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={`analysis-page ${isDarkMode ? 'dark' : ''}`}>
      <Row
        className="welcome-section"
      >
        <Col className="welcome-section-column">
          <Typography
            className={`welcome-text ${isDarkMode ? 'dark' : ''}`}
            style={{
              fontSize: width > 768 ? '30px' : '20px',
            }}
          >
            {t('urineAnalysis.title')}
          </Typography>
          <Typography
            className={`platform-title ${isDarkMode ? 'dark' : ''}`}
            style={{ fontSize: width > 768 ? '50px' : '30px' }}
          >
            {t('urineAnalysis.subtitle')}
          </Typography>
        </Col>
        <Col>
          <img
            draggable={false}
            src={Urine}
            alt="platform"
            style={{
              width: width > 768 ? '300px' : '80px',
              height: width > 768 ? '300px' : '80px',
            }}
            className="welcome-image"
          />
        </Col>
      </Row>

      <div>
        {urineTestData ? (
          <div>
            <Card
              className={`card2-design ${isDarkMode ? 'dark' : ''}`}
              style={{ border: 'none' }}
            >
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
                    className={`card2-design ${isDarkMode ? 'dark' : ''}`}
                  >
                    <Progress
                      type="circle"
                      percent={Math.min(item.percent, 100)}
                      format={() => (
                        <span
                          className={`card2-design-text ${isDarkMode ? 'dark' : ''}`}
                          style={{ fontSize: 15 }}
                        >
                          {item.value || 'N/A'}
                        </span>
                      )}
                      strokeWidth={7}
                    />
                    <div
                      className={`card2-design-text ${isDarkMode ? 'dark' : ''}`}
                      style={{ marginTop: 45 }}
                    >
                      {item.label}
                    </div>
                  </Card>
                ))}
              </Col>
            </Card>
            <Card className={`warning-section ${isDarkMode ? 'dark' : ''}`}>
              <Title
                level={3}
                style={{ color: 'rgb(255, 0, 0)', fontFamily: 'Poppins' }}
              >
                {t('urineAnalysis.warnings.title')}
                <PrimaryButton
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
                </PrimaryButton>
              </Title>
              <ul style={{ paddingLeft: 20 }}>
                {urineWarnings.length > 0 ? (
                  urineWarnings.map((risk, index) => (
                    <li
                      className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                      key={index}
                      style={{ fontSize: 16, marginBottom: 8 }}
                    >
                      {risk}
                      {diseaseExplanations[risk] && (
                        <div>
                          <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={() => toggleWarning(risk)}
                          >
                            {expandedWarnings[risk]
                              ? t('urineAnalysis.warnings.showLess')
                              : t('urineAnalysis.warnings.showMore')}
                          </Button>
                          {expandedWarnings[risk] && (
                            <p
                              className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                              style={{
                                marginTop: 5,
                                fontSize: 14,
                                color: '#555',
                              }}
                            >
                              {diseaseExplanations[risk]}
                            </p>
                          )}
                        </div>
                      )}
                    </li>
                  ))
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
            <Title
              className={`platform-title ${isDarkMode ? 'dark' : ''}`}
              style={{ textAlign: 'center' }}
              level={2}
            >
              {t('urineAnalysis.noData.title')}
            </Title>
            <PrimaryButton onClick={() => navigate('/tests-form/urine-test')}>
              {t('urineAnalysis.noData.button')}
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
        {BarData.map((item) => (
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

export default UrineAnalysis;
