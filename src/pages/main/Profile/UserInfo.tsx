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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={4} style={{ color: '#3498db', margin: 0 }}>
              User Info
            </Title>
            {!isEditing && (
              <Button onClick={startEdit}>
                Edit{' '}
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
                  Save
                </Button>
                <Button onClick={cancelEdit}>Cancel</Button>
              </Space>
            )}
          </div>
        }
        bordered
        column={1} // սա կարևոր է՝ input-ները լինելու են իրար տակ
        size="small"
        className={theme ? 'dark-mode-text' : ''}
        style={{
          backgroundColor: 'transparent',
          minHeight: '50vh',
          width: '100%',
        }}
      >
        <Descriptions.Item label="Name">
          <Text>{formData.name || 'Not set'}</Text>
        </Descriptions.Item>

        <Descriptions.Item label="Surname">
          <Text>{formData.surname || 'Not set'}</Text>
        </Descriptions.Item>

        <Descriptions.Item label="Email">
          <Text>{formData.email || 'Not set'}</Text>
        </Descriptions.Item>

        <Descriptions.Item label="Age">
          {isEditing ? (
            <InputNumber
              style={{ width: '100%' }}
              min={"1"}
              max={"90"}
              value={formData.age}
              onChange={(value) => handleChange('age', value?.toString() || '')}
              placeholder="Enter age"
            />
          ) : (
            <Text>{userData?.age || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Sex">
          {isEditing ? (
            <Select
              value={formData.sex || undefined}
              onChange={(value) => handleChange('sex', value)}
              style={{ width: '100%' }}
              placeholder="Select sex"
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          ) : (
            <Text>{userData?.sex || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Weight (kg)">
          {isEditing ? (
            <InputNumber
              min={"40"}
              max={"200"}
              style={{ width: '100%' }}
              value={formData.weight}
              onChange={(value) => handleChange('weight', value?.toString() || '')}
              placeholder="Enter weight"
            />
          ) : (
            <Text>{userData?.weight || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Height (cm)">
          {isEditing ? (
            <InputNumber
              style={{ width: '100%' }}
              min={"140"}
              max={"220"}
              value={formData.height}
              onChange={(value) => handleChange('height', value?.toString() || '')}
              placeholder="Enter height"
            />
          ) : (
            <Text>{userData?.height || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              Waist Size (cm)&nbsp;
              <Tooltip     title="Measure around the narrowest part of your waist, usually just above the belly button. Keep the tape snug but not tight.">
                <QuestionCircleOutlined style={{ color: '#1890ff', cursor: 'pointer' }} />
              </Tooltip>
            </>
          }
        >
          {isEditing ? (
            <InputNumber
              style={{ width: '100%' }}
              min={"65"}
              max={"100"}
              value={formData.waistSize}
              onChange={(value) => handleChange('waistSize', value?.toString() || '')}
              placeholder="Enter waist size"
            />
          ) : (
            <Text>{userData?.waistSize || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              Neck Size (cm)&nbsp;
              <Tooltip   title="Measure around the widest part of your neck, just below the Adam's apple. Keep the tape horizontal and snug.">
                <QuestionCircleOutlined style={{ color: '#1890ff', cursor: 'pointer' }} />
              </Tooltip>
            </>
          }
        >
          {isEditing ? (
            <InputNumber
              style={{ width: '100%' }}
              min={"35"}
              max={"45"}
              value={formData.neckSize}
              onChange={(value) => handleChange('neckSize', value?.toString() || '')}
              placeholder="Enter neck size"
            />
          ) : (
            <Text>{userData?.neckSize || 'Not set'}</Text>
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

};

export default UserInfo;