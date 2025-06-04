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
      name: 'Bilirubin',
      value: urineTestData?.bilirubin || 0,
      color: '#f39c12',
      image: Bilirubin,
    },
    {
      name: 'Blood',
      value: urineTestData?.blood || 0,
      color: '#16a085',
      image: BloodMultic,
    },
    {
      name: 'Nitrites',
      value: urineTestData?.nitrites || 0,
      color: '#e74c3c',
      image: Nitrites,
    },
    {
      name: 'LeukocyteEsterase',
      value: urineTestData?.leukocyteEsterase || 0,
      color: '#8e44ad',
      image: LeukocyteEsterase,
    },
    {
      name: 'Glucose',
      value: urineTestData?.glucose || 0,
      color: '#2980b9',
      image: Chocolate,
    },
    {
      name: 'Ketones',
      value: urineTestData?.ketones || 0,
      color: '#27ae60',
      image: Ketones,
    },
    {
      name: 'ph',
      value: urineTestData?.ph || 0,
      color: '#27ae60',
      image: PH,
    },
    {
      name: 'Protein',
      value: urineTestData?.protein || 0,
      color: '#27ae60',
      image: Protein,
    },
    {
      name: 'Specific Gravity',
      value: urineTestData?.specificGravity || 0,
      color: '#27ae60',
      image: Done,
    },
    {
      name: 'Urobilinogen',
      value: urineTestData?.urobilinogen || 0,
      color: '#27ae60',
      image: Urobilinogen,
    },
  ];

  const scorecards = [
    {
      label: 'Bilirubin',
      value: urineTestData?.bilirubin,
      percent:
        urineTestData?.bilirubin === 'positive'
          ? 100
          : urineTestData?.bilirubin === 'negative'
            ? 0
            : 52,
    },
    {
      label: 'Blood',
      value: urineTestData?.blood,
      percent:
        urineTestData?.blood === 'positive'
          ? 100
          : urineTestData?.blood === 'negative'
            ? 0
            : 52,
    },
    {
      label: 'Nitrites',
      value: urineTestData?.nitrites,
      percent:
        urineTestData?.nitrites === 'positive'
          ? 100
          : urineTestData?.nitrites === 'negative'
            ? 0
            : 52,
    },
    {
      label: 'LeukocyteEsterase',
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

    if (data.bilirubin !== undefined && Number(data.bilirubin) > 0) {
      risks.push(
        '⚠️ Bilirubin detected — Possible Liver Disease or Biliary Obstruction'
      );
    }
    if (data.blood !== undefined && Number(data.blood) > 0) {
      risks.push(
        '⚠️ Blood detected — Possible Infection, Kidney Stones, or Trauma'
      );
    }
    if (data.nitrites !== undefined && Number(data.nitrites) > 0) {
      risks.push(
        '⚠️ Nitrites detected — Suggestive of Urinary Tract Infection (UTI)'
      );
    }
    if (
      data.leukocyteEsterase !== undefined &&
      Number(data.leukocyteEsterase) > 0
    ) {
      risks.push(
        '⚠️ Leukocyte Esterase detected — Indicative of Infection or Inflammation'
      );
    }
    if (data.glucose !== undefined && Number(data.glucose) > 0) {
      risks.push('⚠️ Glucose detected — Possible Diabetes or Renal Glucosuria');
    }
    if (data.ketones !== undefined && Number(data.ketones) > 0) {
      risks.push(
        '⚠️ Ketones detected — Possible Diabetes, Starvation, or Ketoacidosis'
      );
    }
    if (
      data.ph !== undefined &&
      (Number(data.ph) < 4.5 || Number(data.ph) > 8)
    ) {
      risks.push(
        '⚠️ Abnormal pH — Possible Infection, Kidney Stones, or Diet-related Issues'
      );
    }
    if (data.protein !== undefined && Number(data.protein) > 0) {
      risks.push(
        '⚠️ Protein detected — Possible Kidney Disease or Hypertension'
      );
    }
    if (
      data.specificGravity !== undefined &&
      (Number(data.specificGravity) < 1.005 ||
        Number(data.specificGravity) > 1.03)
    ) {
      risks.push(
        '⚠️ Abnormal Specific Gravity — May Indicate Hydration Issues or Kidney Dysfunction'
      );
    }
    if (data.urobilinogen !== undefined && Number(data.urobilinogen) > 1.0) {
      risks.push(
        '⚠️ High Urobilinogen — Possible Liver Disease or Hemolytic Disorder'
      );
    }

    return risks;
  };

  const diseaseExplanations: { [key: string]: string } = {
    '⚠️ Bilirubin detected — Possible Liver Disease or Biliary Obstruction':
      'Bilirubin in urine can signal liver dysfunction, such as hepatitis or bile duct blockage.',
    '⚠️ Blood detected — Possible Infection, Kidney Stones, or Trauma':
      'Blood in urine may be caused by infection, stones, or injury to the urinary tract.',
    '⚠️ Nitrites detected — Suggestive of Urinary Tract Infection (UTI)':
      'Nitrites in urine usually indicate bacteria that convert nitrates, common in UTIs.',
    '⚠️ Leukocyte Esterase detected — Indicative of Infection or Inflammation':
      'This enzyme signals white blood cells in urine, suggesting inflammation or infection.',
    '⚠️ Glucose detected — Possible Diabetes or Renal Glucosuria':
      'Sugar in urine can result from high blood sugar levels, commonly associated with diabetes.',
    '⚠️ Ketones detected — Possible Diabetes, Starvation, or Ketoacidosis':
      'Ketones appear when the body uses fat instead of sugar for energy, often in diabetes or fasting.',
    '⚠️ Abnormal pH — Possible Infection, Kidney Stones, or Diet-related Issues':
      'Urine pH outside normal range may result from diet, infections, or kidney problems.',
    '⚠️ Protein detected — Possible Kidney Disease or Hypertension':
      'Proteinuria is often linked to kidney issues or chronic conditions like high blood pressure.',
    '⚠️ Abnormal Specific Gravity — May Indicate Hydration Issues or Kidney Dysfunction':
      'Too dilute or too concentrated urine may suggest dehydration or impaired kidney function.',
    '⚠️ High Urobilinogen — Possible Liver Disease or Hemolytic Disorder':
      'Elevated urobilinogen might indicate liver damage or excess breakdown of red blood cells.',
  };

  const interestingFacts: { [key: string]: string[] } = {
    Bilirubin: [
      'Bilirubin is a yellow compound that results from the breakdown of red blood cells.',
      'Presence of bilirubin in urine can indicate liver disease or bile duct obstruction.',
      'Normally, urine should not contain bilirubin—its presence may suggest hepatitis or cirrhosis.',
      'High bilirubin levels can cause jaundice, giving skin and eyes a yellowish tint.',
      'Urine test strips can detect even trace amounts of bilirubin, making them valuable for early diagnosis.',
    ],
    Blood: [
      'Blood in the urine (hematuria) can result from infections, kidney stones, or trauma.',
      'Even microscopic amounts of blood in urine are detectable with urinalysis.',
      'Strenuous exercise or menstruation can sometimes cause temporary blood presence in urine.',
      'Visible blood in urine may indicate a more serious issue, such as bladder cancer or glomerulonephritis.',
      'Early detection of hematuria is crucial for diagnosing kidney or urinary tract problems.',
    ],
    Nitrites: [
      'Nitrites in urine often indicate a bacterial infection, as some bacteria convert nitrates to nitrites.',
      'Urinary tract infections (UTIs) are the most common cause of nitrites in urine.',
      'A positive nitrite test combined with leukocyte esterase strongly suggests a UTI.',
      "Not all bacteria produce nitrites, so a negative result doesn't always rule out infection.",
      'Regular urinalysis can help catch asymptomatic UTIs, especially in pregnancy.',
    ],
    LeukocyteEsterase: [
      'Leukocyte esterase is an enzyme released by white blood cells in response to infection.',
      'Its presence in urine typically signals inflammation or a urinary tract infection.',
      'False positives can occur due to contamination or improper sample handling.',
      'A positive leukocyte esterase test without nitrites may suggest a non-bacterial infection.',
      'Combining leukocyte esterase and nitrite tests improves the accuracy of UTI diagnosis.',
    ],
    Glucose: [
      'Glucose in urine (glycosuria) often indicates high blood sugar levels, such as in diabetes.',
      "Normally, kidneys reabsorb all glucose, so it shouldn't appear in urine unless blood glucose is high.",
      'Glycosuria can also result from kidney conditions affecting reabsorption.',
      'During pregnancy, glucose may appear in urine even without gestational diabetes.',
      'Regular glucose checks in urine are helpful in monitoring diabetic patients.',
    ],
    Ketones: [
      'Ketones in urine form when the body breaks down fat for energy due to lack of glucose.',
      'They commonly appear in uncontrolled diabetes, fasting, or ketogenic diets.',
      'High levels of ketones can lead to ketoacidosis, a potentially life-threatening condition.',
      'Ketone testing is especially important for people with type 1 diabetes.',
      'Strenuous exercise or prolonged vomiting can also cause temporary ketone spikes.',
    ],
    ph: [
      'Urine pH reflects how acidic or alkaline your urine is, influenced by diet and health.',
      'A very acidic pH may indicate dehydration, high protein diet, or diabetes.',
      'Alkaline urine may be linked to UTIs or a vegetarian diet.',
      'Kidney stones can be associated with consistently abnormal urine pH.',
      'Urine pH helps guide treatment decisions for infections and metabolic disorders.',
    ],
    Protein: [
      'Protein in urine (proteinuria) can be a sign of kidney damage or disease.',
      'Small, temporary amounts of protein can appear after exercise or stress.',
      'Persistent proteinuria requires further testing to assess kidney function.',
      'Diabetes and hypertension are major causes of chronic proteinuria.',
      'Early detection helps prevent further kidney damage and preserve function.',
    ],
    'Specific Gravity': [
      'Urine specific gravity measures how concentrated your urine is.',
      'It reflects hydration status and kidney ability to concentrate or dilute urine.',
      'High specific gravity may suggest dehydration, heart failure, or glucose in urine.',
      'Low values could point to overhydration or impaired kidney function.',
      'This test helps assess how well kidneys are maintaining fluid and electrolyte balance.',
    ],
    Urobilinogen: [
      'Urobilinogen is formed from the breakdown of bilirubin in the intestines.',
      'Small amounts are normal in urine, but too much can suggest liver or hemolytic disease.',
      'Absence of urobilinogen may indicate bile duct obstruction.',
      'Elevated urobilinogen can be an early sign of liver dysfunction, even before jaundice appears.',
      'This marker helps distinguish between different types of liver and blood disorders.',
    ],
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
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -45,
        }}
      >
        <Col className="welcome-section-column">
          <Typography
            className={`welcome-text ${isDarkMode ? 'dark' : ''}`}
            style={{
              fontSize: width > 768 ? '30px' : '20px',
              marginTop: 50,
              marginLeft: 5,
            }}
          >
            Urine Test Results
          </Typography>
          <Typography
            className={`platform-title ${isDarkMode ? 'dark' : ''}`}
            style={{ fontSize: width > 768 ? '50px' : '30px' }}
          >
            Analysis with AI
          </Typography>
        </Col>
        <Col>
          <img
            draggable={false}
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
            <Card
              className={`card2-design ${isDarkMode ? 'dark' : ''}`}
              style={{ border: 'none' }}
            >
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
                    className={`card2-design ${isDarkMode ? 'dark' : ''}`}
                  >
                    <Progress
                      type="circle"
                      percent={Math.min(item.percent, 100)}
                      format={() => (
                        <span
                          className={`card2-design-text ${isDarkMode ? 'dark' : ''}`}
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
                🚨 Health Risk Warnings
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
                  Analyze with AI
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
                            {expandedWarnings[risk] ? 'Show less' : 'Show more'}
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
                    ✅ All your values are within normal range. Great job!
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
              Please fill a Urine test results to get your analytic results
            </Title>
            <Button
              className="consult-button"
              type="primary"
              size="large"
              onClick={() => navigate('/tests-form/urine-test')} // Fixed navigation path
            >
              Fill Urine Test Results
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
