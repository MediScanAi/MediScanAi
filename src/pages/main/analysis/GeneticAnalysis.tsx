import { Card, Row, Col, Typography, Progress } from 'antd';
import '../../../assets/styles/analysis.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ChartGoingDown from '../../../assets/photos/ChartGoingDown.webp';
import Syringe from '../../../assets/photos/Syringe.webp';
import Bilirubin from '../../../assets/photos/Bilirubin.webp';
import BRCA1 from '../../../assets/photos/BRCA1.webp';
import APOE from '../../../assets/photos/APOE.webp';
import { useEffect } from 'react';
import { useState } from 'react';
import Gen from '../../../assets/photos/Gen.webp';
import type { GeneticTestFormValues } from '../../../app/slices/testSlice';
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
  value: string | null | undefined;
  percent: number;
}

const { Title } = Typography;

function GeneticAnalysis() {
  const geneticTestData = useAppSelector((state) => state.tests.genetic);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const [width, setWidth] = useState(window.innerWidth);

  const [expandedWarnings, setExpandedWarnings] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleWarning = (warning: string) => {
    setExpandedWarnings((prev) => ({
      ...prev,
      [warning]: !prev[warning],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const PieData: ChartData[] = [
    {
      name: 'BRCA1',
      value: geneticTestData?.brca1 || 0,
      color: '#f39c12',
      image: BRCA1,
    },
    {
      name: 'BRCA2',
      value: geneticTestData?.brca2 || 0,
      color: '#16a085',
      image: Gen,
    },
    {
      name: 'Factor V Leiden',
      value: geneticTestData?.factor_v_leiden || 0,
      color: '#e74c3c',
      image: Syringe,
    },
    {
      name: 'APOE',
      value: geneticTestData?.apoe || 0,
      color: '#8e44ad',
      image: APOE,
    },
    {
      name: 'MTHFR',
      value: geneticTestData?.mthfr || 0,
      color: '#2980b9',
      image: ChartGoingDown,
    },
    {
      name: 'CYP2C19',
      value: geneticTestData?.cyp2c19 || 0,
      color: '#27ae60',
      image: Bilirubin,
    },
  ];

  const navigate = useNavigate();

  const interestingFacts: { [key: string]: string[] } = {
    BRCA1: [
      'BRCA1 mutations increase breast cancer risk by up to 72% and ovarian cancer risk by up to 44%.',
      'The BRCA1 gene helps repair damaged DNA and maintain genomic stability.',
      'Men with BRCA1 mutations have increased risk of breast and prostate cancer.',
      'BRCA1 mutations are more common in certain ethnic groups like Ashkenazi Jews.',
      'Not all BRCA1 mutation carriers will develop cancer—other factors play a role.',
      'BRCA1 was the first breast cancer gene identified, discovered in 1994.',
    ],
    BRCA2: [
      'BRCA2 mutations increase breast cancer risk by up to 69% and ovarian cancer risk by up to 17%.',
      'BRCA2 plays a crucial role in DNA repair through homologous recombination.',
      'BRCA2 mutations significantly increase pancreatic cancer risk in both genders.',
      'BRCA2 carriers may respond better to certain chemotherapy drugs like platinum agents.',
      'BRCA2 mutations can cause Fanconi anemia when inherited from both parents.',
      'Male BRCA2 carriers have a 7% lifetime risk of breast cancer (vs 0.1% general population).',
    ],
    'Factor V Leiden': [
      'Factor V Leiden is the most common inherited blood clotting disorder.',
      'About 5% of Caucasians carry at least one copy of the mutation.',
      'Heterozygous carriers have 5-10x higher risk of blood clots; homozygous have 50-100x risk.',
      'The mutation originated in a single ancestor about 30,000 years ago.',
      'Hormonal contraception significantly increases clot risk in carriers.',
      'Factor V Leiden may have provided survival advantage against sepsis in the past.',
    ],
    APOE: [
      "APOE ε4 is the strongest genetic risk factor for late-onset Alzheimer's disease.",
      'APOE helps transport cholesterol and fats in the bloodstream.',
      'About 25% of people carry one ε4 allele; 2-3% carry two copies.',
      "APOE ε2 may be protective against Alzheimer's but increases cardiovascular risk.",
      'APOE genotype affects response to dietary fats and statin medications.',
      'The ε4 allele is more common in populations with historically high-fat diets.',
    ],
    MTHFR: [
      'MTHFR mutations affect folate metabolism and homocysteine levels.',
      'C677T is the most common variant, present in 30-40% of some populations.',
      'Homozygous C677T may increase risk of heart disease, stroke, and birth defects.',
      'MTHFR status affects requirements for folic acid and other B vitamins.',
      'The mutation may influence depression risk through neurotransmitter synthesis.',
      "MTHFR testing is controversial—many experts don't recommend routine screening.",
    ],
    CYP2C19: [
      'CYP2C19 metabolizes many drugs including antidepressants, clopidogrel, and proton pump inhibitors.',
      'Poor metabolizers may need alternative medications or dose adjustments.',
      'About 2-15% of people are poor metabolizers, varying by ethnicity.',
      'Ultrarapid metabolizers may process drugs too quickly, reducing effectiveness.',
      'Testing is particularly important for clopidogrel (Plavix) effectiveness.',
      'CYP2C19 status can affect antidepressant response and side effects.',
    ],
  };

  const geneticExplanations: { [key: string]: string } = {
    '⚠️ BRCA1 Positive — Increased Cancer Risk':
      'A positive BRCA1 result indicates a mutation in this tumor suppressor gene, significantly increasing lifetime risk of breast (up to 72%), ovarian (up to 44%), and other cancers. BRCA1 helps repair DNA damage; mutations impair this function. Management includes enhanced screening (MRI/mammograms), risk-reducing medications, or preventive surgeries. Not all carriers develop cancer, but vigilance is crucial. Genetic counseling helps interpret results and guide family testing.',

    '⚠️ BRCA2 Positive — Increased Cancer Risk':
      "BRCA2 mutations elevate risks for breast (up to 69%), ovarian (up to 17%), pancreatic, and other cancers. Like BRCA1, it's involved in DNA repair.Male carriers have increased breast and prostate cancer risks.Management parallels BRCA1, with consideration of pancreatic cancer screening for high - risk families.PARP inhibitors are particularly effective treatments for BRCA - related cancers.",

    '⚠️ Factor V Leiden Positive — Clotting Risk':
      "Factor V Leiden makes blood resistant to protein C, increasing clotting risk 5-10x (heterozygous) or 50-100x (homozygous). Most carriers never clot, but risks rise with surgery, pregnancy, or hormones. Symptoms include DVT or PE. Management focuses on clot prevention during high-risk situations. Lifelong anticoagulation isn't usually needed without clotting history.",

    "⚠️ APOE ε4/ε4 — High Alzheimer's Risk":
      "Two ε4 alleles confer the highest Alzheimer's risk (up to 15x increased). The ε4 protein clears amyloid plaques less effectively. However, not all carriers develop dementia. Prevention focuses on heart-healthy lifestyle (exercise, Mediterranean diet, cognitive engagement). Testing is generally not recommended predictively due to limited clinical utility.",

    '⚠️ MTHFR Homozygous — Folate Metabolism Impact':
      "Homozygous C677T mutations reduce enzyme activity by ~70%, potentially elevating homocysteine. The clinical significance is debated, but may modestly increase cardiovascular and pregnancy risks. Management may include methylfolate (not folic acid) supplementation if homocysteine is elevated, though routine treatment isn't universally recommended.",

    '⚠️ CYP2C19 Poor Metabolizer — Drug Response Altered':
      'Poor metabolizers process certain drugs very slowly, increasing side effects or requiring dose reductions. Affected medications include clopidogrel (reduced effectiveness), many antidepressants, and proton pump inhibitors. Pharmacogenetic testing can guide alternative drug selection (e.g., prasugrel instead of clopidogrel) or dosing adjustments.',
  };

  const getGeneticRisks = (data: GeneticTestFormValues) => {
    const risks: string[] = [];

    if (data.brca1 === 'positive') {
      risks.push('⚠️ BRCA1 Positive — Increased Cancer Risk');
    }

    if (data.brca2 === 'positive') {
      risks.push('⚠️ BRCA2 Positive — Increased Cancer Risk');
    }

    if (data.factor_v_leiden === 'positive') {
      risks.push('⚠️ Factor V Leiden Positive — Clotting Risk');
    }

    if (data.apoe === 'ε4/ε4') {
      risks.push("⚠️ APOE ε4/ε4 — High Alzheimer's Risk");
    }

    if (data.mthfr === 'Homozygous') {
      risks.push('⚠️ MTHFR Homozygous — Folate Metabolism Impact');
    }

    if (data.cyp2c19 === 'Category III') {
      risks.push('⚠️ CYP2C19 Poor Metabolizer — Drug Response Altered');
    }

    return risks;
  };

  const scorecards = [
    {
      label: 'BRCA1',
      value: geneticTestData?.brca1,
      percent: geneticTestData?.brca1 === 'positive' ? 100 : 0,
    },
    {
      label: 'BRCA2',
      value: geneticTestData?.brca2,
      percent: geneticTestData?.brca2 === 'positive' ? 100 : 0,
    },
    {
      label: 'APOE',
      value: geneticTestData?.apoe,
      percent:
        geneticTestData?.apoe === 'E1/ε1'
          ? 100
          : geneticTestData?.apoe === 'E2/ε2'
            ? 50
            : geneticTestData?.apoe === 'ε3/ε3'
              ? 25
              : geneticTestData?.apoe === 'E4/ε4'
                ? 0
                : 0,
    },
    {
      label: 'MTHFR',
      value: geneticTestData?.mthfr,
      percent:
        geneticTestData?.mthfr === 'Homozygous'
          ? 0
          : geneticTestData?.mthfr === 'Heterozygous'
            ? 50
            : geneticTestData?.mthfr === 'Normal'
              ? 100
              : 0,
    },
    {
      label: 'Factor V Leiden',
      value: geneticTestData?.factor_v_leiden,
      percent: geneticTestData?.factor_v_leiden === 'positive' ? 100 : 0,
    },
    {
      label: 'CYP2C19',
      value: geneticTestData?.cyp2c19,
      percent:
        geneticTestData?.cyp2c19 === 'Category I'
          ? 100
          : geneticTestData?.cyp2c19 === 'Category II'
            ? 50
            : geneticTestData?.cyp2c19 === 'Category III'
              ? 0
              : 0,
    },
  ];

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
            Genetic Test Results
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
            src={Gen}
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
        {geneticTestData?.brca1 ? (
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
                    marginBottom: 20,
                  }}
                ></div>
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
                    className={`card2-design ${isDarkMode ? 'dark' : ''}`}
                    style={{
                      textAlign: 'center',
                      borderRadius: '15px',
                      border: 'none',
                    }}
                  >
                    <div
                      className={`card2-design-text ${isDarkMode ? 'dark' : ''}`}
                      style={{ marginTop: 10 }}
                    >
                      {item.value}
                    </div>
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
                      style={{ marginTop: 30 }}
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
                    const warnings = getGeneticRisks(
                      geneticTestData as GeneticTestFormValues
                    );
                    navigate('/ai-doctor', {
                      state: {
                        geneticTests: geneticTestData,
                        geneticWarnings: warnings,
                      },
                    });
                  }}
                >
                  Analyze with AI
                </PrimaryButton>
              </Title>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {getGeneticRisks(geneticTestData as GeneticTestFormValues)
                  .length > 0 ? (
                  getGeneticRisks(geneticTestData as GeneticTestFormValues).map(
                    (risk, index) => (
                      <li
                        className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                        key={index}
                        style={{ fontSize: 16, marginBottom: 8 }}
                      >
                        {risk}
                        {geneticExplanations[risk] && (
                          <div>
                            <Button
                              type="link"
                              style={{ padding: 0, color: '#3498db' }}
                              onClick={() => toggleWarning(risk)}
                            >
                              {expandedWarnings[risk]
                                ? 'Show less'
                                : 'Show more'}
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
                                {geneticExplanations[risk]}
                              </p>
                            )}
                          </div>
                        )}
                      </li>
                    )
                  )
                ) : (
                  <p
                    className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                    style={{ fontSize: 16 }}
                  >
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
              Please fill a genetic test results to get your analytic results
            </Title>
            <PrimaryButton onClick={() => navigate('/tests-form/genetic-test')}>
              Fill Genetic Test Results
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

export default GeneticAnalysis;
