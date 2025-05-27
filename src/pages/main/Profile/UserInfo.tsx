import React, { useState } from 'react';
import {
  Descriptions,
  Typography,
  Button,
  Select,
  message,
  Space,
  InputNumber,
  Tooltip,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { saveUserData, type UserData } from '../../../app/slices/userDataSlice';
import pencilIcon from '../../../assets/photos/pencil.png';
import { selectCurrentUser } from '../../../app/slices/authSlice';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;

const { Option } = Select;

interface FormData {
  name: string | undefined;
  surname: string | undefined;
  email: string | null | undefined;
  age: string;
  sex: string;
  weight: string;
  height: string;
  waistSize: string;
  neckSize: string;
}

interface Props {
  theme: boolean;
}

const UserInfo: React.FC<Props> = ({ theme }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const userData = useAppSelector((state) => state.userData.data);

  const initialData = {
    name: user?.firstName,
    surname: user?.lastName,
    email: user?.email,
    age: '',
    sex: '',
    weight: '',
    height: '',
    waistSize: '',
    neckSize: '',
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [backupData, setBackupData] = useState<FormData>(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const startEdit = () => {
    const convertedData: FormData = {
      name: user?.firstName,
      surname: user?.lastName,
      email: user?.email,
      age: userData?.age?.toString() || '',
      sex: userData?.sex || '',
      weight: userData?.weight?.toString() || '',
      height: userData?.height?.toString() || '',
      waistSize: userData?.waistSize?.toString() || '',
      neckSize: userData?.neckSize?.toString() || '',
    };
    setBackupData(convertedData);
    setFormData(convertedData);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setFormData(backupData);
    setIsEditing(false);
  };

  const saveData = async () => {
    try {
      if (!user?.uid) {
        message.error('User is not authenticated');
        return;
      }
      await dispatch(
        saveUserData({ uid: user.uid, data: formData as unknown as UserData })
      ).unwrap();
      message.success('Data saved successfully!');
      setIsEditing(false);
    } catch {
      message.error('Failed to save user data.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Descriptions
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title level={4} style={{ color: '#3498db', margin: 0 }}>
              {t('userInfo.title')}
            </Title>
            {!isEditing && (
              <Button onClick={startEdit}>
                {t('userInfo.edit')}
                <img
                  src={pencilIcon}
                  alt="edit"
                  style={{ width: 16, marginLeft: 4 }}
                />
              </Button>
            )}
            {isEditing && (
              <Space style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={saveData}>
                  {t('userInfo.save')}
                </Button>
                <Button onClick={cancelEdit}>{t('userInfo.cancel')}</Button>
              </Space>
            )}
          </div>
        }
        bordered
        column={1}
        size="small"
        className={theme ? 'dark-mode-text' : ''}
        style={{
          backgroundColor: 'transparent',
          minHeight: '50vh',
          width: '100%',
        }}
      >
        <Descriptions.Item label={t('userInfo.name')}>
          <Text>{formData.name || t('userInfo.notSet')}</Text>
        </Descriptions.Item>

        <Descriptions.Item label={t('userInfo.surname')}>
          <Text>{formData.surname || t('userInfo.notSet')}</Text>
        </Descriptions.Item>

        <Descriptions.Item label={t('userInfo.email')}>
          <Text>{formData.email || t('userInfo.notSet')}</Text>
        </Descriptions.Item>

        <Descriptions.Item label={t('userInfo.age')}>
          {isEditing ? (
            <InputNumber
              style={{ width: '100%' }}
              min={'1'}
              max={'90'}
              value={formData.age}
              onChange={(value) => handleChange('age', value?.toString() || '')}
              placeholder={t('userInfo.agePlaceholder')}
            />
          ) : (
            <Text>{userData?.age || t('userInfo.notSet')}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label={t('userInfo.sex')}>
          {isEditing ? (
            <Select
              value={formData.sex || undefined}
              onChange={(value) => handleChange('sex', value || '')}
              style={{ width: '100%' }}
              placeholder={t('userInfo.sexPlaceholder')}
            >
              <Option value="Male">{t('userInfo.male')}</Option>
              <Option value="Female">{t('userInfo.female')}</Option>
            </Select>
          ) : (
            <Text>
              {userData?.sex
                ? t(`userInfo.${userData.sex.toLowerCase()}`)
                : t('userInfo.notSet')}
            </Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label={t('userInfo.weight')}>
          {isEditing ? (
            <InputNumber
              min={'40'}
              max={'200'}
              style={{ width: '100%' }}
              value={formData.weight}
              onChange={(value) =>
                handleChange('weight', value?.toString() || '')
              }
              placeholder={t('userInfo.weightPlaceholder')}
            />
          ) : (
            <Text>{userData?.weight || t('userInfo.notSet')}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label={t('userInfo.height')}>
          {isEditing ? (
            <InputNumber
              style={{ width: '100%' }}
              min={'140'}
              max={'220'}
              value={formData.height}
              onChange={(value) =>
                handleChange('height', value?.toString() || '')
              }
              placeholder={t('userInfo.heightPlaceholder')}
            />
          ) : (
            <Text>{userData?.height || t('userInfo.notSet')}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              {t('userInfo.waistSize')} (cm)&nbsp;
              <Tooltip title={t('userInfo.waistSizeTooltip')}>
                <QuestionCircleOutlined
                  style={{ color: '#1890ff', cursor: 'pointer' }}
                />
              </Tooltip>
            </>
          }
        >
          {isEditing ? (
            <InputNumber
              style={{ width: '100%' }}
              min={'65'}
              max={'100'}
              value={formData.waistSize}
              onChange={(value) =>
                handleChange('waistSize', value?.toString() || '')
              }
              placeholder={t('userInfo.waistSizePlaceholder')}
            />
          ) : (
            <Text>{userData?.waistSize || t('userInfo.notSet')}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              {t('userInfo.neckSize')} (cm)&nbsp;
              <Tooltip title={t('userInfo.neckSizeTooltip')}>
                <QuestionCircleOutlined
                  style={{ color: '#1890ff', cursor: 'pointer' }}
                />
              </Tooltip>
            </>
          }
        >
          {isEditing ? (
            <InputNumber
              style={{ width: '100%' }}
              min={'35'}
              max={'45'}
              value={formData.neckSize}
              onChange={(value) =>
                handleChange('neckSize', value?.toString() || '')
              }
              placeholder={t('userInfo.neckSizePlaceholder')}
            />
          ) : (
            <Text>{userData?.neckSize || t('userInfo.notSet')}</Text>
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default UserInfo;
