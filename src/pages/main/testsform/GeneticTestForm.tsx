import { message, Form, Card, Typography, Select, Row, Col } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveTestData, setTestData } from '../../../app/slices/testSlice';
import { auth } from '../../../api/authApi';
import type { GeneticTestFormValues } from '../../../app/slices/testSlice';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../../../components/common/PrimaryButton';
import SelectInput from '../../../components/common/inputs/SelectInput';

const { Title } = Typography;
const { Option } = Select;

function GeneticTestForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useTranslation('geneticTest');
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.geneticTestData || undefined;
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const geneticFields = [
    {
      type: 'select',
      name: 'brca1',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('geneticTest.brca1')}
        </span>
      ),
      options: [
        { value: 'negative', label: t('geneticTest.negative') },
        { value: 'positive', label: t('geneticTest.positive') },
      ],
    },
    {
      type: 'select',
      name: 'brca2',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('geneticTest.brca2')}
        </span>
      ),
      options: [
        { value: 'negative', label: t('geneticTest.negative') },
        { value: 'positive', label: t('geneticTest.positive') },
      ],
    },
    {
      type: 'select',
      name: 'apoe',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('geneticTest.apoe')}
        </span>
      ),
      options: [
        { value: 'ε2/ε2', label: t('geneticTest.ε2/ε2') },
        { value: 'ε3/ε3', label: t('geneticTest.ε3/ε3') },
        { value: 'ε3/ε4', label: t('geneticTest.ε3/ε4') },
        { value: 'ε4/ε4', label: t('geneticTest.ε4/ε4') },
      ],
    },
    {
      type: 'select',
      name: 'mthfr',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('geneticTest.mthfr')}
        </span>
      ),
      options: [
        { value: 'homozygous', label: t('geneticTest.homozygous') },
        { value: 'heterozygous', label: t('geneticTest.heterozygous') },
        { value: 'normal', label: t('geneticTest.normal') },
      ],
    },
    {
      type: 'select',
      name: 'factor_v_leiden',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('geneticTest.factor_v_leiden')}
        </span>
      ),
      options: [
        { value: 'negative', label: t('geneticTest.negative') },
        { value: 'positive', label: t('geneticTest.positive') },
      ],
    },
    {
      type: 'select',
      name: 'cyp2c19',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('geneticTest.cyp2c19')}
        </span>
      ),
      options: [
        { value: 'categoryI', label: t('geneticTest.categoryI') },
        { value: 'categoryII', label: t('geneticTest.categoryII') },
        { value: 'categoryIII', label: t('geneticTest.categoryIII') },
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
      className="test-card"
      title={
        <Title level={3} className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('geneticTest.title')}
        </Title>
      }
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
                <SelectInput placeholder={t('geneticTest.placeholder')}>
                  {field.options?.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </SelectInput>
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
          <PrimaryButton type="primary" htmlType="submit" size="large">
            {updatedData ? t('geneticTest.update') : t('geneticTest.submit')}
          </PrimaryButton>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default GeneticTestForm;
