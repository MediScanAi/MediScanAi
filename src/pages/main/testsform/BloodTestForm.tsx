import {
  Button,
  Form,
  InputNumber,
  message,
  Card,
  Typography,
  Row,
  Col,
} from 'antd';
import { useAppDispatch } from '../../../app/hooks';
import { saveTestData, setTestData } from '../../../app/slices/testSlice';
import type { BloodTestFormValues } from '../../../app/slices/testSlice';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../api/authApi';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

function BloodTestsForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.bloodTestData || undefined;
  const { t } = useTranslation();

  const bloodTestFields = [
    {
      name: 'hemoglobin',
      label: t('bloodTest.hemoglobin'),
      min: 0,
      max: 25,
      step: 0.1,
      placeholder: t('bloodTest.bloodTesthemoglobinPlaceholder'),
    },
    {
      name: 'wbc',
      label: t('bloodTest.wbc'),
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: t('bloodTest.bloodTestwbcPlaceholder'),
    },
    {
      name: 'rbc',
      label: t('bloodTest.rbc'),
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: t('bloodTest.bloodTestrbcPlaceholder'),
    },
    {
      name: 'platelets',
      label: t('bloodTest.platelets'),
      min: 0,
      max: 1000,
      step: 1,
      placeholder: t('bloodTest.bloodTestplateletsPlaceholder'),
    },
    {
      name: 'glucose',
      label: t('bloodTest.glucose'),
      min: 50,
      max: 500,
      step: 1,
      placeholder: t('bloodTest.bloodTestglucosePlaceholder'),
    },
    {
      name: 'cholesterol',
      label: t('bloodTest.cholesterol'),
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
      message.success(t('messages.bloodTestUpdated'));
    } else {
      message.success(t('messages.bloodTestSubmitted'));
    }

    setTimeout(() => {
      navigate('/profile/analysis-history');
    }, 1000);
  };

  return (
    <Card
      style={{ border: 'none' }}
      title={<Title level={3}>{t('rootform.blood')}</Title>}
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
                rules={[{ required: true, message: t('forms.required') }]}
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
            {updatedData ? t('bloodTest.update') : t('bloodTest.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default BloodTestsForm;
