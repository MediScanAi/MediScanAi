import {
  Button,
  Form,
  InputNumber,
  message,
  Select,
  Typography,
  Card,
} from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setUrineTestData } from '../../../app/slices/urineTestSlice';
import type { RootState } from '../../../app/store';
import type { UrineTestFormValues } from '../../../app/slices/urineTestSlice';

const { Option } = Select;
const { Title } = Typography;

const UrineTestForm = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    (state: RootState) => state.urineTest?.urineTestData
  );

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = (values: UrineTestFormValues) => {
    dispatch(setUrineTestData(values));
    message.success('Urine test submitted successfully');
  };

  const renderInput = (
    label: string,
    name: string,
    min: number,
    max: number,
    step: number
  ) => (
    <Form.Item label={label} name={name} rules={[{ required: true }]}>
      <InputNumber min={min} max={max} step={step} style={{ width: '100%' }} />
    </Form.Item>
  );

  const renderSelect = (label: string, name: string, options: string[]) => (
    <Form.Item label={label} name={name} rules={[{ required: true }]}>
      <Select placeholder="Select result">
        {options.map((opt) => (
          <Option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <Card
      style={{ border: 'none' }}
      className="urine-form-card"
      title={<Title level={3}>Urine Test</Title>}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" size="large">
        {renderInput('pH', 'ph', 4.5, 8.0, 0.1)}
        {renderInput('Specific Gravity', 'specificGravity', 1.0, 1.03, 0.001)}
        {renderInput('Protein (mg/dL)', 'protein', 0, 300, 1)}
        {renderInput('Glucose (mg/dL)', 'glucose', 0, 1000, 1)}
        {renderInput('Ketones (mg/dL)', 'ketones', 0, 160, 1)}
        {renderSelect('Bilirubin', 'bilirubin', ['negative', 'positive'])}
        {renderInput('Urobilinogen (EU/dL)', 'urobilinogen', 0.1, 8.0, 0.1)}
        {renderSelect('Nitrites', 'nitrites', ['negative', 'positive'])}
        {renderSelect('Leukocyte Esterase', 'leukocyteEsterase', [
          'negative',
          'trace',
          'positive',
        ])}
        {renderSelect('Blood', 'blood', ['negative', 'trace', 'positive'])}

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Submit Urine Test
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UrineTestForm;
