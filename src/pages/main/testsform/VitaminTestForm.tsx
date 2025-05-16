import { Button, Form, InputNumber, message, Typography, Card } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setVitaminTestData } from '../../../app/slices/vitaminTestSlice';
import type { RootState } from '../../../app/store';
import type { VitaminTestFormValues } from '../../../app/slices/vitaminTestSlice';

const { Title } = Typography;

const vitaminTestFields = [
  {
    label: 'Vitamin A',
    name: 'vitaminA',
    min: 10,
    max: 80,
    step: 1,
    unit: 'mcg/dL',
    placeholder: 'e.g. 50',
  },
  {
    label: 'Vitamin B12',
    name: 'vitaminB12',
    min: 200,
    max: 900,
    step: 1,
    unit: 'pg/mL',
    placeholder: 'e.g. 300',
  },
  {
    label: 'Vitamin C',
    name: 'vitaminC',
    min: 0.2,
    max: 2.0,
    step: 0.1,
    unit: 'mg/dL',
    placeholder: 'e.g. 1.5',
  },
  {
    label: 'Vitamin D',
    name: 'vitaminD',
    min: 10,
    max: 100,
    step: 1,
    unit: 'ng/mL',
    placeholder: 'e.g. 50',
  },
  {
    label: 'Vitamin E',
    name: 'vitaminE',
    min: 5,
    max: 20,
    step: 0.1,
    unit: 'mg/L',
    placeholder: 'e.g. 10',
  },
  {
    label: 'Vitamin K',
    name: 'vitaminK',
    min: 0.1,
    max: 3.2,
    step: 0.1,
    unit: 'ng/mL',
    placeholder: 'e.g. 1.5',
  },
];

const VitaminTestForm = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    (state: RootState) => state.vitaminTest?.vitaminTestData
  );

  const onFinish = (values: VitaminTestFormValues) => {
    dispatch(setVitaminTestData(values));
    message.success('Vitamin test submitted successfully');
    setTimeout(() => {
      form.resetFields();
    }, 0);
  };

  console.log(data);

  return (
    <Card
      style={{ border: 'none' }}
      title={<Title level={3}>Vitamin Test</Title>}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" size="large">
        {vitaminTestFields.map((field) => (
          <Form.Item
            key={field.name}
            label={`${field.label} (${field.unit})`}
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
};

export default VitaminTestForm;
