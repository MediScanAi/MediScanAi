import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Descriptions, Card, Row, Col, Button, Divider, Tag, Space, Avatar, Spin } from 'antd';
import {
    SmileOutlined,
    WarningOutlined,
    FrownOutlined,
} from '@ant-design/icons';
import marduk from '../../assets/photos/marduk.webp';
import '../../assets/styles/healthPage.css';
import { motion } from 'framer-motion';
const { Title, Text, Paragraph } = Typography;

const HealthPage: React.FC = () => {
    const { state }: { state: { [key: string]: string } } = useLocation();
    const [bmi, setBmi] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (state) {
                const weight = parseFloat(state.weight);
                const height = parseFloat(state.height) / 100;

                if (weight > 0 && height > 0) {
                    const calculatedBmi = weight / (height * height);
                    setBmi(Number(calculatedBmi.toFixed(1)));
                }
            }
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [state]);

    const renderBmiStatus = () => {
        if (bmi === null) return null;

        const getBmiColor = () => {
            if (bmi < 18.5) return '#FFD700';
            if (bmi >= 18.5 && bmi <= 24.9) return '#52C41A';
            if (bmi >= 25 && bmi <= 29.9) return '#FA8C16';
            return '#F5222D';
        };

        return (
            <div className="bmi-container">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                    }}
                    className="bmi-badge"
                    style={{ backgroundColor: getBmiColor() }}
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Title level={2} style={{ color: 'white', margin: 0 }}>
                            {bmi}
                        </Title>
                        <Text strong style={{ color: 'white' }}>
                            BMI
                        </Text>
                    </motion.div>
                </motion.div>
            </div>
        );
    };

    const renderSuggestions = () => {
        if (bmi === null) return null;

        if (bmi < 18.5) {
            return (
                <Space direction="vertical" size="middle" className="suggestion-item">
                    <Tag icon={<WarningOutlined />} color="gold" className="suggestions-tag">Underweight</Tag>
                    <Text className="suggestions-text">
                        Your BMI is below normal. Make sure you're eating balanced meals rich in nutrients. Consider speaking with a nutritionist.
                    </Text>
                </Space>
            );
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return (
                <Space direction="vertical" size="middle" className="suggestion-item">
                    <Tag icon={<SmileOutlined />} color="green" className="suggestions-tag">Healthy</Tag>
                    <Text className="suggestions-text">
                        Great job! Maintain your current habits of balanced eating and regular exercise.
                    </Text>
                </Space>
            );
        } else if (bmi >= 25 && bmi <= 29.9) {
            return (
                <Space direction="vertical" size="middle" className="suggestion-item">
                    <Tag icon={<WarningOutlined />} color="orange" className="suggestions-tag">Overweight</Tag>
                    <Text className="suggestions-text">
                        Try incorporating more physical activity and reducing high-calorie food. A fitness coach might be helpful.
                    </Text>
                </Space>
            );
        } else {
            return (
                <Space direction="vertical" size="middle" className="suggestion-item">
                    <Tag icon={<FrownOutlined />} color="red" className="suggestions-tag">Obese</Tag>
                    <Text className="suggestions-text">
                        It's important to take action now. Please consult with a healthcare provider to create a weight-loss plan that fits your body.
                    </Text>
                </Space>
            );
        }
    };

    const renderHeartAndPressureAdvice = () => {
        if (!state) return null;

        const heartRate = parseInt(state.heartRate);
        const [systolic, diastolic] = state.bloodPressure.split('/').map(Number);

        const heartAdvice = () => {
            if (heartRate < 60) {
                return <Text className="heart-advice warning-text">Your heart rate is too low (bradycardia). Please consult with a healthcare provider.</Text>;
            } else if (heartRate > 100) {
                return <Text className="heart-advice danger-text">Your heart rate is too high (tachycardia). Please consult with a healthcare provider.</Text>;
            } else {
                return <Text className="heart-advice success-text">Your heart rate is within the normal range. Continue to maintain a healthy lifestyle.</Text>;
            }
        };

        const pressureAdvice = () => {
            if (systolic > 130 || diastolic > 80) {
                return <Text className="pressure-advice danger-text">Your blood pressure is too high. It is recommended to reduce salt consumption and monitor your weight.</Text>;
            } else if (systolic < 90 || diastolic < 60) {
                return <Text className="pressure-advice warning-text">Your blood pressure is too low. Please eat healthy and drink a lot of water.</Text>;
            } else {
                return <Text className="pressure-advice success-text">Your blood pressure is normal. Continue to follow your health.</Text>;
            }
        };

        return (
            <Space direction="vertical" size="large" className="advice-container">
                {heartAdvice()}
                {pressureAdvice()}
            </Space>
        );
    };

    const renderWeightAdvice = () => {
        if (!state) return null;

        const weight = parseFloat(state.weight);

        if (weight < 45) {
            return (
                <Text className="weight-advice warning-text">
                    Your weight is too low. It is recommended to increase your calorie-rich healthy diet, such as fruits, vegetables, nuts, and other foods.
                </Text>
            );
        } else if (weight > 100) {
            return (
                <Text className="weight-advice danger-text">
                    Your weight is too high. It is recommended to limit high-calorie and fatty foods and increase physical activity.
                </Text>
            );
        } else {
            return (
                <Text className="weight-advice success-text">
                    Your weight is within the acceptable range. Continue to follow a balanced diet.
                </Text>
            );
        }
    };

    if (!state) {
        return (
            <div className="empty-container">
                <Title level={2} className="centered-title">Welcome to the Health Page</Title>
                <Paragraph className="empty-message">Please fill out your health information to receive a detailed report.</Paragraph>
                <Button className="empty-button" type="primary" size="large" onClick={() => navigate('/profile/user-info')}>
                    Go to Profile
                </Button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="loading-container">
                <Spin size="large" className="loading-spinner" />
                <Title level={3} className="loading-title">Analyzing Your Health Data...</Title>
                <Text className="loading-subtitle">We're preparing your personalized health report</Text>
            </div>
        );
    }

    return (
        <div className="health-container">
            <Row justify="center" className="header-row">
                <Col span={24}>
                    <Title level={2} className="centered-title">
                        Your Health Dashboard
                    </Title>
                    <div className="metrics-container">
                        {renderBmiStatus()}
                    </div>
                </Col>
            </Row>

            <Row className="health-content" gutter={[32, 32]}>
                <Col xs={24} md={14}>
                    <Card className="health-card">
                        <div className="section">
                            <Title level={4} className="section-title">Personal Information</Title>
                            <Descriptions bordered column={1} className="health-descriptions">
                                <Descriptions.Item label="Weight">{state.weight} kg</Descriptions.Item>
                                <Descriptions.Item label="Height">{state.height} cm</Descriptions.Item>
                                <Descriptions.Item label="Blood Pressure">{state.bloodPressure}</Descriptions.Item>
                                <Descriptions.Item label="Heart Rate">{state.heartRate} bpm</Descriptions.Item>
                            </Descriptions>
                        </div>

                        <div className="section">
                            <Title level={4} className="section-title">Health Metrics</Title>

                            <div className="suggestions-box">
                                {renderSuggestions()}
                            </div>
                        </div>

                        <div className="section">
                            <Title level={4} className="section-title">Health Recommendations</Title>
                            <div className="recommendations">
                                {renderHeartAndPressureAdvice()}
                                <Divider className="divider" />
                                {renderWeightAdvice()}
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={10}>
                    <Card className="visual-card">
                        <img src={marduk} alt="health visualization" className="health-image" />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HealthPage;