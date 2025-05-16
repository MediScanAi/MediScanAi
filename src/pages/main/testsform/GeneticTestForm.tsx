// GeneticTestForm.tsx
import {
  Button,
  message,
  Form,
  Card,
  Typography,
  Select,
} from 'antd';
import {
  setGeneticTestData,
  type GeneticTestFormValues,
} from '../../../app/slices/geneticTestSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';

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
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    (state: RootState) => state.geneticTest?.geneticTestData
  );

  const onFinish = (values: GeneticTestFormValues) => {
    dispatch(setGeneticTestData(values));
    message.success({
      content: `Genetic Test & Family Health History submitted successfully!`,
      className: 'success-message',
    });
    setTimeout(() => {
      form.resetFields();
    }, 0);
  };

  return (
    <Card style={{ border: 'none' }}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <Title level={3}>Genetic Test & Family Health History</Title>
        <Title level={4}>Genetic Test</Title>
        {geneticFields.map((field) => (
          <Form.Item
            key={field.name}
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
        ))}

        <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit Form
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default GeneticTestForm;
