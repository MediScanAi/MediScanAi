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
import { User, Scale, Activity, Target, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MyHealth from '../../assets/photos/MyHealth.svg';
import MyHealthDark from '../../assets/photos/MyHealthDark.svg';
import '../../assets/styles/pages/health-guide-page.css';
import { auth } from '../../api/authApi';
import type { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../components/common/buttons/PrimaryButton';

const { Title, Text } = Typography;

const MyHealthGuide: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('health');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uidCopied, setUidCopied] = useState(false);
  const currentUser = auth.currentUser?.uid;
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const profileSteps = [
    { icon: <User className={`lucide-user ${isDarkMode ? 'dark' : ''}`} />, key: 'ageGender' },
    { icon: <Scale className={`lucide-scale ${isDarkMode ? 'dark' : ''}`} />, key: 'heightWeight' },
    {
      icon: <Activity className={`lucide-activity ${isDarkMode ? 'dark' : ''}`} />,
      key: 'activityLevel',
    },
    { icon: <Target className={`lucide-target ${isDarkMode ? 'dark' : ''}`} />, key: 'bodyFat' },
    {
      icon: <TrendingUp className={`lucide-trending-up ${isDarkMode ? 'dark' : ''}`} />,
      key: 'idealWeight',
    },
    { icon: <Zap className={`lucide-zap ${isDarkMode ? 'dark' : ''}`} />, key: 'dailyCalories' },
    {
      icon: <HeartOutlined className={`lucide-heart ${isDarkMode ? 'dark' : ''}`} />,
      key: 'exerciseGoal',
    },
    { icon: <FundOutlined className={`lucide-fund ${isDarkMode ? 'dark' : ''}`} />, key: 'step5' },
  ];

  const connectSteps = [
    { icon: <SafetyOutlined className={`lucide-safety ${isDarkMode ? 'dark' : ''}`} />, key: 'step1' },
    { icon: <SyncOutlined className={`lucide-sync ${isDarkMode ? 'dark' : ''}`} />, key: 'step2' },
    { icon: <DatabaseOutlined className={`lucide-database ${isDarkMode ? 'dark' : ''}`} />, key: 'step3' },
    { icon: <LoadingOutlined className={`lucide-loading ${isDarkMode ? 'dark' : ''}`} />, key: 'step4' },
    { icon: <FundOutlined className={`lucide-fund ${isDarkMode ? 'dark' : ''}`} />, key: 'step5' },
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
    <div className={`guide-page ${isDarkMode ? 'dark' : ''}`}>
      <div className="header-container">
        <p className={`header-title ${isDarkMode ? 'dark' : ''}`}>
          {t('healthGuide.guide.title')}
        </p>
        <img
          draggable={false}
          src={isDarkMode ? MyHealthDark : MyHealth}
          alt=""
          className="header-image"
        />
      </div>
      <div className="guides-container">
        <motion.div
          whileHover={{ y: -5 }}
          className={`guide-card ${isDarkMode ? 'dark' : ''}`}
        >
          <div className="card-header">
            <div className="icon-container">
              <UserOutlined style={{ fontSize: '22px', color: 'white' }} />
            </div>
            <Title
              level={4}
              className={`card-title ${isDarkMode ? 'dark' : ''}`}
            >
              {t('healthGuide.guide.profileTitle')}
            </Title>
          </div>
          <div className="steps-container">
            <p className={`card-description ${isDarkMode ? 'dark' : ''}`}>
              {t('healthGuide.guide.profileDescription')}
            </p>
            <Steps direction="vertical" current={-1} size="small">
              {profileSteps.map((step, index) => (
                <Steps.Step
                  key={index}
                  title={
                    <span className={`step-title ${isDarkMode ? 'dark' : ''}`}>
                      {step.key === 'step5'
                        ? t('healthGuide.guide.completeProfile')
                        : t(`healthGuide.guide.${step.key}`)}
                    </span>
                  }
                  icon={step.icon}
                />
              ))}
            </Steps>
          </div>

          <div className="button-container">
            <PrimaryButton
              className="guide-button"
              onClick={() => navigate('/profile/info')}
            >
              {t('healthGuide.guide.completeProfile')}
            </PrimaryButton>
          </div>
          <div className={`info-box ${isDarkMode ? 'dark' : ''}`}>
            <div className={`info-header ${isDarkMode ? 'dark' : ''}`}>
              <InfoCircleOutlined className="info-icon" />
              <Text
                className={`info-header-text ${isDarkMode ? 'dark' : ''}`}
                strong
              >
                {t('healthGuide.guide.dataPrivacyTitle')}
              </Text>
            </div>
            <Text
              type="secondary"
              className={`info-text ${isDarkMode ? 'dark' : ''}`}
            >
              {t('healthGuide.guide.dataPrivacyText')}
              <a
                onClick={() => navigate('/about-us')}
                style={{ marginLeft: '4px' }}
              >
                {t('healthGuide.guide.privacyPolicy')}
              </a>
            </Text>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className={`guide-card ${isDarkMode ? 'dark' : ''}`}
        >
          <div className="card-header">
            <div className="icon-container">
              <SyncOutlined style={{ fontSize: '22px', color: 'white' }} />
            </div>
            <Title
              level={4}
              className={`card-title ${isDarkMode ? 'dark' : ''}`}
            >
              {t('healthGuide.guide.connectHealthTitle')}
            </Title>
          </div>
          <p className={`card-description ${isDarkMode ? 'dark' : ''}`}>
            {t('healthGuide.guide.connectHealthDescription')}
          </p>

          <div className="steps-container">
            <Steps direction="vertical" current={-1} size="small">
              {connectSteps.map((step, index) => (
                <Steps.Step
                  key={index}
                  title={
                    <span className={`step-title ${isDarkMode ? 'dark' : ''}`}>
                      {t(`healthGuide.guide.${step.key}Title`)}
                    </span>
                  }
                  description={
                    <span
                      className={`step-description ${isDarkMode ? 'dark' : ''}`}
                    >
                      {t(`healthGuide.guide.${step.key}Description`)}
                    </span>
                  }
                  icon={step.icon}
                />
              ))}
            </Steps>
          </div>

          <PrimaryButton icon={<AppleOutlined />} onClick={showModal}>
            {t('healthGuide.guide.connectButton')}
          </PrimaryButton>

          <Modal
            title={t('healthGuide.guide.connectModal.title')}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="close" onClick={handleCancel}>
                {t('healthGuide.guide.connectModal.closeButton')}
              </Button>,
            ]}
            width={600}
            className={`modal-container ${isDarkMode ? 'dark' : ''}`}
          >
            <div className={`modal-content ${isDarkMode ? 'dark' : ''}`}>
              <p
                className={`modal-step-description ${isDarkMode ? 'dark' : ''}`}
              >
                {t('healthGuide.guide.connectModal.description')}
              </p>

              <div
                className={`modal-steps-container ${isDarkMode ? 'dark' : ''}`}
              >
                <Steps
                  direction="vertical"
                  current={-1}
                  size="small"
                  className={`modal-steps ${isDarkMode ? 'dark' : ''}`}
                >
                  <Steps.Step
                    title={t(
                      'healthGuide.guide.connectModal.steps.download.title'
                    )}
                    className={`modal-step ${isDarkMode ? 'dark' : ''}`}
                    description={
                      <div className="download-link-container">
                        <a
                          href="https://www.icloud.com/shortcuts/803c34db628144028b7af3529bab00d2"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="download-link"
                        >
                          {t(
                            'healthGuide.guide.connectModal.steps.download.linkText'
                          )}
                        </a>
                      </div>
                    }
                    icon={<SafetyOutlined className="text-white" />}
                  />
                  <Steps.Step
                    title={t(
                      'healthGuide.guide.connectModal.steps.copyUid.title'
                    )}
                    className={`modal-step ${isDarkMode ? 'dark' : ''}`}
                    description={
                      <div className="uid-container">
                        <Text className="uid-text">{currentUser}</Text>
                        <Button
                          icon={
                            uidCopied ? <CheckOutlined /> : <CopyOutlined />
                          }
                          size="small"
                          onClick={copyUid}
                        >
                          {uidCopied
                            ? t(
                                'healthGuide.guide.connectModal.steps.copyUid.button.copied'
                              )
                            : t(
                                'healthGuide.guide.connectModal.steps.copyUid.button.copy'
                              )}
                        </Button>
                      </div>
                    }
                    icon={<SyncOutlined className="text-white" />}
                  />
                  <Steps.Step
                    title={t(
                      'healthGuide.guide.connectModal.steps.runShortcut.title'
                    )}
                    description={t(
                      'healthGuide.guide.connectModal.steps.runShortcut.description'
                    )}
                    icon={<DatabaseOutlined className="text-white" />}
                  />
                  <Steps.Step
                    title={t(
                      'healthGuide.guide.connectModal.steps.enjoy.title'
                    )}
                    description={t(
                      'healthGuide.guide.connectModal.steps.enjoy.description'
                    )}
                    icon={<FundOutlined className="text-white" />}
                  />
                </Steps>
              </div>

              <div className="modal-footer-note">
                <InfoCircleOutlined className={`info-circle ${isDarkMode ? 'dark' : ''}`} />
                &nbsp;
                <Text type="secondary">
                  {t('healthGuide.guide.connectModal.privacyNote')}
                </Text>
              </div>
            </div>
          </Modal>

          <div className={`info-box ${isDarkMode ? 'dark' : ''}`}>
            <div className={`info-header ${isDarkMode ? 'dark' : ''}`}>
              <InfoCircleOutlined className="info-icon" />
              <Text
                className={`info-header-text ${isDarkMode ? 'dark' : ''}`}
                strong
              >
                {t('healthGuide.guide.dataPrivacyTitle')}
              </Text>
            </div>
            <Text
              type="secondary"
              className={`info-text ${isDarkMode ? 'dark' : ''}`}
            >
              {t('healthGuide.guide.dataPrivacyText')}
              <a onClick={() => navigate('/about-us')} className="text-a">
                {t('healthGuide.guide.privacyPolicy')}
              </a>
            </Text>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyHealthGuide;
