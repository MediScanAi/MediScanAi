import React, { useState } from 'react';
import { Descriptions, Typography, Button, Select, message, Space, InputNumber } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { saveUserData, type UserData } from '../../../app/slices/userDataSlice';
import pencilIcon from '../../../assets/photos/pencil.png';

const { Text } = Typography;
const { Option } = Select;

interface Props {
  theme: boolean;
}


const UserInfo: React.FC<Props> = ({ theme }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const initialData = {
    name: 'Poxos',
    surname: 'Poxosyan',
    email: user?.email,
    age: '',
    sex: '',
    weight: '',
    height: '',
    bloodPressure: '',
    heartRate: '',
  };

  const [formData, setFormData] = useState(initialData);
  const [backupData, setBackupData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isNumeric = (value: string) => /^\d+$/.test(value);

  const startEdit = () => {
    setBackupData(formData);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setFormData(backupData);
    setIsEditing(false);
  };

  const saveData = async () => {
    const requiredFields = ['age', 'sex', 'weight', 'height', 'bloodPressure', 'heartRate'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (emptyFields.length > 0) {
      message.error('Please fill in all required fields.');
      return;
    }

    if (!isNumeric(formData.age) || !isNumeric(formData.weight) || !isNumeric(formData.height) || !isNumeric(formData.heartRate)) {
      message.error('Numeric fields must contain numbers only.');
      return;
    }

    try {
      if (!user?.uid) {
        message.error('User is not authenticated');
        return;
      }
      await dispatch(saveUserData({ uid: user.uid, data: formData as unknown as UserData })).unwrap();
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
          Edit <img src={pencilIcon} alt="edit" style={{ width: 16, marginLeft: 4 }} />
        </Button>
      )}

      {isEditing && (
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={saveData}>Save</Button>
          <Button onClick={cancelEdit}>Cancel</Button>
        </Space>
      )}

      <Descriptions
        title={<Title style={{ color: '#3498db' }}>User Info</Title>}
        bordered
        column={1}
        size="small"
        className={theme ? 'dark-mode-text' : ''}
        style={{ backgroundColor: 'transparent', minHeight: '50vh', width: '100%' }}
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
            <InputNumber style={{ width: '100%' }} min={1} max={100} value={formData.age} onChange={(value) => handleChange('age', value?.toString() || '')} placeholder="Enter age" />
          ) : (
            <Text>{formData.age || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Sex">
          {isEditing ? (
            <Select value={formData.sex || undefined} onChange={(value) => handleChange('sex', value)} style={{ width: '100%' }} placeholder="Select sex">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          ) : (
            <Text>{formData.sex || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Weight (kg)">
          {isEditing ? (
            <InputNumber style={{ width: '100%' }}  value={formData.weight} onChange={(value) => handleChange('weight', value)} placeholder="Enter weight" />
          ) : (
            <Text>{formData.weight || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Height (cm)">
          {isEditing ? (
            <InputNumber style={{ width: '100%' }} min={1} max={300} value={formData.height} onChange={(value) => handleChange('height', value)} placeholder="Enter height" />
          ) : (
            <Text>{formData.height || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Blood Pressure">
          {isEditing ? (
            <Select value={formData.bloodPressure || undefined} onChange={(value) => handleChange('bloodPressure', value)} style={{ width: '100%' }} placeholder="Select blood pressure">
              <Option value="Normal">Normal (120/80)</Option>
              <Option value="Elevated">Elevated (130/80)</Option>
              <Option value="High">High (140/90+)</Option>
            </Select>
          ) : (
            <Text>{formData.bloodPressure || 'Not set'}</Text>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Heart Rate">
          {isEditing ? (
            <InputNumber style={{ width: '100%' }} min={1} max={100} value={formData.heartRate} onChange={(value) => handleChange('heartRate', value?.toString() || '')} placeholder="Beats per minute" />
          ) : (
            <Text>{formData.heartRate || 'Not set'}</Text>
          )}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default UserInfo;