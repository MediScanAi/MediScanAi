import React from 'react';
import { Button, Result, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const { Text } = Typography;

const PageNotFound: React.FC = () => {
    const navigate = useNavigate();
    const theme = useAppSelector((state) => state.theme.isDarkMode);

    return (
        <div
            className={theme ? 'dark-theme' : ''}
        >
            <Result
                status="404"
                title={
                    <Text
                        style={{
                            fontSize: '48px',
                            fontWeight: 700,
                            color: theme ? 'white' : 'black',
                        }}
                    >
                        404
                    </Text>
                }
                subTitle={
                    <Text
                        style={{
                            fontSize: '20px',
                            color: '#8b949e',
                        }}
                    >
                        Oops! The page you're looking for doesn't exist.
                    </Text>
                }
                extra={
                    <Space>
                        <Button
                            type="primary"
                            size="large"
                            style={{
                                height: '50px',
                                padding: '0 40px',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: '25px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                background: 'linear-gradient(45deg, #1890ff, #0052d9)',
                                border: 'none',
                            }}
                            onClick={() => navigate('/')}
                        >
                            Return Home
                        </Button>
                    </Space>
                }
            />
        </div >
    );
};

export default PageNotFound;