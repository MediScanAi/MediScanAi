import React from 'react';
import { Modal, Button, Steps, Typography } from 'antd';
import {
  SafetyOutlined,
  SyncOutlined,
  DatabaseOutlined,
  FundOutlined,
  CheckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import '../../assets/styles/components/health/export-data-modal.css';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/hooks';
import SecondaryButton from '../common/buttons/SecondaryButton';
const { Text } = Typography;

type Props = {
  isModalVisible: boolean;
  handleCancelModal: () => void;
  currentUser: string | undefined;
  uidCopied: boolean;
  copyUid: () => void;
};

const ExportDataModal: React.FC<Props> = ({
  isModalVisible,
  handleCancelModal,
  currentUser,
  uidCopied,
  copyUid,
}) => {
  const { t } = useTranslation('health');
  const isDarkMode = useAppSelector((s) => s.theme.isDarkMode);

  return (
    <Modal
      title={t('healthGuide.guide.connectModal.title')}
      open={isModalVisible}
      onCancel={handleCancelModal}
      footer={[
        <SecondaryButton key="close" onClick={handleCancelModal}>
          {t('healthGuide.guide.connectModal.closeButton')}
        </SecondaryButton>,
      ]}
      width={600}
      className={`modal-container${isDarkMode ? ' dark' : ''}`}
    >
      <div className="modal-content">
        <p className={`modal-step-description${isDarkMode ? ' dark' : ''}`}>
          {t('healthGuide.guide.connectModal.description')}
        </p>

        <div className="modal-steps-container">
          <Steps
            direction="vertical"
            current={-1}
            size="small"
            className={`modal-steps${isDarkMode ? ' dark' : ''}`}
          >
            <Steps.Step
              title={t('healthGuide.guide.connectModal.steps.download.title')}
              className="modal-step"
              description={
                <div className="download-link-container">
                  <a
                    href="https://www.icloud.com/shortcuts/e6269ab0fef447f498eeac823f764deb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`download-link${isDarkMode ? ' dark' : ''}`}
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
              title={t('healthGuide.guide.connectModal.steps.copyUid.title')}
              className="modal-step"
              description={
                <div className="uid-container">
                  <Text className={`uid-text${isDarkMode ? ' dark' : ''}`}>
                    {currentUser}
                  </Text>
                  <SecondaryButton
                    icon={uidCopied ? <CheckOutlined /> : <CopyOutlined />}
                    size="middle"
                    onClick={copyUid}
                    className='copy-uid-button'
                  >
                    {uidCopied
                      ? t(
                          'healthGuide.guide.connectModal.steps.copyUid.button.copied'
                        )
                      : t(
                          'healthGuide.guide.connectModal.steps.copyUid.button.copy'
                        )}
                  </SecondaryButton>
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
              className='modal-step'
              icon={<DatabaseOutlined className="text-white" />}
            />
            <Steps.Step
              title={t('healthGuide.guide.connectModal.steps.enjoy.title')}
              description={t(
                'healthGuide.guide.connectModal.steps.enjoy.description'
              )}
              className='modal-step'
              icon={<FundOutlined className="text-white" />}
            />
          </Steps>
        </div>
      </div>
    </Modal>
  );
};

export default ExportDataModal;
