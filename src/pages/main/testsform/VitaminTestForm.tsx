import {
  Button,
  Form,
  InputNumber,
  message,
  Typography,
  Card,
  Row,
  Col,
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { saveTestData, setTestData } from '../../../app/slices/testSlice';
import type { VitaminTestFormValues } from '../../../app/slices/testSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../api/authApi';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const VitaminTestForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.vitaminTestData || undefined;
  const { t } = useTranslation();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const vitaminTestFields = [
    {
      label: t('vitaminTest.vitaminA'),
      name: 'vitaminA',
      min: 10,
      max: 80,
      step: 1,
      unit: 'mcg/dL',
      placeholder: t('vitaminTest.vitaminAPlaceholder'),
    },
    {
      label: t('vitaminTest.vitaminB12'),
      name: 'vitaminB12',
      min: 200,
      max: 900,
      step: 1,
      unit: 'pg/mL',
      placeholder: t('vitaminTest.vitaminB12Placeholder'),
    },
    {
      label: t('vitaminTest.vitaminC'),
      name: 'vitaminC',
      min: 0.2,
      max: 2.0,
      step: 0.1,
      unit: 'mg/dL',
      placeholder: t('vitaminTest.vitaminCPlaceholder'),
    },
    {
      label: t('vitaminTest.vitaminD'),
      name: 'vitaminD',
      min: 10,
      max: 100,
      step: 1,
      unit: 'ng/mL',
      placeholder: t('vitaminTest.vitaminDPlaceholder'),
    },
    {
      label: t('vitaminTest.vitaminE'),
      name: 'vitaminE',
      min: 5,
      max: 20,
      step: 0.1,
      unit: 'mg/L',
      placeholder: t('vitaminTest.vitaminEPlaceholder'),
    },
    {
      label: t('vitaminTest.vitaminK'),
      name: 'vitaminK',
      min: 0.1,
      max: 3.2,
      step: 0.1,
      unit: 'ng/mL',
      placeholder: t('vitaminTest.vitaminKPlaceholder'),
    },
  ];

  const onFinish = async (values: VitaminTestFormValues) => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      message.error(t('vitaminTest.notAuthenticated'));
      return;
    }

    const testData = { ...values, date: new Date().toISOString() };
    await dispatch(saveTestData({ uid, testType: 'vitamin', data: testData }));

    dispatch(setTestData({ testType: 'vitamin', data: testData }));

    if (updatedData) {
      message.success(t('vitaminTest.updateSuccess'));
    } else {
      message.success(t('vitaminTest.success'));
    }

    setTimeout(() => {
      navigate('/profile/analysis-history');
    }, 1000);
  };

  return (
    <Card
      style={{ border: 'none' }}
      title={
        <Title level={3} className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('vitaminTest.title')}
        </Title>
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        initialValues={updatedData}
      >
        <Row gutter={[24, 16]}>
          {vitaminTestFields.map((field) => (
            <Col span={12} key={field.name}>
              <Form.Item
                label={
                  <span
                    className={`input-item ${isDarkMode ? 'dark' : ''}`}
                  >{`${field.label} (${field.unit})`}</span>
                }
                name={field.name}
                rules={[{ required: true }]}
              >
                <InputNumber
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

        <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            {updatedData ? t('vitaminTest.update') : t('vitaminTest.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default VitaminTestForm;
