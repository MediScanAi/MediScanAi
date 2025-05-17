import { useEffect } from 'react';
import { Button, Col } from 'antd';
import Title from 'antd/es/typography/Title';
import geneticBackground from '../../../assets/photos/geneticBackground.webp';
import bloodBackground from '../../../assets/photos/bloodBackground.webp';
import vitaminBackground from '../../../assets/photos/vitaminBackground.webp';
import urineBackground from '../../../assets/photos/urineBackground.webp';
import '../../../assets/styles/analysis.css';
import { useNavigate } from 'react-router-dom';

const AnalysisPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigate = useNavigate();

  return (
    <div style={{ padding: 24, position: 'relative' }}>
      <div>
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
              width: '96.5%',
              margin: '0 auto',
              // marginBottom: '18vh',
            }}
          >
            <Col className="row-col">
              <Title
                level={3}
                style={{
                  color: '#3498db',
                  textAlign: 'center',
                  margin: '0 auto',
                  width: '100%',
                }}
              >
                Health Analysis Summary with AI
              </Title>
              <p
                style={{
                  color: 'black',
                  textAlign: 'center',
                  margin: '0 auto',
                  width: '80%',
                  fontSize: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <li>
                  This summary includes results from all your tests and a
                  personalized analysis of your health with AI.
                </li>
                <br />
                <li>
                  Our system has processed your tests data to provide a
                  comprehensive overview of your health status.
                </li>
                <br />
                <li>
                  Trends over time are also visualized, helping you and your
                  healthcare provider understand how your health is evolving.
                </li>
                <br />
                <li>
                  This report is not a diagnosis, but an AI-assisted guide to
                  support your personal health awareness and decision-making.
                </li>
                <br />
                <li style={{ color: 'red' }}>
                  For any abnormal values or health concerns, we strongly
                  recommend consulting a licensed medical professional.
                </li>
                <Button
                  style={{ marginTop: '10px' }}
                  type="primary"
                  onClick={() => {
                    navigate('/ai-doctor');
                  }}
                >
                  Get Analysis
                </Button>
              </p>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
