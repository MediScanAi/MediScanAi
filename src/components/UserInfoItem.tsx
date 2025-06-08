import React, { useEffect, useState } from 'react';
import { Button, Col, Select, Tooltip, Typography } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import NumberInput from './common/inputs/NumberInput';
import { useTranslation } from 'react-i18next';
import '../assets/styles/components/userInfoItem.css';
const { Text } = Typography;
const { Option } = Select;

import type { UserData } from '../app/slices/userDataSlice';
import SelectInput from './common/inputs/SelectInput';

export interface UserInfoField {
  key: keyof UserData;
  label: string;
  editable: boolean;
  icon: React.ReactNode;
  unit?: string;
  tooltip?: string;
  value?: string | number | null;
}

interface UserInfoItemProps {
  field: UserInfoField;
  formState: UserData;
  onSave: (key: keyof UserData, value: number | string | null) => void;
  renderValue: (key: keyof UserData, value: unknown) => string | number;
  getPlaceholder: (key: keyof UserData) => string | undefined;
  getMaxValue: (key: keyof UserData) => number | undefined;
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({
  field,
  formState,
  onSave,
  renderValue,
  getPlaceholder,
  getMaxValue,
}) => {
  const { t } = useTranslation('userInfo');
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<string | number | null>(
    formState[field.key] ?? field.value ?? null
  );

  useEffect(() => {
    if (isEditing) {
      setTempValue(formState[field.key] ?? field.value ?? null);
    }
  }, [isEditing, formState[field.key]]);

  const handleSave = () => {
    onSave(field.key, tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(formState[field.key] ?? field.value ?? null);
    setIsEditing(false);
  };

  return (
    <Col xs={24} sm={12} md={8}>
      <div className={`info-card${isEditing ? ' editing' : ''}`}>
        <div className="info-label">
          {field.icon}
          <Text strong>{field.label}</Text>
          {field.tooltip && (
            <Tooltip title={field.tooltip}>
              <QuestionCircleOutlined />
            </Tooltip>
          )}
          {isEditing && field.unit && (
            <Text type="secondary">{field.unit}</Text>
          )}
        </div>

        {isEditing ? (
          <div className="edit-mode-container">
            {field.key === 'gender' ? (
              <SelectInput
                value={tempValue}
                onChange={(v) => setTempValue(v)}
                className="info-input"
                style={{ width: '60%' }}
                placeholder={getPlaceholder(field.key)}
              >
                <Option value="male">{t('userInfo.genders.male')}</Option>
                <Option value="female">{t('userInfo.genders.female')}</Option>
              </SelectInput>
            ) : (
              <NumberInput
                value={tempValue !== null ? tempValue : ''}
                onChange={(v) => setTempValue(v === '' ? null : Number(v))}
                className="info-input"
                min={0}
                max={getMaxValue(field.key)}
                placeholder={getPlaceholder(field.key)}
              />
            )}
            <div className="edit-actions">
              <Button
                type="text"
                icon={<CheckOutlined />}
                onClick={handleSave}
              />
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={handleCancel}
              />
            </div>
          </div>
        ) : (
          <div className="view-mode-container">
            <Text>
              {renderValue(field.key, formState[field.key] ?? field.value)}
              {field.unit && <span className="unit">{field.unit}</span>}
            </Text>
            {field.editable && (
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
              />
            )}
          </div>
        )}
      </div>
    </Col>
  );
};

export default UserInfoItem;
