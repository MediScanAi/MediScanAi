import {Card, Typography, Row, Col} from 'antd';
import React from 'react';
import {
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';

const {Title, Text} = Typography;

interface ContactUsProps {
    theme: boolean;
}

const ContactUs: React.FC<ContactUsProps> = ({theme}) => {
    return (
        <div style={{minHeight: '50vh'}}>
            <Card
                title={
                    <Title className={theme?'dark-mode-text':''} level={2} style={{marginBottom: 0, color: '#3498db'}}>
                        Contact Us
                    </Title>
                }
                variant={'borderless'}
                style={{borderRadius: '12px', backgroundColor: 'transparent'}}
            >

                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''}  style={{fontSize: 16}}>
                            <PhoneOutlined style={{marginRight: 8}}/>
                            Phone: +1234567890
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''} style={{fontSize: 16}}>
                            <MailOutlined style={{marginRight: 8}}/>
                            Email: <a href="mailto:mediscan@center.com">mediscan@center.com</a>
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''} style={{fontSize: 16}}>
                            <EnvironmentOutlined style={{marginRight: 8}}/>
                            Address: 123 Main St, Anytown, USA
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''} style={{fontSize: 16}}>
                            <ClockCircleOutlined style={{marginRight: 8}}/>
                            Hours: Mon - Fri: 9:00 AM - 5:00 PM
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''} style={{fontSize: 16}}>
                            <LinkedinOutlined style={{marginRight: 8}}/>
                            LinkedIn:{' '}
                            <a
                                href="https://www.linkedin.com/company/mediscan-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Mediscan Center
                            </a>
                        </Text>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ContactUs;
