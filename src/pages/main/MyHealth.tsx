import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Descriptions } from 'antd';

const { Title, Text } = Typography;

const HealthPage: React.FC = () => {
    const { state }: { state: { [key: string]: string } } = useLocation();
    const [dba, setDba] = useState<number | null>(null);

    useEffect(() => {
        if (state) {
            const weight = parseFloat(state.weight);
            const height = parseFloat(state.height) / 100;

            if (weight > 0 && height > 0) {
                const bmi = weight / (height * height);
                setDba(Number(bmi.toFixed(1)));
            }
        }
    }, [state]);

    return (
        <div style={{ padding: 24 }}>
            <Title level={3} style={{ color: '#2c3e50' }}>
                Health Result Page
            </Title>

            <Descriptions bordered column={1}>
                <Descriptions.Item label="Name">{state?.name}</Descriptions.Item>
                <Descriptions.Item label="Surname">{state?.surname}</Descriptions.Item>
                <Descriptions.Item label="Email">{state?.email}</Descriptions.Item>
                <Descriptions.Item label="Age">{state?.age}</Descriptions.Item>
                <Descriptions.Item label="Sex">{state?.sex}</Descriptions.Item>
                <Descriptions.Item label="Weight">{state?.weight} kg</Descriptions.Item>
                <Descriptions.Item label="Height">{state?.height} cm</Descriptions.Item>
                <Descriptions.Item label="Blood Pressure">{state?.bloodPressure}</Descriptions.Item>
                <Descriptions.Item label="Heart Rate">{state?.heartRate}</Descriptions.Item>
                <Descriptions.Item label="Calculated DBA">
                    {dba !== null ? (
                        <Text strong style={{ color: '#27ae60' }}>{dba}</Text>
                    ) : (
                        <Text type="secondary">Unable to calculate</Text>
                    )}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default HealthPage;
