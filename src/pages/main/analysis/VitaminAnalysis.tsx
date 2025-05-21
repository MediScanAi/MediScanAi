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
import type { VitaminTestFormValues } from '../../../app/slices/vitaminTestSlice';
import Drugs from '../../../assets/photos/Drugs.png';
import Done from '../../../assets/photos/Done.png';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ChartGoingDown from '../../../assets/photos/ChartGoingDown.png';
import Syringe from '../../../assets/photos/Syringe.png';
import MedKit from '../../../assets/photos/MedKit.png';
import Cholesterol from '../../../assets/photos/Cholesterol.png';
import Hemoglobin from '../../../assets/photos/Hemoglobin.png';
import { useEffect, useState } from 'react';

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
  <ResponsiveContainer width="100%" height={300}>
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

function VitaminAnalysis() {
  const mockAnalysisData: VitaminTestFormValues = JSON.parse(
    localStorage.getItem('vitaminTestData') || '{}'
  );
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

  const getVitaminRisks = (data: VitaminTestFormValues) => {
    const risks: string[] = [];

    if (data.vitaminA !== undefined && data.vitaminA !== null) {
      if (data.vitaminA < 0.02)
        risks.push(
          '⚠️ Low Vitamin A — Possible Night Blindness or Immune Deficiency'
        );
      if (data.vitaminA > 0.05)
        risks.push('⚠️ High Vitamin A — Possible Liver Damage or Toxicity');
    }

    if (data.vitaminB12 !== undefined && data.vitaminB12 !== null) {
      if (data.vitaminB12 < 200)
        risks.push(
          '⚠️ Low Vitamin B12 — Possible Anemia or Neurological Issues'
        );
      if (data.vitaminB12 > 900)
        risks.push('⚠️ High Vitamin B12 — Possible Kidney or Liver Problems');
    }

    if (data.vitaminC !== undefined && data.vitaminC !== null) {
      if (data.vitaminC < 0.4)
        risks.push('⚠️ Low Vitamin C — Possible Scurvy or Poor Wound Healing');
      if (data.vitaminC > 2.0)
        risks.push(
          '⚠️ High Vitamin C — Possible Kidney Stones or Digestive Issues'
        );
    }

    if (data.vitaminD !== undefined && data.vitaminD !== null) {
      if (data.vitaminD < 20)
        risks.push(
          '⚠️ Low Vitamin D — Possible Bone Weakness or Immune Dysfunction'
        );
      if (data.vitaminD > 100)
        risks.push(
          '⚠️ High Vitamin D — Possible Calcium Buildup or Kidney Damage'
        );
    }

    if (data.vitaminE !== undefined && data.vitaminE !== null) {
      if (data.vitaminE < 5)
        risks.push(
          '⚠️ Low Vitamin E — Possible Nerve Damage or Muscle Weakness'
        );
      if (data.vitaminE > 20)
        risks.push('⚠️ High Vitamin E — Possible Bleeding Risk or Hemorrhage');
    }

    if (data.vitaminK !== undefined && data.vitaminK !== null) {
      if (data.vitaminK < 0.1)
        risks.push(
          '⚠️ Low Vitamin K — Possible Bleeding Disorders or Poor Clotting'
        );
      if (data.vitaminK > 2.5)
        risks.push('⚠️ High Vitamin K — Possible Blood Clotting Issues');
    }

    return risks;
  };

  const vitaminExplanations: { [key: string]: string } = {
    '⚠️ Low Vitamin A — Possible Night Blindness or Immune Deficiency':
      'Vitamin A deficiency can lead to night blindness, dry eyes, and increased susceptibility to infections. It may also cause skin issues and impaired immune function. Common in malnourished individuals or those with fat malabsorption disorders.',

    '⚠️ High Vitamin A — Possible Liver Damage or Toxicity':
      'Excessive vitamin A can cause liver damage, bone pain, vision changes, and even hair loss. Chronic overconsumption may lead to increased intracranial pressure. Pregnant women should be especially careful as it can cause birth defects.',

    '⚠️ Low Vitamin B12 — Possible Anemia or Neurological Issues':
      'B12 deficiency can cause megaloblastic anemia, fatigue, nerve damage, and cognitive issues. Common in vegans, elderly, and those with pernicious anemia or gut absorption problems. Long-term deficiency can lead to irreversible neurological damage.',

    '⚠️ High Vitamin B12 — Possible Kidney or Liver Problems':
      "While rare, extremely high B12 levels may indicate liver disease, certain cancers, or kidney issues. It can sometimes occur with excessive supplementation. High levels don't necessarily mean toxicity but warrant investigation.",

    '⚠️ Low Vitamin C — Possible Scurvy or Poor Wound Healing':
      'Vitamin C deficiency leads to scurvy, causing bleeding gums, bruising, poor wound healing, and joint pain. Smokers, alcoholics, and those with poor diets are at higher risk. Essential for collagen production and immune function.',

    '⚠️ High Vitamin C — Possible Kidney Stones or Digestive Issues':
      'Excess vitamin C may cause diarrhea, nausea, and abdominal cramps. In predisposed individuals, it can increase oxalate production leading to kidney stones. Generally excreted in urine but megadoses should be avoided.',

    '⚠️ Low Vitamin D — Possible Bone Weakness or Immune Dysfunction':
      'Vitamin D deficiency causes bone softening (osteomalacia), muscle weakness, and increased infection risk. Common in northern climates, darker-skinned individuals, and those with limited sun exposure. Linked to depression and autoimmune diseases.',

    '⚠️ High Vitamin D — Possible Calcium Buildup or Kidney Damage':
      'Vitamin D toxicity leads to hypercalcemia causing nausea, weakness, kidney stones, and even kidney failure. Usually from excessive supplementation rather than diet or sun exposure. Can cause calcium deposits in soft tissues.',

    '⚠️ Low Vitamin E — Possible Nerve Damage or Muscle Weakness':
      "Vitamin E deficiency may cause nerve damage (ataxia), muscle weakness, and vision problems. Rare but seen in fat malabsorption disorders like cystic fibrosis or Crohn's disease. Important antioxidant for cell protection.",

    '⚠️ High Vitamin E — Possible Bleeding Risk or Hemorrhage':
      'Excess vitamin E can interfere with blood clotting, increasing bleeding risk especially in those on blood thinners. May also cause nausea, diarrhea, and fatigue. Supplementation beyond recommended doses is generally unnecessary.',

    '⚠️ Low Vitamin K — Possible Bleeding Disorders or Poor Clotting':
      'Vitamin K deficiency impairs blood clotting, leading to easy bruising and bleeding. Newborns are at risk (given prophylactic vitamin K). Seen in liver disease, malabsorption, or long-term antibiotic use.',

    '⚠️ High Vitamin K — Possible Blood Clotting Issues':
      'While rare, excessive vitamin K (mainly from supplements) may interfere with blood thinners like warfarin. Natural food sources are generally safe. Important for maintaining proper coagulation balance.',
  };

  const PieData: ChartData[] = [
    {
      name: 'Vitamin A',
      value: mockAnalysisData.vitaminA || 0,
      color: '#f39c12',
      image: Cholesterol,
    },
    {
      name: 'Vitamin B12',
      value: mockAnalysisData.vitaminB12 || 0,
      color: '#16a085',
      image: Hemoglobin,
    },
    {
      name: 'Vitamin C',
      value: mockAnalysisData.vitaminC || 0,
      color: '#e74c3c',
      image: Syringe,
    },
    {
      name: 'Vitamin D',
      value: mockAnalysisData.vitaminD || 0,
      color: '#8e44ad',
      image: ChartGoingDown,
    },
    {
      name: 'Vitamin E',
      value: mockAnalysisData.vitaminE || 0,
      color: '#2980b9',
      image: MedKit,
    },
    {
      name: 'Vitamin K',
      value: mockAnalysisData.vitaminK || 0,
      color: '#27ae60',
      image: Done,
    },
  ];

  const BarData: ChartData[] = [...PieData];

  const interestingFacts: { [key: string]: string[] } = {
    'Vitamin K': [
      'Vitamin K is essential for blood clotting and helps wounds heal properly.',
      'There are two main types: K1 (from leafy greens) and K2 (from fermented foods).',
      'A deficiency in vitamin K can lead to excessive bleeding or easy bruising.',
      'Vitamin K plays a role in maintaining bone health by supporting calcium regulation.',
      'Babies are often given a vitamin K shot at birth to prevent bleeding disorders.',
      'Antibiotics can interfere with vitamin K absorption by disrupting gut bacteria.',
    ],
    'Vitamin E': [
      'Vitamin E is a powerful antioxidant that helps protect cells from oxidative damage.',
      "It's often used in skincare products for its ability to improve skin health and reduce scars.",
      "Vitamin E is fat-soluble and stored in the body's fatty tissues and liver.",
      'Nuts, seeds, and vegetable oils are among the richest dietary sources of vitamin E.',
      'A deficiency in vitamin E can lead to nerve and muscle damage over time.',
      'It helps boost the immune system and may support eye health in aging individuals.',
    ],
    'Vitamin D': [
      "Vitamin D is known as the 'sunshine vitamin' because our skin produces it from sunlight.",
      'It is essential for calcium absorption and bone health.',
      'Low levels of vitamin D are linked to depression, fatigue, and weakened immunity.',
      'Vitamin D comes in two forms: D2 (plant-based) and D3 (animal-based or sun-derived).',
      'It may reduce the risk of chronic diseases like osteoporosis and certain cancers.',
      'People with darker skin may need more sun exposure to produce adequate vitamin D.',
    ],
    'Vitamin C': [
      'Vitamin C supports the immune system and helps reduce the duration of colds.',
      "It's essential for collagen production, aiding in skin, cartilage, and bone repair.",
      'Citrus fruits, strawberries, and bell peppers are rich sources of vitamin C.',
      'Vitamin C improves iron absorption from plant-based foods.',
      'Scurvy, once common among sailors, is caused by a severe vitamin C deficiency.',
      'As an antioxidant, vitamin C helps protect cells from environmental damage.',
    ],
    'Vitamin B12': [
      'Vitamin B12 is crucial for red blood cell formation and neurological function.',
      "It's naturally found only in animal products like meat, dairy, and eggs.",
      'A deficiency in B12 can cause fatigue, memory problems, and nerve damage.',
      'Vegans often require B12 supplementation or fortified foods.',
      'Vitamin B12 helps convert food into energy and supports DNA synthesis.',
      "The stomach's intrinsic factor is necessary for vitamin B12 absorption in the small intestine.",
    ],
    'Vitamin A': [
      'Vitamin A is essential for good vision, especially night vision.',
      'It supports immune function and helps maintain healthy skin and mucous membranes.',
      'Preformed vitamin A is found in animal products, while provitamin A (beta-carotene) comes from plants.',
      'Carrots are rich in beta-carotene, which the body converts to vitamin A.',
      'Excessive vitamin A intake can be toxic and lead to liver damage.',
      'It plays a role in cell growth and development, particularly in embryonic stages.',
    ],
  };

  const navigate = useNavigate();

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
            style={{ fontSize: width > 768 ? '30px' : '20px', marginTop: 50 }}
          >
            Vitamin Test Results
          </Typography>
          <Typography
            className="platform-title"
            style={{ fontSize: width > 768 ? '50px' : '30px' }}
          >
            Analysis with AI
          </Typography>
        </Col>
        <Col>
          <img
            src={Drugs}
            alt="platform"
            style={{
              marginBottom: -50,
              width: width > 768 ? '230px' : '80px',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 15,
            }}
          />
        </Col>
      </Row>

      <div>
        {mockAnalysisData.vitaminA ? (
          <>
            <Card className="card2-design">
              <Col className="card2-col-design">
                <Button
                  className="consult-button"
                  type="primary"
                  size="large"
                  onClick={() => navigate('/ai-doctor')}
                >
                  Analyze with AI
                </Button>
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

            {mockAnalysisData.vitaminA && (
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
                  🚨 Vitamin Health Warnings
                </Title>
                <ul style={{ paddingLeft: 20 }}>
                  {getVitaminRisks(mockAnalysisData).length > 0 ? (
                    getVitaminRisks(mockAnalysisData).map((risk, index) => (
                      <li key={index} style={{ fontSize: 16, marginBottom: 8 }}>
                        {risk}
                        {vitaminExplanations[risk] && (
                          <div>
                            <Button
                              type="link"
                              style={{ padding: 0 }}
                              onClick={() => toggleWarning(risk)}
                            >
                              {expandedWarnings[risk]
                                ? 'Show less'
                                : 'Show more'}
                            </Button>
                            {expandedWarnings[risk] && (
                              <p
                                style={{
                                  marginTop: 5,
                                  fontSize: 14,
                                  color: '#555',
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
                    <p style={{ fontSize: 16 }}>
                      ✅ All your vitamin levels are within normal range. Great
                      job!
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
            <Title style={{ textAlign: 'center' }} level={width > 768 ? 2 : 4}>
              Please fill a vitamin test results to get your analytic results
            </Title>
            <Button
              className="consult-button"
              type="primary"
              size="large"
              onClick={() => navigate('/tests-form/vitamin-test')}
            >
              Fill Vitamin Test Results
            </Button>
          </div>
        )}
      </div>

      <div style={{ width: '90%', margin: '20px auto 40px auto' }}>
        {PieData.map((item) => (
          <Card
            key={item.name}
            style={{
              marginTop: 20,
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 10,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Col
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'middle',
              }}
            >
              <Col>
                <Title
                  level={2}
                  style={{
                    color: '#3498db',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Poppins',
                  }}
                >
                  {item.name}
                </Title>
                <p style={{ margin: 0, fontSize: 16 }}>
                  {interestingFacts[item.name]}
                </p>
              </Col>
              <img
                style={{
                  width: '16%',
                  height: '16%',
                }}
                src={item.image}
                alt="Blood Test"
              />
            </Col>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default VitaminAnalysis;
