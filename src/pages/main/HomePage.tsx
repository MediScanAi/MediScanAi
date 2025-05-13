import { Typography, Row, Col, Card, Carousel, List } from 'antd';
import 'antd/dist/reset.css';
import {
    CloudUploadOutlined,
    FileTextOutlined,
    SolutionOutlined,
    BarChartOutlined
} from '@ant-design/icons';
import partner1 from "../../assets/partner1.jpg"
import partner2 from "../../assets/partner2.jpg"
import partner3 from "../../assets/partner3.png"
import partner4 from "../../assets/partner4.jpg"
import partner5 from "../../assets/partner5.jpg"
import dataUpload from "../../assets/dataUpload.jpg"
import aiAnalysis from "../../assets/aiAnalysis.jpg"
import insightsReport from "../../assets/insightsReport.jpg"
import clinicalDecision from "../../assets/clinicalDecision.jpg"
import backGroundPlatform from "../../assets/backGroundPlatform.jpg"
import mission from "../../assets/ourMission.jpg"

const { Title, Text } = Typography;

const steps = [
    {
        title: "Data Upload",
        text: "Securely submit medical genomic data through our encrypted portal",
        icon: <CloudUploadOutlined style={{ fontSize: 40 }} />,
        backgroundImage: dataUpload
    },
    {
        title: "AI Analysis",
        text: "Our algorithms process your data with multi-omic integration",
        icon: <BarChartOutlined style={{ fontSize: 40 }} />,
        backgroundImage: aiAnalysis

    },
    {
        title: " Insights Report",
        text: "Receive actionable biomarkers and therapeutic recommendations",
        icon: <FileTextOutlined style={{ fontSize: 40 }} />,
        backgroundImage: insightsReport

    },
    {
        title: " Clinical Decision",
        text: "Physicians integrate findings into personalized treatment plans",
        icon: <SolutionOutlined style={{ fontSize: 40 }} />,
        backgroundImage: clinicalDecision

    },
];

const chooseUs = [
    {
        title: "Advanced AI Technology",
        text: "We leverage state-of-the-art artificial intelligence to process and interpret complex medical and genomic data. Our models are continuously updated to ensure accurate diagnostics and personalized recommendations, helping clinicians stay ahead in a rapidly evolving field.",
    },
    {
        title: "Secure & Compliant",
        text: "Your privacy is our priority. Our platform is built with enterprise-grade encryption and adheres strictly to HIPAA and GDPR standards. We ensure that all sensitive health data remains protected and compliant with global healthcare regulations.",
    },
    {
        title: "Clinician-Ready Reports",
        text: "Our reports are designed with healthcare professionals in mind — easy to read, focused on what matters, and integrated with clinical insights. Each report highlights key findings and suggests next steps, supporting better-informed decisions at the point of care.",
    },
    {
        title: "Fast Turnaround",
        text: "In healthcare, time is critical. Our system delivers detailed analysis and comprehensive results quickly — without compromising accuracy. This means patients can get timely care, and clinicians can act with confidence.",
    },
    {
        title: "Easy to Use",
        text: "Designed for simplicity, our platform requires no specialized training. With an intuitive interface, healthcare providers can upload data, run analyses, and review results in just a few steps, making advanced insights accessible to all.",
    },
];


const partners = [
    {
        id: 1,
        image: partner1,
        name: "Astghik Medical Center"
    },
    {
        id: 2,
        image: partner2,
        name: "Izmirlyan Medical Center"
    },
    {
        id: 3,
        image: partner3,
        name: "Erebuni Medical Center"
    },
    {
        id: 4,
        image: partner4,
        name: "Davidyants Laboratory"
    },
    {
        id: 5,
        image: partner5,
        name: "Slawmed Medical Center"
    }
]

