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
import { saveTestData, setTestData } from '../../../app/slices/testSlice';
import { auth } from '../../../api/authApi';
import type { GeneticTestFormValues } from '../../../app/slices/testSlice';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { Option } = Select;

function GeneticTestForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.geneticTestData || undefined;
  const geneticFields = [
    {
      type: 'select',
      name: 'brca1',
      label: t('geneticTest.brca1'),
      options: [t('geneticTest.negative'), t('geneticTest.positive')],
    },
    {
      type: 'select',
      name: 'brca2',
      label: t('geneticTest.brca2'),
      options: [t('geneticTest.negative'), t('geneticTest.positive')],
    },
    {
      type: 'select',
      name: 'apoe',
      label: t('geneticTest.apoe'),
      options: [
        t('geneticTest.ε2/ε2'),
        t('geneticTest.ε3/ε3'),
        t('geneticTest.ε3/ε4'),
        t('geneticTest.ε4/ε4'),
      ],
    },
    {
      type: 'select',
      name: 'mthfr',
      label: t('geneticTest.mthfr'),
      options: [
        t('geneticTest.homozygous'),
        t('geneticTest.heterozygous'),
        t('geneticTest.normal'),
      ],
    },
    {
      type: 'select',
      name: 'factor_v_leiden',
      label: t('geneticTest.factor_v_leiden'),
      options: [t('geneticTest.negative'), t('geneticTest.positive')],
    },
    {
      type: 'select',
      name: 'cyp2c19',
      label: t('geneticTest.cyp2c19'),
      options: [
        t('geneticTest.categoryI'),
        t('geneticTest.categoryII'),
        t('geneticTest.categoryIII'),
      ],
    },
  ];

  const onFinish = async (values: GeneticTestFormValues) => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      message.error(t('geneticTest.notAuthenticated'));
      return;
    }

    const testData = { ...values, date: new Date().toISOString() };
    await dispatch(saveTestData({ uid, testType: 'genetic', data: testData }));

    dispatch(setTestData({ testType: 'genetic', data: testData }));

    if (updatedData) {
      message.success(t('geneticTest.updateSuccess'));
    } else {
      message.success(t('geneticTest.success'));
    }

    setTimeout(() => {
      navigate('/profile/analysis-history');
    }, 1000);
  };

  return (
    <Card
      style={{ border: 'none' }}
      title={<Title level={3}>{t('geneticTest.title')}</Title>}
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
                <Select placeholder={t('geneticTest.placeholder')}>
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
            {updatedData ? t('geneticTest.update') : t('geneticTest.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default GeneticTestForm;
