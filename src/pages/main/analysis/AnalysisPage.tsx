import { useEffect, useState } from 'react';
import { Spin, Col } from 'antd';
import Title from 'antd/es/typography/Title';
import geneticBackground from '../../../assets/photos/geneticBackground.webp';
import bloodBackground from '../../../assets/photos/bloodBackground.webp';
import vitaminBackground from '../../../assets/photos/vitaminBackground.webp';
import urineBackground from '../../../assets/photos/urineBackground.webp';

import '../../../assets/styles/analysis.css';
import { useAppSelector } from '../../../app/hooks.ts';

function AnalysisPage() {
  const [loading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={theme ? ' dark-theme' : ''}
      style={{ padding: 24, position: 'relative' }}
    >
      {loading ? (
        <Spin style={{ margin: '45vh 50vh', display: 'block' }} size="large" />
      ) : (
        <>
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
                >
                  <div className="inside-dev">
                    <Col className="row-col">
                      <Title level={3} style={{ color: 'black' }}>
                        Genetic Test Results
                      </Title>
                      <h5 style={{ color: 'black', margin: '10px' }}>
                        Genetic test results are used to check for the presence
                        of various substances in the blood.
                      </h5>
                    </Col>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnalysisPage;
