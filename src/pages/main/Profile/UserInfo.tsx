import React, { useState } from 'react';
import {
  Descriptions,
  Typography,
  Button,
  Select,
  message,
  Space,
  InputNumber,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { saveUserData, type UserData } from '../../../app/slices/userDataSlice';
import pencilIcon from '../../../assets/photos/pencil.png';
import { selectCurrentUser } from '../../../app/slices/authSlice';

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
  bloodPressure: string;
  heartRate: string;
}

interface Props {
  theme: boolean;
}

const UserInfo: React.FC<Props> = ({ theme }) => {
  const navigate = useNavigate();
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
    bloodPressure: '',
    heartRate: '',
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [backupData, setBackupData] = useState<FormData>(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isNumeric = (value: string) => /^\d+$/.test(value);

  const startEdit = () => {
    const convertedData: FormData = {
      name: user?.firstName,
      surname: user?.lastName,
      email: user?.email,
      age: userData?.age?.toString() || '',
      sex: userData?.sex || '',
      weight: userData?.weight?.toString() || '',
      height: userData?.height?.toString() || '',
      bloodPressure: userData?.bloodPressure?.toString() || '',
      heartRate: userData?.heartRate?.toString() || '',
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
    const requiredFields = [
      'age',
      'sex',
      'weight',
      'height',
      'bloodPressure',
      'heartRate',
    ];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (emptyFields.length > 0) {
      message.error('Please fill in all required fields.');
      return;
    }

    if (
      !isNumeric(userData?.age?.toString() || '') ||
      !isNumeric(userData?.weight?.toString() || '') ||
      !isNumeric(userData?.height?.toString() || '') ||
      !isNumeric(userData?.heartRate?.toString() || '')
    ) {
      message.error('Numeric fields must contain numbers only.');
      return;
    }

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
      navigate('/my-health', { state: formData });
    } catch {
      message.error('Failed to save user data.');
    }
  };

  return (
    <>
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

      <Descriptions
        title={<Title style={{ color: '#3498db' }}>User Info</Title>}
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
              min={'1'}
              max={'100'}
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
              min={'40'}
              max={'200'}
              style={{ width: '100%' }}
              value={formData.weight}
              onChange={(value) =>
                handleChange('weight', value?.toString() || '')
              }
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
              min={'140'}
              max={'220'}
              value={formData.height}
              onChange={(value) =>
                handleChange('height', value?.toString() || '')
              }
              placeholder="Enter height"
            />
          ) : (
            <Text>{userData?.height || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Blood Pressure">
          {isEditing ? (
            <Select
              value={formData.bloodPressure || undefined}
              onChange={(value) => handleChange('bloodPressure', value)}
              style={{ width: '100%' }}
              placeholder="Select blood pressure"
            >
              <Option value="Normal">Normal (120/80)</Option>
              <Option value="Elevated">Elevated (130/80)</Option>
              <Option value="High">High (140/90+)</Option>
            </Select>
          ) : (
            <Text>{userData?.bloodPressure || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Heart Rate">
          {isEditing ? (
            <InputNumber
              style={{ width: '100%' }}
              min={'1'}
              max={'100'}
              value={formData.heartRate}
              onChange={(value) =>
                handleChange('heartRate', value?.toString() || '')
              }
              placeholder="Beats per minute"
            />
          ) : (
            <Text>{userData?.heartRate || 'Not set'}</Text>
          )}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default UserInfo;
