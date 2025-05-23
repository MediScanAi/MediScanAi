import {
  Button,
  message,
  Form,
  Card,
  Typography,
  Select,
  Row,
  Col,
} from 'antd';
import { useAppDispatch } from '../../../app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveTestData } from '../../../app/slices/testSlice';
import { auth } from '../../../api/authApi';
import type { GeneticTestFormValues } from '../../../app/slices/testSlice';

const { Title } = Typography;
const { Option } = Select;

const geneticFields = [
  {
    type: 'select',
    name: 'brca1',
    label: 'BRCA1 Gene Mutation',
    options: ['negative', 'positive'],
  },
  {
    type: 'select',
    name: 'brca2',
    label: 'BRCA2 Gene Mutation',
    options: ['negative', 'positive'],
  },
  {
    type: 'select',
    name: 'apoe',
    label: 'APOE Genotype Risk Score',
    options: ['ε2/ε2', 'ε3/ε3', 'ε3/ε4', 'ε4/ε4'],
  },
  {
    type: 'select',
    name: 'mthfr',
    label: 'MTHFR Mutation Level',
    options: ['Homozygous', 'Heterozygous', 'Normal'],
  },
  {
    type: 'select',
    name: 'factor_v_leiden',
    label: 'Factor V Leiden Mutation',
    options: ['negative', 'positive'],
  },
  {
    type: 'select',
    name: 'cyp2c19',
    label: 'CYP2C19 Enzyme Activity',
    options: ['Category I', 'Category II', 'Category III'],
  },
];

function GeneticTestForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.geneticTestData || undefined;

  const onFinish = (values: GeneticTestFormValues) => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      message.error('User is not authenticated');
      return;
    }

    const testData = { ...values, date: new Date().toISOString() };
    dispatch(saveTestData({ uid, testType: 'genetic', data: testData }));

    if (updatedData) {
      message.success('Genetic test updated successfully');
    } else {
      message.success('Genetic test submitted successfully');
    }

    setTimeout(() => {
      navigate('/profile/analysis-history');
    }, 1000);
  };

  return (
    <Card
      style={{ border: 'none' }}
      title={<Title level={3}>Genetic Test</Title>}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        initialValues={updatedData}
      >
        <Row gutter={[24, 16]}>
          {geneticFields.map((field) => (
            <Col span={12} key={field.name}>
              <Form.Item
                label={field.label}
                name={field.name}
                rules={[{ required: true }]}
              >
                <Select placeholder="Select result">
                  {field.options?.map((opt) => (
                    <Option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
          <Button type="primary" htmlType="submit" size="large">
            {updatedData ? 'Update Genetic Test' : 'Submit Genetic Test'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default GeneticTestForm;
