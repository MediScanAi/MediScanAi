import React from 'react';
import { Descriptions, Typography } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

interface ColorfulPatientDescriptionProps {
  theme: boolean;
}

const ColorfulPatientDescription: React.FC<ColorfulPatientDescriptionProps> = ({theme}) => {
  return (
    <Descriptions
      title={<h1>User Information</h1>}
      bordered
      column={1}
      size={'small'}
      className={''+(theme?'dark-mode-text':'')}
      style={{backgroundColor:'transparent',height:'57.5vh'}}
    >
      <Descriptions.Item  className={theme?'dark-mode-text':''} label="Name">
        <div >
          HERE WILL BE NAME
        </div>
      </Descriptions.Item>

      <Descriptions.Item className={theme?'dark-mode-text':''} label="Surname">
        <Typography.Text>
          <span>
            HERE WILL BE SURNAME
          </span>
        </Typography.Text>

      </Descriptions.Item>

      <Descriptions.Item className={theme?'dark-mode-text':''} label="Age">HERE WILL BE AGE</Descriptions.Item>

      <Descriptions.Item className={theme?'dark-mode-text':''} label="Blood type">
        <HeartOutlined /> HERE WILL BE BLOOD TYPE
      </Descriptions.Item>

      <Descriptions.Item className={theme?'dark-mode-text':''} label="Sex">Male</Descriptions.Item>

      <Descriptions.Item className={theme?'dark-mode-text':''} label="Adress">HERE WILL BE ADRESS</Descriptions.Item>

      <Descriptions.Item className={theme?'dark-mode-text':''} label="Phone number">
        HERE WILL BE PHONE NUMBER
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ColorfulPatientDescription;