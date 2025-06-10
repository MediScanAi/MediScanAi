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
 const {t} = useTranslation('health');
 return <Modal
 title={t('healthGuide.guide.connectModal.title')}
 open={isModalVisible}
 onCancel={handleCancelModal}
 footer={[
   <Button key="close" onClick={handleCancelModal}>
        {t('healthGuide.guide.connectModal.closeButton')}
      </Button>,
    ]}
    width={600}
    className="modal-container"
    >
    <div className="modal-content">
      <p className="modal-step-description">
        {t('healthGuide.guide.connectModal.description')}
      </p>

      <div className="modal-steps-container">
        <Steps
          direction="vertical"
          current={-1}
          size="small"
          className="modal-steps"
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
                  className="download-link"
                  >
                  {t('healthGuide.guide.connectModal.steps.download.linkText')}
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
                <Text className="uid-text">{currentUser}</Text>
                <Button
                  icon={uidCopied ? <CheckOutlined /> : <CopyOutlined />}
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
            title={t('healthGuide.guide.connectModal.steps.runShortcut.title')}
            description={t(
              'healthGuide.guide.connectModal.steps.runShortcut.description'
            )}
            icon={<DatabaseOutlined className="text-white" />}
            />
          <Steps.Step
            title={t('healthGuide.guide.connectModal.steps.enjoy.title')}
            description={t(
              'healthGuide.guide.connectModal.steps.enjoy.description'
            )}
            icon={<FundOutlined className="text-white" />}
            />
        </Steps>
      </div>
    </div>
  </Modal>
};

export default ExportDataModal;
