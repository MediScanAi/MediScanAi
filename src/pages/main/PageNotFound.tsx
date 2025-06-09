import React from 'react';
import { Result, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import '../../assets/styles/pages/PageNotFound.css';
import PrimaryButton from '../../components/common/buttons/PrimaryButton';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const { t } = useTranslation('pageNotFound');

  return (
    <div className={`page-not-found ${theme ? 'dark' : ''}`}>
      <Result
        status="404"
        title={<Text className="page-not-found-title">404</Text>}
        subTitle={
          <Text className="page-not-found-subtitle">
            {t('pageNotFound.subtitle')}
          </Text>
        }
        extra={
          <Space>
            <PrimaryButton onClick={() => navigate('/')}>
              {t('pageNotFound.returnHome')}
            </PrimaryButton>
          </Space>
        }
      />
    </div>
  );
};

export default PageNotFound;
