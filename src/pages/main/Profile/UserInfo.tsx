import React, { useEffect, useState } from 'react';
import {
  Typography,
  InputNumber,
  Select,
  Button,
  message,
  Row,
  Col,
  Space,
  Tooltip,
  Spin,
} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  QuestionCircleOutlined,
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

const { Text } = Typography;
const { Option } = Select;

const UserInfo: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const userData = useAppSelector((s) => s.userData.data);
  const isDarkMode = useAppSelector((s: RootState) => s.theme.isDarkMode);
  const [editingKey, setEditingKey] = useState<keyof UserData | null>(null);
  const loading = useAppSelector((s: RootState) => s.userData.loading);

  const [editingValue, setEditingValue] = useState<string | number | null>(
    null
  );
  const [isEditingAll, setIsEditingAll] = useState(false);
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
    setFormState({
      age: userData?.age ?? null,
      gender: userData?.gender ?? null,
      weight: userData?.weight ?? null,
      height: userData?.height ?? null,
      waistSize: userData?.waistSize ?? null,
      neckSize: userData?.neckSize ?? null,
    });
  }, [userData]);

  const getPlaceholder = (key: keyof UserData): string | undefined => {
    return t(`userInfo.placeholders.${key}`);
  };

  const fields: Array<{
    key: keyof UserData | 'name' | 'surname' | 'email';
    label: string;
    value?: string;
    editable?: boolean;
    tooltip?: string;
  }> = [
    {
      key: 'name',
      label: t('userInfo.name'),
      value: user?.firstName || '',
      editable: false,
    },
    {
      key: 'surname',
      label: t('userInfo.surname'),
      value: user?.lastName || '',
      editable: false,
    },
    {
      key: 'email',
      label: t('userInfo.email'),
      value: user?.email || '',
      editable: false,
    },
    { key: 'age', label: t('userInfo.age'), editable: true },
    { key: 'gender', label: t('userInfo.gender'), editable: true },
    { key: 'weight', label: t('userInfo.weight'), editable: true },
    { key: 'height', label: t('userInfo.height'), editable: true },
    {
      key: 'waistSize',
      label: t('userInfo.waistSize'),
      editable: true,
      tooltip: t('userInfo.waistSizeTooltip'),
    },
    {
      key: 'neckSize',
      label: t('userInfo.neckSize'),
      editable: true,
      tooltip: t('userInfo.neckSizeTooltip'),
    },
  ];

  const handleInputChange = (key: keyof UserData, value: number | null) => {
    setFormState({ ...formState, [key]: value });
  };

  const startSingleEdit = (
    key: keyof UserData,
    value: number | string | null
  ) => {
    setEditingKey(key);
    setEditingValue(value);
  };

  const cancelSingleEdit = () => {
    setEditingKey(null);
    setEditingValue(null);
  };

  const saveSingleEdit = async () => {
    if (!user || editingKey === null) return;
    try {
      await dispatch(
        saveUserData({
          uid: user.uid,
          data: { [editingKey]: editingValue ?? null } as Partial<UserData>,
        })
      ).unwrap();
      message.success(t('userInfo.saveSuccess'));
      cancelSingleEdit();
    } catch {
      message.error(t('userInfo.saveFail'));
    }
  };

  const saveAll = async () => {
    if (!user) return;
    try {
      await dispatch(saveUserData({ uid: user.uid, data: formState })).unwrap();
      message.success(t('userInfo.saveSuccess'));
      setIsEditingAll(false);
    } catch {
      message.error(t('userInfo.saveFail'));
    }
  };

  const cancelAll = () => {
    setFormState({
      age: userData?.age ?? null,
      gender: userData?.gender ?? null,
      weight: userData?.weight ?? null,
      height: userData?.height ?? null,
      waistSize: userData?.waistSize ?? null,
      neckSize: userData?.neckSize ?? null,
    });
    setIsEditingAll(false);
  };

  const renderValue = (key: string, value: unknown): string | number => {
    if (value === null || value === '' || value === undefined)
      return t('userInfo.notSet');
    if (key === 'gender' && typeof value === 'string')
      return t(`userInfo.${value.toLowerCase()}`);
    return value as string | number;
  };

  return (
    <Spin
      spinning={loading}
      tip={t('userInfo.loading')}
      className={isDarkMode ? 'dark-spin' : ''}
    >
      <div className={`user-info-list ${isDarkMode ? 'dark' : 'light'}`}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 16 }}
        >
          <Col>
            <Text strong style={{ fontSize: 18 }}>
              {t('userInfo.title')}
            </Text>
          </Col>
          <Col>
            {!isEditingAll ? (
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditingAll(true)}
              >
                {t('userInfo.edit')}
              </Button>
            ) : (
              <Space>
                <Button type="primary" onClick={saveAll}>
                  {t('userInfo.save')}
                </Button>
                <Button onClick={cancelAll}>{t('userInfo.cancel')}</Button>
              </Space>
            )}
          </Col>
        </Row>

        {fields.map(({ key, label, value, editable, tooltip }) => (
          <Row key={key} className="user-info-row" gutter={16} align="middle">
            <Col span={8} className="user-info-label">
              <Text strong>
                {label}{' '}
                {tooltip && (
                  <Tooltip title={tooltip}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                )}
              </Text>
            </Col>
            <Col span={16} className="user-info-value">
              {editingKey === key ? (
                <div className="editable-cell">
                  {key === 'gender' ? (
                    <Select
                      value={editingValue as string}
                      onChange={(v) => setEditingValue(v)}
                      className="cell-input"
                      placeholder={getPlaceholder(key)}
                    >
                      <Option value="Male">{t('userInfo.male')}</Option>
                      <Option value="Female">{t('userInfo.female')}</Option>
                    </Select>
                  ) : (
                    <InputNumber
                      value={editingValue as number}
                      onChange={(v) => setEditingValue(v)}
                      className="cell-input"
                      min={0}
                      placeholder={getPlaceholder(key as keyof UserData)}
                    />
                  )}
                  <div className="cell-actions">
                    <Button
                      icon={<CheckOutlined />}
                      size="small"
                      onClick={saveSingleEdit}
                    />
                    <Button
                      icon={<CloseOutlined />}
                      size="small"
                      onClick={cancelSingleEdit}
                    />
                  </div>
                </div>
              ) : isEditingAll && editable ? (
                key === 'gender' ? (
                  <Select
                    value={formState[key as keyof UserData] as string}
                    onChange={(v) => setFormState({ ...formState, [key]: v })}
                    className="cell-input"
                    placeholder={getPlaceholder(key as keyof UserData)}
                  >
                    <Option value="Male">{t('userInfo.male')}</Option>
                    <Option value="Female">{t('userInfo.female')}</Option>
                  </Select>
                ) : (
                  <InputNumber
                    value={formState[key as keyof UserData] as number}
                    onChange={(v) =>
                      handleInputChange(key as keyof UserData, v)
                    }
                    className="cell-input"
                    min={0}
                    placeholder={getPlaceholder(key as keyof UserData)}
                  />
                )
              ) : (
                <div
                  onDoubleClick={() =>
                    editable &&
                    startSingleEdit(
                      key as keyof UserData,
                      (formState[key as keyof UserData] ?? value) || ''
                    )
                  }
                  className={`user-info-static ${editable ? 'editable' : 'readonly'}`}
                >
                  <Text>
                    {renderValue(
                      key,
                      formState[key as keyof UserData] ?? value
                    )}
                  </Text>
                </div>
              )}
            </Col>
          </Row>
        ))}
      </div>
    </Spin>
  );
};

export default UserInfo;
