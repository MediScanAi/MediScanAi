import React from 'react';
import { Descriptions } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const ColorfulPatientDescription: React.FC = () => {
  return (
    <Descriptions
      style={{ color: '#3498db', fontSize: '30px' }}
      title={<h1>User Information</h1>}
      bordered
      column={1}
    >
      <Descriptions.Item label="Name">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          HERE WILL BE NAME
        </div>
      </Descriptions.Item>

      <Descriptions.Item label="Surname">
        HERE WILL BE SURNAME
      </Descriptions.Item>

      <Descriptions.Item label="Age">HERE WILL BE AGE</Descriptions.Item>

      <Descriptions.Item label="Blood type">
        <HeartOutlined /> HERE WILL BE BLOOD TYPE
      </Descriptions.Item>

      <Descriptions.Item label="Sex">Male</Descriptions.Item>

      <Descriptions.Item label="Adress">HERE WILL BE ADRESS</Descriptions.Item>

      <Descriptions.Item label="Phone number">
        HERE WILL BE PHONE NUMBER
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ColorfulPatientDescription;
