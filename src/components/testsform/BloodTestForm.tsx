import { Form, message, Card, Typography, Row, Col } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { saveTestData, setTestData } from '../../app/slices/testSlice';
import type { BloodTestFormValues } from '../../app/slices/testSlice';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../api/authApi';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/components/form-wrapper.css';
import PrimaryButton from '../common/buttons/PrimaryButton';
import NumberInput from '../common/inputs/NumberInput';

const { Title } = Typography;

function BloodTestsForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.bloodTestData || undefined;
  const { t } = useTranslation('bloodTest');
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const bloodTestFields = [
    {
      name: 'hemoglobin',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('bloodTest.hemoglobin')}
        </span>
      ),
      min: 0,
      max: 25,
      step: 0.1,
      placeholder: t('bloodTest.bloodTesthemoglobinPlaceholder'),
    },
    {
      name: 'wbc',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('bloodTest.wbc')}
        </span>
      ),
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: t('bloodTest.bloodTestwbcPlaceholder'),
    },
    {
      name: 'rbc',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('bloodTest.rbc')}
        </span>
      ),
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: t('bloodTest.bloodTestrbcPlaceholder'),
    },
    {
      name: 'platelets',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('bloodTest.platelets')}
        </span>
      ),
      min: 0,
      max: 1000,
      step: 1,
      placeholder: t('bloodTest.bloodTestplateletsPlaceholder'),
    },
    {
      name: 'glucose',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('bloodTest.glucose')}
        </span>
      ),
      min: 50,
      max: 500,
      step: 1,
      placeholder: t('bloodTest.bloodTestglucosePlaceholder'),
    },
    {
      name: 'cholesterol',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('bloodTest.cholesterol')}
        </span>
      ),
      min: 50,
      max: 400,
      step: 1,
      placeholder: t('bloodTest.bloodTestcholesterolPlaceholder'),
    },
  ];

  const onFinish = async (values: BloodTestFormValues) => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      message.error(t('errors.userNotAuthenticated'));
      return;
    }
    const testData = { ...values, date: new Date().toISOString() };
    await dispatch(saveTestData({ uid, testType: 'blood', data: testData }));

    dispatch(setTestData({ testType: 'blood', data: testData }));

    if (updatedData) {
      message.success(t('bloodTest.bloodTestupdate'));
    } else {
      message.success(t('bloodTest.bloodTestsubmit'));
    }

    setTimeout(() => {
      navigate('/profile/analysis-history');
    }, 1000);
  };

  return (
    <Card
      className="test-card"
      title={
        <Title level={3} className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('bloodTest.bloodTest')}
        </Title>
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={updatedData}
        layout="vertical"
        size="large"
      >
        <Row gutter={[24, 16]}>
          {bloodTestFields.map((field) => (
            <Col span={12} key={field.name}>
              <Form.Item
                label={field.label}
                name={field.name}
                rules={[{ required: true }]}
                className={`input-item  ${isDarkMode ? 'dark' : ''}`}
              >
                <NumberInput
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  style={{ width: '100%' }}
                  placeholder={field.placeholder}
                />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item className="genetic-form-item">
          <PrimaryButton type="primary" htmlType="submit">
            {updatedData ? t('bloodTest.update') : t('bloodTest.submit')}
          </PrimaryButton>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default BloodTestsForm;
