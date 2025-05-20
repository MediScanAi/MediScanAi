import {
  Button,
  Form,
  InputNumber,
  message,
  Select,
  Typography,
  Card,
  Col,
  Row,
} from 'antd';
import { useAppDispatch } from '../../../app/hooks';
import { setUrineTestData } from '../../../app/slices/urineTestSlice';
import type { UrineTestFormValues } from '../../../app/slices/urineTestSlice';
import { useLocation, useNavigate } from 'react-router-dom';
const { Option } = Select;
const { Title } = Typography;

const urineTestFields = [
  {
    type: 'input',
    label: 'pH (4.5-8)',
    name: 'ph',
    min: 4.5,
    max: 8.0,
    step: 0.1,
    placeholder: 'e.g. 7.5',
  },
  {
    type: 'input',
    label: 'Gravity (1-1.1)',
    name: 'specificGravity',
    min: 1.0,
    max: 1.03,
    step: 0.001,
    placeholder: 'e.g. 1.015',
    unit: 'g/dL',
  },
  {
    type: 'input',
    label: 'Protein (mg/dL)',
    name: 'protein',
    min: 0,
    max: 300,
    step: 1,
    placeholder: 'e.g. 100',
    unit: 'mg/dL',
  },
  {
    type: 'input',
    label: 'Glucose (mg/dL)',
    name: 'glucose',
    min: 0,
    max: 1000,
    step: 1,
    placeholder: 'e.g. 100',
    unit: 'mg/dL',
  },
  {
    type: 'input',
    label: 'Ketones (mg/dL)',
    name: 'ketones',
    min: 0,
    max: 160,
    step: 1,
    placeholder: 'e.g. 100',
    unit: 'mg/dL',
  },
  {
    type: 'select',
    label: 'Bilirubin',
    name: 'bilirubin',
    options: ['negative', 'positive'],
    unit: 'mg/dL',
  },
  {
    type: 'input',
    label: 'Urobilinogen (EU/dL)',
    name: 'urobilinogen',
    min: 0.1,
    max: 8.0,
    step: 0.1,
    placeholder: 'e.g. 1.5',
    unit: 'EU/dL',
  },
  {
    type: 'select',
    label: 'Nitrites',
    name: 'nitrites',
    options: ['negative', 'positive'],
    unit: 'mg/dL',
  },
  {
    type: 'select',
    label: 'Leukocyte Esterase',
    name: 'leukocyteEsterase',
    options: ['negative', 'trace', 'positive'],
    placeholder: 'e.g. negative',
    unit: 'mg/dL',
  },
  {
    type: 'select',
    label: 'Blood',
    name: 'blood',
    options: ['negative', 'trace', 'positive'],
    placeholder: 'e.g. negative',
    unit: 'mg/dL',
  },
];

const UrineTestForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.urineTestData || undefined;

  const onFinish = (values: UrineTestFormValues) => {
    dispatch(
      setUrineTestData({
        ...values,
      })
    );
    if (updatedData) {
      message.success('Urine test updated successfully');
    } else {
      message.success('Urine test submitted successfully');
    }
    setTimeout(() => {
      navigate('/profile/analysis-history');
    }, 1000);
  };

  return (
    <Card
      style={{ border: 'none' }}
      className="urine-form-card"
      title={<Title level={3}>Urine Test</Title>}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        initialValues={updatedData}
      >
        <Row gutter={[24, 16]}>
          {urineTestFields.map((field) => {
            const formItem = (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={[{ required: true }]}
              >
                {field.type === 'input' ? (
                  <InputNumber
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    style={{ width: '100%' }}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Select placeholder="Select result">
                    {field.options?.map((opt) => (
                      <Option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            );

            return (
              <Col span={12} key={field.name}>
                {formItem}
              </Col>
            );
          })}
        </Row>

        <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
          <Button type="primary" htmlType="submit" className="submit-btn">
            {updatedData ? 'Update Urine Test' : 'Submit Urine Test'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UrineTestForm;
