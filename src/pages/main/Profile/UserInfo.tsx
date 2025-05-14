import React from 'react';
import { Descriptions } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const ColorfulPatientDescription: React.FC = () => {
  return (
    <Descriptions title="Patient Info" bordered column={1}>
      <Descriptions.Item label="Name">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          Иванов Иван Иванович
        </div>
      </Descriptions.Item>

      <Descriptions.Item label="Surname">На приёме</Descriptions.Item>

      <Descriptions.Item label="Age">На приёме</Descriptions.Item>

      <Descriptions.Item label="Blood type">
        <HeartOutlined /> A(II) Rh+
      </Descriptions.Item>

      <Descriptions.Item label="Sex">Male</Descriptions.Item>

      <Descriptions.Item label="Adress">
        Armenia, Yerevan, 123456
      </Descriptions.Item>

      <Descriptions.Item label="Phone number">054-123-4567</Descriptions.Item>
    </Descriptions>
  );
};

export default ColorfulPatientDescription;
