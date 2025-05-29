import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Steps, message, Modal } from 'antd';
import {
    UserOutlined,
    SyncOutlined,
    SafetyOutlined,
    LoadingOutlined,
    FundOutlined,
    InfoCircleOutlined,
    AppleOutlined,
    HeartOutlined,
    DatabaseOutlined,
    CheckOutlined,
    CopyOutlined,
} from '@ant-design/icons';
import { User, Scale, Activity, Target, TrendingUp, Zap } from "lucide-react";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MyHealth from '../../../assets/photos/MyHealth.svg';
import '../../../assets/styles/healthPage.css';
import { auth } from '../../../api/authApi';

const { Title, Text } = Typography;

const MyHealthGuide: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('health');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [uidCopied, setUidCopied] = useState(false);
    const currentUser = auth.currentUser?.uid;

    const profileSteps = [
        { icon: <User className="w-4 h-4 text-green-500" />, key: 'ageGender' },
        { icon: <Scale className="w-4 h-4 text-green-500" />, key: 'heightWeight' },
        { icon: <Activity className="w-4 h-4 text-green-500" />, key: 'activityLevel' },
        { icon: <Target className="w-4 h-4 text-green-500" />, key: 'bodyFat' },
        { icon: <TrendingUp className="w-4 h-4 text-green-500" />, key: 'idealWeight' },
        { icon: <Zap className="w-4 h-4 text-green-500" />, key: 'dailyCalories' },
        { icon: <HeartOutlined className="w-4 h-4 text-green-500" />, key: 'exerciseGoal' },
        { icon: <FundOutlined />, key: 'step5' },
    ];

    const connectSteps = [
        { icon: <SafetyOutlined />, key: 'step1' },
        { icon: <SyncOutlined />, key: 'step2' },
        { icon: <DatabaseOutlined />, key: 'step3' },
        { icon: <LoadingOutlined />, key: 'step4' },
        { icon: <FundOutlined />, key: 'step5' },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setUidCopied(false);
    };

    const copyUid = () => {
        navigator.clipboard.writeText(currentUser || 'No UID found');
        setUidCopied(true);
        message.success('UID copied to clipboard!');
        setTimeout(() => setUidCopied(false), 2000);
    };

    return (
        <div className="guide-page">
            <div className="header-container">
                <p className="header-title">{t('healthGuide.guide.title')}</p>
                <img src={MyHealth} alt="" className="header-image" />
            </div>

            <div className="guides-container">
                <motion.div whileHover={{ y: -5 }} className="guide-card">
                    <div className="card-header">
                        <div className="icon-container">
                            <UserOutlined style={{ fontSize: '22px', color: 'white' }} />
                        </div>
                        <Title level={4} className="card-title">
                            {t('healthGuide.guide.profileTitle')}
                        </Title>
                    </div>
                    <div className="steps-container">
                        <p className="card-description">
                            {t('healthGuide.guide.profileDescription')}
                        </p>
                        <Steps direction="vertical" current={-1} size="small">
                            {profileSteps.map((step, index) => (
                                <Steps.Step
                                    key={index}
                                    title={step.key === 'step5'
                                        ? t('healthGuide.guide.completeProfile')
                                        : t(`healthGuide.guide.${step.key}`)}
                                    icon={step.icon}
                                />
                            ))}
                        </Steps>
                    </div>

                    <Button
                        type="primary"
                        size="small"
                        className="consult-button"
                        style={{ justifyContent: 'center', width: '100%', marginTop: 'auto' }}
                        onClick={() => navigate('/profile/user-info')}
                    >
                        {t('healthGuide.guide.completeProfile')}
                    </Button>

                    <div className="info-box">
                        <div className="info-header">
                            <InfoCircleOutlined className="info-icon" />
                            <Text strong>{t('healthGuide.guide.dataPrivacyTitle')}</Text>
                        </div>
                        <Text type="secondary" className="info-text">
                            {t('healthGuide.guide.dataPrivacyText')}
                            <a onClick={() => navigate('/about-us')} style={{ marginLeft: '4px' }}>
                                {t('healthGuide.guide.privacyPolicy')}
                            </a>
                        </Text>
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="guide-card">
                    <div className="card-header">
                        <div className="icon-container">
                            <SyncOutlined style={{ fontSize: '22px', color: 'white' }} />
                        </div>
                        <Title level={4} className="card-title">
                            {t('healthGuide.guide.connectHealthTitle')}
                        </Title>
                    </div>
                    <p className="card-description">
                        {t('healthGuide.guide.connectHealthDescription')}
                    </p>

                    <div className="steps-container">
                        <Steps direction="vertical" current={-1} size="small">
                            {connectSteps.map((step, index) => (
                                <Steps.Step
                                    key={index}
                                    title={t(`healthGuide.guide.${step.key}Title`)}
                                    description={t(`healthGuide.guide.${step.key}Description`)}
                                    icon={step.icon}
                                />
                            ))}
                        </Steps>
                    </div>

                    <Button
                        icon={<AppleOutlined />}
                        size="small"
                        type="primary"
                        className="consult-button"
                        onClick={showModal}
                        style={{ justifyContent: 'center', width: '100%', marginTop: 'auto' }}
                    >
                        {t('healthGuide.guide.connectButton')}
                    </Button>

                    <Modal
                        title={t('healthGuide.guide.connectModal.title')}
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="close" onClick={handleCancel}>
                                {t('healthGuide.guide.connectModal.closeButton')}
                            </Button>,
                        ]}
                        width={600}
                        // style={{ borderRadius: '15px !important' }}
                    >
                        <div className="modal-content">
                            <p className="modal-step-description">
                                {t('healthGuide.guide.connectModal.description')}
                            </p>

                            <div className="modal-steps-container">
                                <Steps direction="vertical" current={-1} size="small" className="modal-steps">
                                    <Steps.Step
                                        title={t('healthGuide.guide.connectModal.steps.download.title')}
                                        description={
                                            <div className="download-link-container">
                                                <a
                                                    href="https://www.icloud.com/shortcuts/e6269ab0fef447f498eeac823f764deb"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="download-link"
                                                >
                                                    {t('healthGuide.guide.connectModal.steps.download.linkText')}
                                                </a>
                                            </div>
                                        }
                                        icon={<SafetyOutlined />}
                                    />
                                    <Steps.Step
                                        title={t('healthGuide.guide.connectModal.steps.copyUid.title')}
                                        description={
                                            <div className="uid-container">
                                                <Text className="uid-text">{currentUser}</Text>
                                                <Button
                                                    icon={uidCopied ? <CheckOutlined /> : <CopyOutlined />}
                                                    size="small"
                                                    onClick={copyUid}
                                                >
                                                    {uidCopied
                                                        ? t('healthGuide.guide.connectModal.steps.copyUid.button.copied')
                                                        : t('healthGuide.guide.connectModal.steps.copyUid.button.copy')}
                                                </Button>
                                            </div>
                                        }
                                        icon={<SyncOutlined />}
                                    />
                                    <Steps.Step
                                        title={t('healthGuide.guide.connectModal.steps.runShortcut.title')}
                                        description={t('healthGuide.guide.connectModal.steps.runShortcut.description')}
                                        icon={<DatabaseOutlined />}
                                    />
                                    <Steps.Step
                                        title={t('healthGuide.guide.connectModal.steps.enjoy.title')}
                                        description={t('healthGuide.guide.connectModal.steps.enjoy.description')}
                                        icon={<FundOutlined />}
                                    />
                                </Steps>
                            </div>

                            <div className="modal-footer-note">
                                <InfoCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                                <Text type="secondary">
                                    {t('healthGuide.guide.connectModal.privacyNote')}
                                </Text>
                            </div>
                        </div>
                    </Modal>

                    <div className="info-box">
                        <div className="info-header">
                            <InfoCircleOutlined className="info-icon" />
                            <Text strong>{t('healthGuide.guide.dataPrivacyTitle')}</Text>
                        </div>
                        <Text type="secondary" className="info-text">
                            {t('healthGuide.guide.dataPrivacyText')}
                            <a onClick={() => navigate('/about-us')} style={{ marginLeft: '4px' }}>
                                {t('healthGuide.guide.privacyPolicy')}
                            </a>
                        </Text>
                    </div>
                </motion.div>
            </div>
        </div >
    );
};

export default MyHealthGuide;