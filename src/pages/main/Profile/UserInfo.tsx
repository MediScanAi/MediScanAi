import React, { useEffect, useState } from 'react';
import {
  Typography,
  InputNumber,
  Select,
  Button,
  message,
  Row,
  Col,
  Tooltip,
  Spin,
  Card,
  Avatar,
  Form,
} from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  ManOutlined,
  WomanOutlined,
  MailOutlined,
  NumberOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  saveUserData,
  fetchUserData,
  type UserData,
} from '../../../app/slices/userDataSlice';
import { selectCurrentUser } from '../../../app/slices/authSlice';
import type { RootState } from '../../../app/store';
import { useTranslation } from 'react-i18next';
import '../../../assets/styles/UserInfo.css';
import { motion } from 'framer-motion';

const { Text, Title } = Typography;
const { Option } = Select;

export type UserInfoProps = {
  width: number;
  theme: boolean;
};

const UserInfo: React.FC<UserInfoProps> = ({ width, theme }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const userData = useAppSelector((s) => s.userData.data);
  const loading = useAppSelector((s: RootState) => s.userData.loading);
  const [form] = Form.useForm();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formState, setFormState] = useState<UserData>({
    age: null,
    gender: null,
    weight: null,
    height: null,
    waistSize: null,
    neckSize: null,
  });
  const [tempValues, setTempValues] = useState<Record<string, number | null>>({});

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserData({ uid: user.uid }));
    }
  }, [dispatch, user?.uid]);

  useEffect(() => {
    const newState = {
      age: userData?.age ?? null,
      gender: userData?.gender ?? null,
      weight: userData?.weight ?? null,
      height: userData?.height ?? null,
      waistSize: userData?.waistSize ?? null,
      neckSize: userData?.neckSize ?? null,
    };
    setFormState(newState);
    form.setFieldsValue(newState);
  }, [userData, form]);

  const getPlaceholder = (key: keyof UserData): string | undefined => {
    return t(`userInfo.placeholders.${key}`);
  };

  const fields = [
    {
      key: 'name',
      label: t('userInfo.fields.name'),
      value: user?.firstName || '',
      editable: false,
      icon: <UserOutlined />,
    },
    {
      key: 'surname',
      label: t('userInfo.fields.surname'),
      value: user?.lastName || '',
      editable: false,
      icon: <UserOutlined />,
    },
    {
      key: 'email',
      label: t('userInfo.fields.email'),
      value: user?.email || '',
      editable: false,
      icon: <MailOutlined />,
    },
    {
      key: 'age',
      label: t('userInfo.fields.age'),
      editable: true,
      icon: <NumberOutlined />,
      unit: t('userInfo.units.years'),
    },
    {
      key: 'gender',
      label: t('userInfo.fields.gender'),
      editable: true,
      icon: formState.gender === 'Male' ? <ManOutlined /> : <WomanOutlined />,
    },
    {
      key: 'weight',
      label: t('userInfo.fields.weight'),
      editable: true,
      icon: <ArrowUpOutlined />,
      unit: t('userInfo.units.kg'),
    },
    {
      key: 'height',
      label: t('userInfo.fields.height'),
      editable: true,
      icon: <ArrowUpOutlined />,
      unit: t('userInfo.units.cm'),
    },
    {
      key: 'waistSize',
      label: t('userInfo.fields.waistSize'),
      editable: true,
      tooltip: t('userInfo.tooltips.waistSize'),
      icon: <ArrowDownOutlined />,
      unit: t('userInfo.units.cm'),
    },
    {
      key: 'neckSize',
      label: t('userInfo.fields.neckSize'),
      editable: true,
      tooltip: t('userInfo.tooltips.neckSize'),
      icon: <ArrowDownOutlined />,
      unit: t('userInfo.units.cm'),
    },
  ];

  const handleInputChange = (key: keyof UserData, value: number | null) => {
    setTempValues({ ...tempValues, [key]: value });
  };

  const startEditing = (key: string) => {
    setEditingField(key);
    setTempValues({ ...tempValues, [key]: formState[key as keyof UserData] as number | null });
  };

  const cancelEditing = (key: string) => {
    setEditingField(null);
    setTempValues({ ...tempValues, [key]: null });
  };

  const saveField = async (key: keyof UserData) => {
    if (!user) return;

    const newValue = tempValues[key];
    const newFormState = { ...formState, [key]: newValue };

    try {
      await dispatch(
        saveUserData({ uid: user.uid, data: newFormState })
      ).unwrap();
      setFormState(newFormState);
      setEditingField(null);
      message.success(t('userInfo.messages.saveSuccess'));
    } catch {
      message.error(t('userInfo.messages.saveFail'));
    }
  };

  const renderValue = (key: string, value: unknown): string | number => {
    if (value === null || value === '' || value === undefined)
      return t('userInfo.notSet');
    if (key === 'gender' && typeof value === 'string')
      return t(`userInfo.genders.${value.toLowerCase()}`);
    return value as string | number;
  };

  return (
    <Spin
      spinning={loading}
      tip={t('userInfo.loading')}
      className={theme ? 'dark-spin' : ''}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`modern-user-profile ${theme ? 'dark' : ''}`}
      >
        <Card
          className={`profile-container ${theme ? 'dark' : ''}`}
          style={{ border: 'none' }}
        >
          <div className="profile-header-container">
            <div className="profile-avatar-container">
              <Avatar className="profile-avatar" size={80} style={{ fontSize: 50 }}>
                {user?.firstName ? user?.firstName[0].toUpperCase() : 'Profile'}
              </Avatar>
            </div>

            <div className="profile-info">
              <Title level={3} className="profile-name">
                {user?.firstName} {user?.lastName}
              </Title>
              <Text type="secondary" className="profile-email">
                {user?.email}
              </Text>
            </div>
          </div>

          <div className="profile-section">
            <Title level={4} className="section-title">
              {t('userInfo.sections.personalInfo')}
            </Title>
            <Row gutter={[24, 16]} className="info-grid">
              {fields.map((field) => (
                <Col xs={24} sm={12} md={8} key={field.key}>
                  <div
                    className={`info-card ${editingField === field.key ? 'editing' : ''} ${theme ? 'dark' : ''}`}
                  >
                    <div className="info-label">
                      {field.icon}
                      <Text className={'info-label-text'} strong>
                        {field.label}
                      </Text>
                      {field.tooltip && (
                        <Tooltip title={field.tooltip}>
                          <QuestionCircleOutlined />
                        </Tooltip>
                      )}
                    </div>

                    {editingField === field.key ? (
                      <div className="edit-mode-container">
                        {field.key === 'gender' ? (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Select
                              value={
                                tempValues[field.key] ||
                                formState[field.key as keyof UserData]
                              }
                              onChange={(v) =>
                                handleInputChange(
                                  field.key as keyof UserData,
                                  v as number | null
                                )
                              }
                              className="info-input"
                              placeholder={getPlaceholder(
                                field.key as keyof UserData
                              )}
                              suffixIcon={null}
                            >
                              <Option className={theme ? 'dark' : ''} value="Male">
                                {t('userInfo.genders.male')}
                              </Option>
                              <Option className={theme ? 'dark' : ''} value="Female">
                                {t('userInfo.genders.female')}
                              </Option>
                            </Select>
                            <div className="edit-actions">
                              <Button
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={() =>
                                  saveField(field.key as keyof UserData)
                                }
                                className="save-btn"
                              />
                              <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => cancelEditing(field.key)}
                                className="cancel-btn"
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <InputNumber
                              value={
                                tempValues[field.key] ||
                                formState[field.key as keyof UserData]
                              }
                              onChange={(v) =>
                                handleInputChange(
                                  field.key as keyof UserData,
                                  v as number | null
                                )
                              }
                              className="info-input"
                              min={0}
                              placeholder={getPlaceholder(
                                field.key as keyof UserData
                              )}
                              addonAfter={field.unit}
                            />
                            <div className="edit-actions">
                              <Button
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={() =>
                                  saveField(field.key as keyof UserData)
                                }
                                className="save-btn"
                              />
                              <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => cancelEditing(field.key)}
                                className="cancel-btn"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="view-mode-container">
                        <div className="info-value">
                          <Text className={'info-value-text'}>
                            {renderValue(
                              field.key,
                              formState[field.key as keyof UserData] ??
                              field.value
                            )}
                            {field.unit && (
                              <span className="unit">{field.unit}</span>
                            )}
                          </Text>
                        </div>
                        {field.editable && (
                          <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => startEditing(field.key)}
                            className="edit-btn"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Card>
      </motion.div>
    </Spin>
  );
};

export default UserInfo;
