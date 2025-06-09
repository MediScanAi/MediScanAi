import { Form, message, Select, Typography, Card, Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { UrineTestFormValues } from '../../app/slices/testSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveTestData, setTestData } from '../../app/slices/testSlice';
import { auth } from '../../api/authApi';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../common/buttons/PrimaryButton';
import '../../assets/styles/components/rootForm.css';
import NumberInput from '../common/inputs/NumberInput';
import SelectInput from '../common/inputs/SelectInput';

const { Option } = Select;
const { Title } = Typography;

type ValueMapping = {
  [key: string]: 'negative' | 'positive' | 'trace';
};

const UrineTestForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const updatedData = useLocation()?.state?.urineTestData || undefined;
  const { t } = useTranslation('urineTest');
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const urineTestFields = [
    {
      type: 'input',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.ph')}
        </span>
      ),
      name: 'ph',
      min: 4.5,
      max: 8.0,
      step: 0.1,
      placeholder: t('urineTest.urineTestphPlaceholder'),
    },
    {
      type: 'input',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.gravity')}
        </span>
      ),
      name: 'specificGravity',
      min: 1.0,
      max: 1.03,
      step: 0.001,
      placeholder: t('urineTest.urineTestgravityPlaceholder'),
      unit: 'g/dL',
    },
    {
      type: 'input',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.protein')}
        </span>
      ),
      name: 'protein',
      min: 0,
      max: 300,
      step: 1,
      placeholder: t('urineTest.urineTestproteinPlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'input',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.glucose')}
        </span>
      ),
      name: 'glucose',
      min: 0,
      max: 1000,
      step: 1,
      placeholder: t('urineTest.urineTestglucosePlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'input',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.ketones')}
        </span>
      ),
      name: 'ketones',
      min: 0,
      max: 160,
      step: 1,
      placeholder: t('urineTest.urineTestketonesPlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'select',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.bilirubin')}
        </span>
      ),
      name: 'bilirubin',
      options: [
        t('urineTest.negative'),
        t('urineTest.trace'),
        t('urineTest.positive'),
      ],
      placeholder: t('urineTest.urineTestbilirubinPlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'input',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.urobilinogen')}
        </span>
      ),
      name: 'urobilinogen',
      min: 0.1,
      max: 8.0,
      step: 0.1,
      placeholder: t('urineTest.urineTesturobilinogenPlaceholder'),
      unit: 'EU/dL',
    },
    {
      type: 'select',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.nitrites')}
        </span>
      ),
      name: 'nitrites',
      options: [t('urineTest.negative'), t('urineTest.positive')],
      placeholder: t('urineTest.urineTestnitritesPlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'select',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.leukocyteEsterase')}
        </span>
      ),
      name: 'leukocyteEsterase',
      options: [
        t('urineTest.negative'),
        t('urineTest.trace'),
        t('urineTest.positive'),
      ],
      placeholder: t('urineTest.urineTestleukocyteEsterasePlaceholder'),
      unit: 'mg/dL',
    },
    {
      type: 'select',
      label: (
        <span className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.blood')}
        </span>
      ),
      name: 'blood',
      options: [
        t('urineTest.negative'),
        t('urineTest.trace'),
        t('urineTest.positive'),
      ],
      placeholder: t('urineTest.urineTestbloodPlaceholder'),
      unit: 'mg/dL',
    },
  ];

  const valueMapping: ValueMapping = {
    [t('urineTest.negative')]: 'negative',
    [t('urineTest.positive')]: 'positive',
    [t('urineTest.trace')]: 'trace',
  };

  const onFinish = async (values: UrineTestFormValues) => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      message.error(t('urineTest.notAuthenticated'));
      return;
    }

    const processedValues = {
      ...values,
      bilirubin: valueMapping[values.bilirubin as string] || values.bilirubin,
      nitrites: valueMapping[values.nitrites as string] || values.nitrites,
      leukocyteEsterase:
        valueMapping[values.leukocyteEsterase as string] ||
        values.leukocyteEsterase,
      blood: valueMapping[values.blood as string] || values.blood,
      date: new Date().toISOString(),
    };

    await dispatch(
      saveTestData({ uid, testType: 'urine', data: processedValues })
    );
    dispatch(setTestData({ testType: 'urine', data: processedValues }));

    if (updatedData) {
      message.success(t('urineTest.updateSuccess'));
    } else {
      message.success(t('urineTest.success'));
    }

    setTimeout(() => {
      navigate('/profile/analysis-history');
    }, 1000);
  };

  const getDisplayValue = (value: string | null) => {
    if (!value) return null;
    const englishValue = valueMapping[value];
    return englishValue ? t(`urineTest.${englishValue}`) : value;
  };

  return (
    <Card
      className="test-card"
      title={
        <Title level={3} className={`input-item ${isDarkMode ? 'dark' : ''}`}>
          {t('urineTest.title')}
        </Title>
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        initialValues={
          updatedData
            ? {
                ...updatedData,
                bilirubin: getDisplayValue(updatedData.bilirubin),
                nitrites: getDisplayValue(updatedData.nitrites),
                leukocyteEsterase: getDisplayValue(
                  updatedData.leukocyteEsterase
                ),
                blood: getDisplayValue(updatedData.blood),
              }
            : undefined
        }
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
                  <NumberInput
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    style={{ width: '100%' }}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <SelectInput
                    className={'select-item'}
                    placeholder={t('urineTest.placeholder')}
                  >
                    {field.options?.map((opt) => (
                      <Option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </Option>
                    ))}
                  </SelectInput>
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

        <Form.Item className="genetic-form-item">
          <PrimaryButton
            type="primary"
            htmlType="submit"
            className="submit-btn"
          >
            {updatedData ? t('urineTest.update') : t('urineTest.submit')}
          </PrimaryButton>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UrineTestForm;
