import { Button, Form, InputNumber, message, Card, Typography, Row, Col } from 'antd';
import { useAppDispatch } from '../../../app/hooks';
import { setBloodTestData } from '../../../app/slices/bloodTestSlice';
import type { BloodTestFormValues } from '../../../app/slices/bloodTestSlice';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const bloodTestFields = [
  {
    name: 'hemoglobin',
    label: 'Hemoglobin (g/dL)',
    min: 0,
    max: 25,
    step: 0.1,
    placeholder: 'e.g. 14.5',
  },
  {
    name: 'wbc',
    label: 'White Blood Cells (×10⁹/L)',
    min: 0,
    max: 20,
    step: 0.1,
    placeholder: 'e.g. 6.8',
  },
  {
    name: 'rbc',
    label: 'Red Blood Cells (×10¹²/L)',
    min: 0,
    max: 10,
    step: 0.1,
    placeholder: 'e.g. 4.7',
  },
  {
    name: 'platelets',
    label: 'Platelets (×10⁹/L)',
    min: 0,
    max: 1000,
    step: 1,
    placeholder: 'e.g. 250',
  },
  {
    name: 'glucose',
    label: 'Glucose (mg/dL)',
    min: 50,
    max: 500,
    step: 1,
    placeholder: 'e.g. 95',
  },
  {
    name: 'cholesterol',
    label: 'Cholesterol (mg/dL)',
    min: 50,
    max: 400,
    step: 1,
    placeholder: 'e.g. 190',
  },
];

function BloodTestsForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.bloodTestData || undefined;

  const onFinish = (values: BloodTestFormValues) => {
    dispatch(
      setBloodTestData({
        ...values,
      })
    );

    if (updatedData) {
      message.success('Blood test updated successfully');
    } else {
      message.success('Blood test submitted successfully');
    }
    setTimeout(() => {
      navigate('/profile/analysis-history');
    }, 1000);
  };

  return (
    <Card
      style={{ border: 'none' }}
      title={<Title level={3}>Blood Test</Title>}
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
        </Row >

        <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            {updatedData ? 'Update Blood Test' : 'Submit Blood Test'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

}

export default BloodTestsForm;
