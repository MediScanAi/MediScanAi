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
import type { UrineTestFormValues } from '../../../app/slices/testSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveTestData } from '../../../app/slices/testSlice';
import { auth } from '../../../api/authApi';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { Title } = Typography;


const UrineTestForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.urineTestData || undefined;
  const { t } = useTranslation();


  const urineTestFields = [
    {
      type: 'input',
      label: t('urineTest.ph'),
      name: 'ph',
      min: 4.5,
      max: 8.0,
      step: 0.1,
      placeholder: t('urineTest.urineTestphPlaceholder'),
    },
    {
      type: 'input',
      label: t('urineTest.gravity'),
      name: 'specificGravity',
      min: 1.0,
      max: 1.03,
      step: 0.001,
      placeholder: t('urineTest.urineTestgravityPlaceholder'),
      unit: 'g/dL',
    },
    {
      type: 'input',
      label: t('urineTest.protein'),
      name: 'protein',
      min: 0,
      max: 300,
      step: 1,
      placeholder: t('urineTest.urineTestproteinPlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'input',
      label: t('urineTest.glucose'),
      name: 'glucose',
      min: 0,
      max: 1000,
      step: 1,
      placeholder: t('urineTest.urineTestglucosePlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'input',
      label: t('urineTest.ketones'),
      name: 'ketones',
      min: 0,
      max: 160,
      step: 1,
      placeholder: t('urineTest.urineTestketonesPlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'select',
      label: t('urineTest.bilirubin'),
      name: 'bilirubin',
      options: [t('urineTest.negative'), t('urineTest.trace'), t('urineTest.positive')],
      placeholder: t('urineTest.urineTestbilirubinPlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'input',
      label: t('urineTest.urobilinogen'),
      name: 'urobilinogen',
      min: 0.1,
      max: 8.0,
      step: 0.1,
      placeholder: t('urineTest.urineTesturobilinogenPlaceholder'),
      unit: 'EU/dL',
    },
    {
      type: 'select',
      label: t('urineTest.nitrites'),
      name: 'nitrites',
      options: [t('urineTest.negative'), t('urineTest.positive')],
      placeholder: t('urineTest.urineTestnitritesPlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'select',
      label: t('urineTest.leukocyteEsterase'),
      name: 'leukocyteEsterase',
      options: [t('urineTest.negative'), t('urineTest.trace'), t('urineTest.positive')],
      placeholder: t('urineTest.urineTestleukocyteEsterasePlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'select',
      label: t('urineTest.blood'),
      name: 'blood',
      options: [t('urineTest.negative'), t('urineTest.trace'), t('urineTest.positive')],
      placeholder: t('urineTest.urineTestbloodPlaceholder'),
      unit: 'mg/dL',
    },
  ];

  const onFinish = (values: UrineTestFormValues) => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      message.error(t('urineTest.notAuthenticated'));
      return;
    }

    const testData = { ...values, date: new Date().toISOString() };
    dispatch(saveTestData({ uid, testType: 'urine', data: testData }));

    if (updatedData) {
      message.success(t('urineTest.updateSuccess'));
    } else {
      message.success(t('urineTest.success'));
    }

    setTimeout(() => {
      navigate('/profile/analysis-history');
    }, 1000);
  };

  return (
    <Card
      style={{ border: 'none' }}
      className="urine-form-card"
      title={<Title level={3}>{t('urineTest.title')}</Title>}
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
                  <Select placeholder={t('urineTest.placeholder')}>
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
            {updatedData ? t('urineTest.update') : t('urineTest.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UrineTestForm;
