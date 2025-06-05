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
import BloodMultic from '../../../assets/photos/BloodMultic.png';
import Done from '../../../assets/photos/Done.webp';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ChartGoingDown from '../../../assets/photos/ChartGoingDown.webp';
import Syringe from '../../../assets/photos/Syringe.webp';
import MedKit from '../../../assets/photos/MedKit.webp';
import Cholesterol from '../../../assets/photos/Cholesterol.webp';
import Chocolate from '../../../assets/photos/Chocolate.webp';
import { useEffect } from 'react';
import { useState } from 'react';
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
  key: string;
}

interface CustomTooltipProps {
  active: boolean;
  payload: Array<{ color: string; name: string; value: string }>;
}

interface LegendPayload {
  color: string;
  value: string;
}

interface BloodTestFormValues {
  hemoglobin: number | null;
  wbc: number | null;
  rbc: number | null;
  platelets: number | null;
  glucose: number | null;
  cholesterol: number | null;
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

function BloodAnalysis() {
  const { t } = useTranslation('bloodAnalysis');
  const bloodTestData = useAppSelector(
    (state) => state.tests.blood
  ) as unknown as BloodTestFormValues;
  const [width, setWidth] = useState(window.innerWidth);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const [expandedWarnings, setExpandedWarnings] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleWarning = (warning: string) => {
    setExpandedWarnings((prev) => ({
      ...prev,
      [warning]: !prev[warning],
    }));
  };

  const getDiseaseRisks = (data: BloodTestFormValues) => {
    const risks: string[] = [];

    if (data.hemoglobin !== undefined && data.hemoglobin !== null) {
      if (data.hemoglobin < 12)
        risks.push(t('bloodAnalysis.warnings.conditions.lowHemoglobin'));
      if (data.hemoglobin > 17.5)
        risks.push(t('bloodAnalysis.warnings.conditions.highHemoglobin'));
    }

    if (data.wbc !== undefined && data.wbc !== null) {
      if (data.wbc < 4)
        risks.push(t('bloodAnalysis.warnings.conditions.lowWbc'));
      if (data.wbc > 11)
        risks.push(t('bloodAnalysis.warnings.conditions.highWbc'));
    }

    if (data.rbc !== undefined && data.rbc !== null) {
      if (data.rbc < 4)
        risks.push(t('bloodAnalysis.warnings.conditions.lowRbc'));
      if (data.rbc > 6.2)
        risks.push(t('bloodAnalysis.warnings.conditions.highRbc'));
    }

    if (data.platelets !== undefined && data.platelets !== null) {
      if (data.platelets < 150)
        risks.push(t('bloodAnalysis.warnings.conditions.lowPlatelets'));
      if (data.platelets > 450)
        risks.push(t('bloodAnalysis.warnings.conditions.highPlatelets'));
    }

    if (data.glucose !== undefined && data.glucose !== null) {
      if (data.glucose < 70)
        risks.push(t('bloodAnalysis.warnings.conditions.lowGlucose'));
      if (data.glucose > 126)
        risks.push(t('bloodAnalysis.warnings.conditions.highGlucose'));
    }

    if (data.cholesterol !== undefined && data.cholesterol !== null) {
      if (data.cholesterol > 240)
        risks.push(t('bloodAnalysis.warnings.conditions.highCholesterol'));
    }

    return risks;
  };

  const diseaseExplanations: { [key: string]: string } = {
    [t('bloodAnalysis.warnings.conditions.lowHemoglobin')]: t(
      'bloodAnalysis.warnings.explanations.lowHemoglobin'
    ),
    [t('bloodAnalysis.warnings.conditions.highHemoglobin')]: t(
      'bloodAnalysis.warnings.explanations.highHemoglobin'
    ),
    [t('bloodAnalysis.warnings.conditions.lowWbc')]: t(
      'bloodAnalysis.warnings.explanations.lowWbc'
    ),
    [t('bloodAnalysis.warnings.conditions.highWbc')]: t(
      'bloodAnalysis.warnings.explanations.highWbc'
    ),
    [t('bloodAnalysis.warnings.conditions.lowRbc')]: t(
      'bloodAnalysis.warnings.explanations.lowRbc'
    ),
    [t('bloodAnalysis.warnings.conditions.highRbc')]: t(
      'bloodAnalysis.warnings.explanations.highRbc'
    ),
    [t('bloodAnalysis.warnings.conditions.lowPlatelets')]: t(
      'bloodAnalysis.warnings.explanations.lowPlatelets'
    ),
    [t('bloodAnalysis.warnings.conditions.highPlatelets')]: t(
      'bloodAnalysis.warnings.explanations.highPlatelets'
    ),
    [t('bloodAnalysis.warnings.conditions.lowGlucose')]: t(
      'bloodAnalysis.warnings.explanations.lowGlucose'
    ),
    [t('bloodAnalysis.warnings.conditions.highGlucose')]: t(
      'bloodAnalysis.warnings.explanations.highGlucose'
    ),
    [t('bloodAnalysis.warnings.conditions.highCholesterol')]: t(
      'bloodAnalysis.warnings.explanations.highCholesterol'
    ),
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const PieData: ChartData[] = [
    {
      name: t('bloodAnalysis.Cholesterol'),
      value: bloodTestData?.cholesterol || 0,
      color: '#f39c12',
      image: Cholesterol,
      key: 'Cholesterol',
    },
    {
      name: t('bloodAnalysis.Glucose'),
      value: bloodTestData?.glucose || 0,
      color: '#16a085',
      image: Chocolate,
      key: 'Glucose',
    },
    {
      name: t('bloodAnalysis.Hemoglobin'),
      value: bloodTestData?.hemoglobin || 0,
      color: '#e74c3c',
      image: Syringe,
      key: 'Hemoglobin',
    },
    {
      name: t('bloodAnalysis.Platelets'),
      value: bloodTestData?.platelets || 0,
      color: '#8e44ad',
      image: ChartGoingDown,
      key: 'Platelets',
    },
    {
      name: t('bloodAnalysis.RBC'),
      value: bloodTestData?.rbc || 0,
      color: '#2980b9',
      image: MedKit,
      key: 'RBC',
    },
    {
      name: t('bloodAnalysis.WBC'),
      value: bloodTestData?.wbc || 0,
      color: '#27ae60',
      image: Done,
      key: 'WBC',
    },
  ];

  const BarData: ChartData[] = [...PieData];

  const interestingFacts: { [key: string]: string[] } = {
    Cholesterol: [
      t('bloodAnalysis.facts.Cholesterol.0'),
      t('bloodAnalysis.facts.Cholesterol.1'),
      t('bloodAnalysis.facts.Cholesterol.2'),
      t('bloodAnalysis.facts.Cholesterol.3'),
      t('bloodAnalysis.facts.Cholesterol.4'),
      t('bloodAnalysis.facts.Cholesterol.5'),
    ],
    Glucose: [
      t('bloodAnalysis.facts.Glucose.0'),
      t('bloodAnalysis.facts.Glucose.1'),
      t('bloodAnalysis.facts.Glucose.2'),
      t('bloodAnalysis.facts.Glucose.3'),
      t('bloodAnalysis.facts.Glucose.4'),
      t('bloodAnalysis.facts.Glucose.5'),
    ],
    Hemoglobin: [
      t('bloodAnalysis.facts.Hemoglobin.0'),
      t('bloodAnalysis.facts.Hemoglobin.1'),
      t('bloodAnalysis.facts.Hemoglobin.2'),
      t('bloodAnalysis.facts.Hemoglobin.3'),
      t('bloodAnalysis.facts.Hemoglobin.4'),
      t('bloodAnalysis.facts.Hemoglobin.5'),
    ],
    Platelets: [
      t('bloodAnalysis.facts.Platelets.0'),
      t('bloodAnalysis.facts.Platelets.1'),
      t('bloodAnalysis.facts.Platelets.2'),
      t('bloodAnalysis.facts.Platelets.3'),
      t('bloodAnalysis.facts.Platelets.4'),
      t('bloodAnalysis.facts.Platelets.5'),
    ],
    RBC: [
      t('bloodAnalysis.facts.RBC.0'),
      t('bloodAnalysis.facts.RBC.1'),
      t('bloodAnalysis.facts.RBC.2'),
      t('bloodAnalysis.facts.RBC.3'),
      t('bloodAnalysis.facts.RBC.4'),
      t('bloodAnalysis.facts.RBC.5'),
    ],
    WBC: [
      t('bloodAnalysis.facts.WBC.0'),
      t('bloodAnalysis.facts.WBC.1'),
      t('bloodAnalysis.facts.WBC.2'),
      t('bloodAnalysis.facts.WBC.3'),
      t('bloodAnalysis.facts.WBC.4'),
      t('bloodAnalysis.facts.WBC.5'),
    ],
  };

  const navigate = useNavigate();

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
            {t('bloodAnalysis.title')}
          </Typography>
          <Typography
            className={`platform-title ${isDarkMode ? 'dark' : ''}`}
            style={{ fontSize: width > 768 ? '50px' : '30px' }}
          >
            {t('bloodAnalysis.subtitle')}
          </Typography>
        </Col>
        <Col>
          <img
            draggable={false}
            src={BloodMultic}
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
        {bloodTestData?.cholesterol ? (
          <div>
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

            <Card className={`warning-section ${isDarkMode ? 'dark' : ''}`}>
              <Title
                level={3}
                style={{ color: 'rgb(255, 0, 0)' }}
              >
                {t('bloodAnalysis.warnings.title')}
                <PrimaryButton
                  style={{ marginLeft: 20 }}
                  onClick={() => {
                    const warnings = getDiseaseRisks(
                      bloodTestData as BloodTestFormValues
                    );
                    navigate('/ai-doctor', {
                      state: {
                        bloodTests: bloodTestData,
                        healthWarnings: warnings,
                      },
                    });
                  }}
                >
                  {t('bloodAnalysis.warnings.analyzeButton')}
                </PrimaryButton>
              </Title>
              <ul style={{ paddingLeft: 20 }}>
                {getDiseaseRisks(bloodTestData).length > 0 ? (
                  getDiseaseRisks(bloodTestData).map((risk, index) => (
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
                            style={{ padding: 0, color: '#3498db' }}
                            onClick={() => toggleWarning(risk)}
                          >
                            {expandedWarnings[risk]
                              ? t('bloodAnalysis.warnings.showLess')
                              : t('bloodAnalysis.warnings.showMore')}
                          </Button>
                          {expandedWarnings[risk] && (
                            <p
                              className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
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
                    {t('bloodAnalysis.warnings.allGood')}
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
              {t('bloodAnalysis.noData.title')}
            </Title>
            <PrimaryButton onClick={() => navigate('/tests-form/blood-test')}>
              {t('bloodAnalysis.noData.button')}
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
            key={item.key}
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
              {interestingFacts[item.key]}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BloodAnalysis;
