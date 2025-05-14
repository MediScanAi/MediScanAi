import { Button, Form, InputNumber, message, Typography, Card } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setVitaminTestData } from '../../../app/slices/vitaminTestSlice';
import type { RootState } from '../../../app/store';
import type { VitaminTestFormValues } from '../../../app/slices/vitaminTestSlice';

const { Title } = Typography;

const VitaminTestForm = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    (state: RootState) => state.vitaminTest?.vitaminTestData
  );

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = (values: VitaminTestFormValues) => {
    dispatch(setVitaminTestData(values));
    message.success('Vitamin test submitted successfully');
  };

  const renderInput = (
    label: string,
    name: string,
    min: number,
    max: number,
    step: number,
    unit?: string
  ) => (
    <Form.Item
      label={`${label}${unit ? ` (${unit})` : ''}`}
      name={name}
      rules={[{ required: true }]}
    >
      <InputNumber min={min} max={max} step={step} style={{ width: '100%' }} />
    </Form.Item>
  );

  return (
    <Card
      style={{ border: 'none' }}
      title={<Title level={3}>Vitamin Test</Title>}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" size="large">
        {renderInput('Vitamin A', 'vitaminA', 10, 80, 1, 'mcg/dL')}
        {renderInput('Vitamin B12', 'vitaminB12', 200, 900, 1, 'pg/mL')}
        {renderInput('Vitamin C', 'vitaminC', 0.2, 2.0, 0.1, 'mg/dL')}
        {renderInput('Vitamin D', 'vitaminD', 10, 100, 1, 'ng/mL')}
        {renderInput('Vitamin E', 'vitaminE', 5, 20, 0.1, 'mg/L')}
        {renderInput('Vitamin K', 'vitaminK', 0.1, 3.2, 0.1, 'ng/mL')}

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
