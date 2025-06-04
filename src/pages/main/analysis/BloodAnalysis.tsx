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
        risks.push(
          '⚠️ Low Hemoglobin — Possible Anemia or Nutritional Deficiency'
        );
      if (data.hemoglobin > 17.5)
        risks.push(
          '⚠️ High Hemoglobin — Possible Polycythemia or Chronic Hypoxia'
        );
    }

    if (data.wbc !== undefined && data.wbc !== null) {
      if (data.wbc < 4)
        risks.push(
          '⚠️ Low WBC — Possible Bone Marrow Suppression or Viral Infection'
        );
      if (data.wbc > 11)
        risks.push(
          '⚠️ High WBC — Possible Infection, Inflammation, or Leukemia'
        );
    }

    if (data.rbc !== undefined && data.rbc !== null) {
      if (data.rbc < 4)
        risks.push('⚠️ Low RBC — Possible Anemia or Blood Loss');
      if (data.rbc > 6.2)
        risks.push('⚠️ High RBC — Possible Polycythemia or Heart Disease');
    }

    if (data.platelets !== undefined && data.platelets !== null) {
      if (data.platelets < 150)
        risks.push('⚠️ Low Platelets — Possible ITP or Liver Disease');
      if (data.platelets > 450)
        risks.push(
          '⚠️ High Platelets — Possible Chronic Inflammation or Thrombocythemia'
        );
    }

    if (data.glucose !== undefined && data.glucose !== null) {
      if (data.glucose < 70)
        risks.push('⚠️ Low Glucose — Possible Hypoglycemia');
      if (data.glucose > 126) risks.push('⚠️ High Glucose — Possible Diabetes');
    }

    if (data.cholesterol !== undefined && data.cholesterol !== null) {
      if (data.cholesterol > 240)
        risks.push(
          '⚠️ High Cholesterol — Increased Risk of Heart Disease or Stroke'
        );
    }

    return risks;
  };

  const diseaseExplanations: { [key: string]: string } = {
    '⚠️ Low Hemoglobin — Possible Anemia or Nutritional Deficiency':
      'Anemia is a condition where the blood lacks enough healthy red blood cells or hemoglobin. It leads to symptoms like fatigue, shortness of breath, dizziness, and pale skin. The most common causes include iron deficiency (due to poor diet or chronic bleeding), vitamin B12 or folate deficiency, and chronic diseases like kidney problems. In women, heavy menstruation is a frequent cause. In some cases, anemia may stem from bone marrow disorders or autoimmune conditions.',

    '⚠️ High Hemoglobin — Possible Polycythemia or Chronic Hypoxia':
      'High hemoglobin can result from living at high altitudes, smoking, or conditions like polycythemia vera. Polycythemia refers to an elevated concentration of red blood cells, often leading to thickened blood and increased risk of clots. This can occur in response to low oxygen (from smoking or living at high altitudes), heart or lung diseases, or a rare condition called polycythemia vera, where the bone marrow produces too many blood cells. Symptoms may include headaches, dizziness, blurred vision, or a ruddy complexion.',

    '⚠️ Low WBC — Possible Bone Marrow Suppression or Viral Infection':
      "Low white blood cell count can be caused by viral infections or bone marrow issues. A low white blood cell (WBC) count weakens the body's immune defense. It can be caused by viral infections, autoimmune diseases (like lupus), chemotherapy, certain medications, or bone marrow disorders. Patients with leukopenia are more susceptible to infections and may require close monitoring.",

    '⚠️ High WBC — Possible Infection, Inflammation, or Leukemia':
      'A high white blood cell count often signals infection or inflammation. An elevated WBC count often signals an active infection or inflammation. It may also be linked to stress, trauma, or more serious conditions like leukemia. Temporary spikes in WBCs can occur during acute illness, but persistently high values warrant further investigation.',

    '⚠️ Low RBC — Possible Anemia or Blood Loss':
      'Red blood cells carry oxygen. Low RBCs can be caused by anemia, blood loss, or nutritional deficiencies, leading to fatigue and poor oxygen circulation.',

    '⚠️ High RBC — Possible Polycythemia or Heart Disease':
      'High RBC count might suggest dehydration, lung or heart disease, or polycythemia vera. It can increase blood viscosity and risk of clotting. Polycythemia refers to an elevated concentration of red blood cells, often leading to thickened blood and increased risk of clots. This can occur in response to low oxygen (from smoking or living at high altitudes), heart or lung diseases, or a rare condition called polycythemia vera, where the bone marrow produces too many blood cells. Symptoms may include headaches, dizziness, blurred vision, or a ruddy complexion.',

    '⚠️ Low Platelets — Possible ITP or Liver Disease':
      'Low platelet levels (thrombocytopenia) may occur from immune disorders, liver issues, or medications. Platelets help with blood clotting. A low count can cause easy bruising, prolonged bleeding, or petechiae (tiny red spots on the skin). Common causes include liver disease, autoimmune disorders like ITP (immune thrombocytopenic purpura), viral infections, or medication side effects.',

    '⚠️ High Platelets — Possible Chronic Inflammation or Thrombocythemia':
      'High platelet count might indicate inflammation, iron deficiency, or a bone marrow disorder. High platelet levels may be reactive (due to inflammation, infection, or surgery) or a sign of bone marrow disorders like essential thrombocythemia. Elevated platelets can increase the risk of blood clots or, paradoxically, bleeding complications.',

    '⚠️ Low Glucose — Possible Hypoglycemia':
      "Low blood sugar can result in shakiness, confusion, or fainting. It's important to maintain a stable glucose level through diet and monitoring.",

    '⚠️ High Glucose — Possible Diabetes':
      "High glucose levels may signal diabetes or prediabetes. It's crucial to manage with lifestyle, diet, and possibly medication to avoid complications. Persistent high glucose levels suggest prediabetes or diabetes, especially if accompanied by symptoms like frequent urination, thirst, or unexplained weight loss. Long-term hyperglycemia can damage nerves, kidneys, and blood vessels.",

    '⚠️ High Cholesterol — Increased Risk of Heart Disease or Stroke':
      'Excess cholesterol can build up in arteries, leading to heart attacks or strokes. Diet, exercise, and medication (like statins) can help control it.',
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
      name: 'Cholesterol',
      value: bloodTestData?.cholesterol || 0,
      color: '#f39c12',
      image: Cholesterol,
    },
    {
      name: 'Glucose',
      value: bloodTestData?.glucose || 0,
      color: '#16a085',
      image: Chocolate,
    },
    {
      name: 'Hemoglobin',
      value: bloodTestData?.hemoglobin || 0,
      color: '#e74c3c',
      image: Syringe,
    },
    {
      name: 'Platelets',
      value: bloodTestData?.platelets || 0,
      color: '#8e44ad',
      image: ChartGoingDown,
    },
    {
      name: 'RBC',
      value: bloodTestData?.rbc || 0,
      color: '#2980b9',
      image: MedKit,
    },
    {
      name: 'WBC',
      value: bloodTestData?.wbc || 0,
      color: '#27ae60',
      image: Done,
    },
  ];

  const BarData: ChartData[] = [...PieData];

  const interestingFacts: { [key: string]: string[] } = {
    Cholesterol: [
      'Cholesterol is essential for producing sex hormones like estrogen and testosterone.',
      'Your brain is made up of nearly 60% fat, and cholesterol plays a key role in its structure.',
      "Excess cholesterol doesn't just affect the heart—it may also impair cognitive functions over time.",
      'Statins are commonly prescribed medications that help reduce high cholesterol levels.',
      'Genetics can influence how your body produces and processes cholesterol, regardless of diet.',
      'Trans fats, often found in processed foods, can significantly raise LDL ("bad") cholesterol levels.',
    ],
    Glucose: [
      'The pancreas releases insulin to help cells absorb glucose from the bloodstream.',
      'Hypoglycemia (low blood sugar) can cause dizziness, confusion, and even unconsciousness.',
      'Glucose tolerance tests are used to diagnose diabetes and prediabetes.',
      'Glycated hemoglobin (HbA1c) levels reflect average blood sugar over the past 2–3 months.',
      'Even stress and illness can raise glucose levels temporarily through hormonal changes.',
      'Complex carbs like whole grains provide slower, more stable glucose release than refined sugars.',
    ],
    Hemoglobin: [
      'Athletes often monitor hemoglobin levels to ensure efficient oxygen delivery during performance.',
      'Folic acid and vitamin B12 are important nutrients in red blood cell and hemoglobin production.',
      'Hemoglobin variants like HbS (sickle cell) can affect oxygen transport and cause genetic disorders.',
      'Low hemoglobin (anemia) may present as pale skin, cold hands/feet, and rapid heartbeat.',
      'High hemoglobin levels can occur in chronic smokers or people living at high altitudes.',
      'Hemoglobin also plays a role in buffering blood pH and maintaining acid-base balance.',
    ],
    Platelets: [
      'Platelets change shape and become "sticky" when they detect a blood vessel injury.',
      'Thrombocytopenia is a condition where you have abnormally low platelet counts.',
      'Some autoimmune disorders cause the body to mistakenly destroy its own platelets.',
      'Platelets can be donated and are vital in cancer treatment and major surgeries.',
      'Aspirin can reduce platelet function and is often used as a blood thinner.',
      'Vitamin K is essential for proper blood clotting and platelet performance.',
    ],
    RBC: [
      'RBCs are produced in the bone marrow in a process called erythropoiesis.',
      'Erythropoietin (EPO), a hormone from the kidneys, stimulates RBC production.',
      'Low RBC count (anemia) can be caused by blood loss, nutritional deficiencies, or chronic disease.',
      'Sickle cell anemia is a genetic condition affecting RBC shape and lifespan.',
      'RBCs do not have a nucleus—this maximizes space for hemoglobin.',
      'Iron-rich foods like red meat, spinach, and lentils help maintain healthy RBC levels.',
    ],
    WBC: [
      'WBCs include several subtypes, such as neutrophils, eosinophils, and basophils—each with specific roles.',
      'Lymphocytes are the WBCs responsible for antibody production and immune memory.',
      'Chronic low WBC counts can make you more susceptible to infections.',
      'High WBC counts (leukocytosis) can result from infection, inflammation, or even stress.',
      'WBCs move between the bloodstream and tissues, patrolling for pathogens.',
      'Some WBCs can "remember" invaders, allowing for faster immune responses in the future.',
    ],
  };

  const navigate = useNavigate();

  return (
    <div className={`analysis-page ${isDarkMode ? 'dark' : ''}`}>
      <Row
        className="welcome-section"
        style={{
          flexDirection: 'row',
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
            Blood Test Results
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
            src={BloodMultic}
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
        {bloodTestData?.cholesterol ? (
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
                <CustomBarChart data={BarData} />
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
                  Analyze with AI
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
                            {expandedWarnings[risk] ? 'Show less' : 'Show more'}
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
              Please fill a blood test results to get your analytic results
            </Title>
            <PrimaryButton onClick={() => navigate('/tests-form/blood-test')}>
              Fill Blood Test Results
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

export default BloodAnalysis;
