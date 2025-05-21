import React from 'react';
import { Descriptions, Typography } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

interface ColorfulPatientDescriptionProps {
  theme: boolean;
  width?: number;
}

const ColorfulPatientDescription: React.FC<ColorfulPatientDescriptionProps> = ({
  theme,
  width,
}) => {
  return (
    <Descriptions
      title={
        <Title
          style={{
            marginBottom: 0,
            color: '#3498db',
            fontSize: (width || 1200) < 1200 ? 20 : 30,
          }}
        >
          User Information
        </Title>
      }
      bordered
      column={1}
      size={'small'}
      className={'' + (theme ? 'dark-mode-text' : '')}
      style={{ backgroundColor: 'transparent', minHeight: '50vh' }}
    >
      <Descriptions.Item className={theme ? 'dark-mode-text' : ''} label="Name">
        <div>HERE WILL BE NAME</div>
      </Descriptions.Item>

      <Descriptions.Item
        className={theme ? 'dark-mode-text' : ''}
        label="Surname"
      >
        <Typography.Text>
          <span>HERE WILL BE SURNAME</span>
        </Typography.Text>
      </Descriptions.Item>

      <Descriptions.Item className={theme ? 'dark-mode-text' : ''} label="Age">
        HERE WILL BE AGE
      </Descriptions.Item>

      <Descriptions.Item
        className={theme ? 'dark-mode-text' : ''}
        label="Blood type"
      >
        <HeartOutlined /> HERE WILL BE BLOOD TYPE
      </Descriptions.Item>

      <Descriptions.Item className={theme ? 'dark-mode-text' : ''} label="Sex">
        Male
      </Descriptions.Item>

      <Descriptions.Item
        className={theme ? 'dark-mode-text' : ''}
        label="Adress"
      >
        HERE WILL BE ADRESS
      </Descriptions.Item>

      <Descriptions.Item
        className={theme ? 'dark-mode-text' : ''}
        label="Phone number"
      >
        HERE WILL BE PHONE NUMBER
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ColorfulPatientDescription;
