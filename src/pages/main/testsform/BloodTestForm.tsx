import { Button, Form, InputNumber, message, Card, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { setBloodTestData } from '../../../app/slices/bloodTestSlice';
import type { RootState } from '../../../app/store';
import type { BloodTestFormValues } from '../../../app/slices/bloodTestSlice';
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
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    (state: RootState) => state.bloodTest?.bloodTestData
  );

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);


  const onFinish = (values: BloodTestFormValues) => {
    dispatch(setBloodTestData(values));
    message.success('Blood test submitted successfully');
  };

  console.log(data);

  return (
    <Card
      style={{ border: 'none' }}
      title={<Title level={3}>Vitamin Test</Title>}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" size="large">
        {bloodTestFields.map(field => (
          <Form.Item
            key={field.name}
            label={`${field.label}`}
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
        ))}

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Submit Vitamin Test
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default BloodTestsForm;