function HomePage() {

    return (
        <Row justify="center" align="middle"
            style={{
                minHeight: '100vh', padding: "20px",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <Col style={{ width: "100%" }}>
                <Row style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundImage: `url(${backGroundPlatform})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: "220px",
                    borderRadius: "15px"
                }}>
                    <Col>
                        <div style={{ textAlign: 'center', display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Title style={{ color: 'black', marginBottom: 16, fontWeight: 500 }}>
                                <b>Medical Analysis Platform</b>
                            </Title>
                            <Text type="secondary" style={{ fontSize: 23, color: "black" }}>
                                Advanced AI-powered diagnostics and medical analysis for healthcare professionals.
                                The platform uses the latest AI to analyze complex medical and genomic data accurately.

                            </Text>
                        </div>
                    </Col>
                </Row>
                <Col
                    style={{
                        textAlign: "center",
                        marginTop: 25,
                        padding: "0 24px",
                    }}
                >
                    <Title level={2} style={{ color: '#3498db', marginBottom: 32 }}>
                        How It Works
                    </Title>
                    <Row gutter={[24, 24]} justify="space-around" align="top">
                        {steps.map(({ title, text, icon, backgroundImage }, index) => (
                            <Col key={index} xs={54} sm={12} md={6}>
                                <Card
                                    style={{
                                        height: '100%',
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                        padding: 0,
                                        position: 'relative'
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundImage: `url(${backgroundImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            filter: 'blur(2px)',
                                            zIndex: 1
                                        }}
                                    />
                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 16 }}>
                                            {icon}
                                        </div>
                                        <Title level={3} style={{ color: 'black' }}>{title}</Title>
                                        <Text style={{ color: 'black' }}>{text}</Text>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col style={{ textAlign: "center", marginTop: 25, padding: "24px" }}>
                    <Title level={2} style={{ color: '#3498db', marginBottom: 32 }}>
                        Why Choose Us?
                    </Title>

                    <List
                        itemLayout="horizontal"
                        dataSource={chooseUs}
                        split={false}
                        renderItem={({ title, text }) => (
                            <List.Item style={{ padding: "16px 0", borderBottom: "1px solid #f0f0f0" }}>
                                <Row gutter={[16, 16]} align="middle" style={{ width: "100%" }}>
                                    <Col xs={24} md={6}>
                                        <Title level={4} style={{ color: '#2c3e50', margin: 0, textAlign: "left" }}>
                                            {title}
                                        </Title>
                                    </Col>
                                    <Col xs={24} md={18}>
                                        <Text type="secondary" style={{ fontSize: 16, textAlign: "left", display: "block" }}>
                                            {text}
                                        </Text>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </Col>


                <Col style={{ textAlign: 'center', marginTop: 50 }}>
                    <Title style={{ color: '#3498db', marginBottom: 32 }}>
                        Our Mission
                    </Title>
                    <Row justify="center" align="middle" gutter={[32, 32]}>
                        <Col xs={24} md={12}>
                            <img
                                src={mission}
                                alt="mission"
                                style={{
                                    height: '350px',
                                    borderRadius: '25px',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <Text type="secondary" style={{ fontSize: 25, display: "block", textAlign: 'center' }}>
                                Our mission is to provide healthcare professionals with accurate, actionable insights to make
                                informed decisions for their patients. By leveraging advanced AI and genomic data,
                                we aim to improve patient care, enhance diagnostic accuracy, and support personalized treatment plans.
                            </Text>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ textAlign: "center", marginTop: 25, padding: "24px" }}>
                    <Title level={1} style={{ color: '#3498db', marginBottom: 32 }}>
                        Partner With Us
                    </Title>
                    <Carousel
                        autoplay
                        autoplaySpeed={2000}
                        dots
                        slidesToShow={3}
                        slidesToScroll={1}
                        infinite
                        style={{ padding: '40px', background: '#f9f9f9' }}
                    >
                        {partners.map((partner) => (
                            <Col style={{
                                borderRadius: '8px',
                                overflow: 'hidden',
                            }}>
                                <Title level={4} style={{ color: '#2c3e50', textAlign: "center", fontSize: "20px" }}>{partner.name}</Title>
                                <Row style={{ height: "350px", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <img src={partner.image} alt={partner.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "25px" }} />
                                </Row>
                            </Col>
                        ))}
                    </Carousel>
                </Col>
            </Col>
        </Row >
    );
}

export default HomePage;