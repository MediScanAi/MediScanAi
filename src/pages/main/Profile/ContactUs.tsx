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
    width?: number;
}

const ContactUs: React.FC<ContactUsProps> = ({theme,width}) => {
    const fontSize = width && width<1200?'12px':'16px';
    return (
        <div style={{minHeight: '40vh'}}>
            <Card
                title={
                    <Title className={theme?'dark-mode-text':''} level={2} style={{marginBottom: 0, color: '#3498db',fontSize:(width || 1200)<1200?20:30}}>
                        Contact Us
                    </Title>
                }
                variant={'borderless'}
                headStyle={{marginBottom:15}}
                style={{borderRadius: '12px', backgroundColor: 'transparent'}}

            >
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''}  style={{fontSize: fontSize}}>
                            <PhoneOutlined style={{marginRight: 8}}/>
                            Phone: +1234567890
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''} style={{fontSize: fontSize}}>
                            <MailOutlined style={{marginRight: 8}}/>
                            Email: <a href="mailto:mediscan@center.com">mediscan@center.com</a>
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''} style={{fontSize: fontSize}}>
                            <EnvironmentOutlined style={{marginRight: 8}}/>
                            Address: 123 Main St, Anytown, USA
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''} style={{fontSize: fontSize}}>
                            <ClockCircleOutlined style={{marginRight: 8}}/>
                            Hours: Mon - Fri: 9:00 AM - 5:00 PM
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={theme?'dark-mode-text':''} style={{fontSize: fontSize}}>
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
