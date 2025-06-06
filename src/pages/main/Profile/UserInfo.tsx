import React, { useEffect, useState } from 'react';
import { Typography, Row, Spin, Card, Form, message } from 'antd';
import {
  UserOutlined,
  ManOutlined,
  WomanOutlined,
  MailOutlined,
  NumberOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
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
import UserAvatar from '../../../components/common/UserAvatar';
import UserInfoItem, {
  type UserInfoField,
} from '../../../components/UserInfoItem';

const { Text, Title } = Typography;

export type UserInfoProps = {
  width: number;
  theme: boolean;
};

const UserInfo: React.FC<UserInfoProps> = ({ theme }) => {
  const { t } = useTranslation('userInfo');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const userData = useAppSelector((s) => s.userData.data);
  const loading = useAppSelector((s: RootState) => s.userData.loading);
  const [form] = Form.useForm();
  const [formState, setFormState] = useState<UserData>({
    age: null,
    gender: null,
    weight: null,
    height: null,
    waistSize: null,
    neckSize: null,
  });

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserData({ uid: user.uid }));
    }
  }, [dispatch, user?.uid]);

  useEffect(() => {
    const newState: UserData = {
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

  const getMaxValue = (key: keyof UserData): number | undefined => {
    switch (key) {
      case 'age':
        return 150;
      case 'weight':
        return 300;
      case 'height':
        return 250;
      case 'waistSize':
        return 200;
      case 'neckSize':
        return 100;
      default:
        return undefined;
    }
  };

  const fields: UserInfoField[] = [
    {
      key: 'name' as keyof UserData,
      label: t('userInfo.fields.name'),
      value: user?.firstName || '',
      editable: false,
      icon: <UserOutlined />,
    },
    {
      key: 'surname' as keyof UserData,
      label: t('userInfo.fields.surname'),
      value: user?.lastName || '',
      editable: false,
      icon: <UserOutlined />,
    },
    {
      key: 'email' as keyof UserData,
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

  const saveField = async (updatedFormState: UserData) => {
    if (!user) return;
    try {
      await dispatch(
        saveUserData({ uid: user.uid, data: updatedFormState })
      ).unwrap();
      setFormState(updatedFormState);
      message.success(t('userInfo.messages.saveSuccess'));
    } catch {
      message.error(t('userInfo.messages.saveFail'));
    }
  };

  const renderValue = (
    key: keyof UserData,
    value: unknown
  ): string | number => {
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
        style={{
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className={`modern-user-profile ${theme ? 'dark' : ''}`}
      >
        <Form form={form} style={{ width: '100%' }}>
          <Card
            className={`profile-container ${theme ? 'dark' : ''}`}
            style={{
              border: 'none',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <div className="profile-header-container">
              <div className="profile-avatar-container">
                <UserAvatar className="profile-avatar" size={80} user={user!} />
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
                  <UserInfoItem
                    key={field.key}
                    field={field}
                    formState={formState}
                    getPlaceholder={getPlaceholder}
                    getMaxValue={getMaxValue}
                    renderValue={renderValue}
                    onSave={(key, value) => {
                      const updatedFormState = { ...formState, [key]: value };
                      setFormState(updatedFormState);
                      saveField(updatedFormState);
                    }}
                  />
                ))}
              </Row>
            </div>
          </Card>
        </Form>
      </motion.div>
    </Spin>
  );
};

export default UserInfo;
