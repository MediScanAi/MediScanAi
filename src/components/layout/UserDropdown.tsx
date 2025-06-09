import { useState } from 'react';
import { Dropdown, Typography } from 'antd';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '../../app/slices/authSlice';
import UserAvatar from '../common/UserAvatar';
import '../../assets/styles/components/layout/user-dropdown.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { AuthUser } from '../../api/authApi';

const { Text } = Typography;

const UserDropdown: React.FC<{ user: AuthUser }> = ({ user }) => {
  const { t } = useTranslation('header');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <span>{t('menu.profile')}</span>,
      onClick: () => navigate('/profile/info'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined className="logout-link" />,
      label: <span className="logout-link">{t('menu.logout')}</span>,
      onClick: () => {
        dispatch(logoutUser());
        navigate('/');
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      overlayClassName={isDarkMode ? 'dropdown-dark' : 'dropdown-light'}
    >
      <div className={`user-profile ${isDarkMode ? 'dark' : ''}`}>
        <UserAvatar user={user} size="small" />
        <Text className={`username ${isDarkMode ? 'dark' : ''}`}>
          {user.firstName} {user.lastName}
        </Text>
        <span className={`arrow-icon ${open ? 'rotated' : ''}`}>
          <DownOutlined />
        </span>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
