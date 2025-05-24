import React, { useState } from 'react';
import { Descriptions, Typography, Input, Button, Select, message } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { saveUserData } from '../../../app/slices/userDataSlice';
const { Text } = Typography;
const { Option } = Select;

interface Props {
  theme: boolean;
  user: {
    name: string;
    surname: string;
    email: string;
  };
}

const UserInfo: React.FC<Props> = ({ theme }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: 'Poxos',
    surname: 'Poxosyan',
    email: user?.email,
    age: '',
    sex: '',
    weight: '',
    height: '',
    bloodPressure: '',
    heartRate: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isNumeric = (value: string) => /^\d+$/.test(value);

  const goToHealthPage = async () => {
    const requiredFields = ['age', 'sex', 'weight', 'height', 'bloodPressure', 'heartRate'];
    const emptyFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

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
      await dispatch(saveUserData({ uid: user.uid, data: formData })).unwrap();
      navigate('/my-health', { state: formData });
    } catch (error) {
      console.error('Failed to save user data:', error);
      message.error('Failed to save data.');
    }
  };


  console.log(formData);


  return (
    <Descriptions
      title={<Title style={{ color: '#3498db' }}>User Info</Title>}
      bordered
      column={1}
      size="small"
      className={theme ? 'dark-mode-text' : ''}
      style={{ backgroundColor: 'transparent', minHeight: '50vh' }}
    >
      <Descriptions.Item label="Name">
        <Text>{formData.name}</Text>
      </Descriptions.Item>

      <Descriptions.Item label="Surname">
        <Text>{formData.surname}</Text>
      </Descriptions.Item>

      <Descriptions.Item label="Email">
        <Text>{formData.email}</Text>
      </Descriptions.Item>

      <Descriptions.Item label="Age">
        <Input
          placeholder="Enter age"
          value={formData.age}
          onChange={(e) => handleChange('age', e.target.value)}
        />
      </Descriptions.Item>

      <Descriptions.Item label="Sex">
        <Select
          placeholder="Select sex"
          value={formData.sex || undefined}
          onChange={(value) => handleChange('sex', value)}
          style={{ width: '100%' }}
        >
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Descriptions.Item>

      <Descriptions.Item label="Weight (kg)">
        <Input
          placeholder="Enter weight"
          value={formData.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
        />
      </Descriptions.Item>

      <Descriptions.Item label="Height (cm)">
        <Input
          placeholder="Enter height"
          value={formData.height}
          onChange={(e) => handleChange('height', e.target.value)}
        />
      </Descriptions.Item>

      <Descriptions.Item label="Blood Pressure">
        <Select
          placeholder="Select blood pressure"
          value={formData.bloodPressure || undefined}
          onChange={(value) => handleChange('bloodPressure', value)}
          style={{ width: '100%' }}
        >
          <Option value="Normal">Normal (120/80)</Option>
          <Option value="Elevated">Elevated (130/80)</Option>
          <Option value="High">High (140/90+)</Option>
        </Select>
      </Descriptions.Item>

      <Descriptions.Item label="Heart Rate">
        <Input
          placeholder="Beats per minute"
          value={formData.heartRate}
          onChange={(e) => handleChange('heartRate', e.target.value)}
        />
      </Descriptions.Item>

      <Descriptions.Item label="">
        <Button type="primary" onClick={goToHealthPage}>
          Calculate DBA
        </Button>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserInfo;
