import { useState } from 'react';
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Button,
  Space,
  Drawer,
  Typography,
  Grid,
} from 'antd';
import {
  LogoutOutlined,
  UserOutlined,
  MenuOutlined,
  DownOutlined,
  MoreOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  RobotOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logoutUser } from '../app/slices/authSlice';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/photos/Logo.svg';
import '../assets/styles/Header.css';
import PreferencesDropdown from './preferences/PreferencesDropdown';

const { Header } = Layout;
const { Text } = Typography;

const mainMenuItems = [
  { label: <NavLink to="/">Home</NavLink>, key: '/', icon: <HomeOutlined /> },
  {
    label: <NavLink to="/my-health">My Health</NavLink>,
    key: '/my-health',
    icon: <MedicineBoxOutlined />,
  },
  {
    label: 'Analysis',
    key: 'analysis',
    icon: <ExperimentOutlined />,
    children: [
      {
        label: <NavLink to="/analysis/blood-test">Blood Test</NavLink>,
        key: '/analysis/blood-test',
      },
      {
        label: <NavLink to="/analysis/vitamin-test">Vitamin Test</NavLink>,
        key: '/analysis/vitamin-test',
      },
      {
        label: <NavLink to="/analysis/urine-test">Urine Test</NavLink>,
        key: '/analysis/urine-test',
      },
      {
        label: <NavLink to="/analysis/genetic-test">Genetic Test</NavLink>,
        key: '/analysis/genetic-test',
      },
    ],
  },
  {
    label: <NavLink to="/ai-doctor">AI Doctor</NavLink>,
    key: '/ai-doctor',
    icon: <RobotOutlined />,
  },
  {
    label: <NavLink to="/about-us">About Us</NavLink>,
    key: '/about-us',
    icon: <TeamOutlined />,
  },
];

export default function AppHeader() {
  const { t } = useTranslation('global');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAppSelector((s) => s.auth.user);
  const isDarkMode = useAppSelector((s) => s.theme.isDarkMode);
  const screens = Grid.useBreakpoint();
  const showDrawer = screens.xs;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [usrMenuOpen, setUsrMenuOpen] = useState(false);

  return (
    <Header className={`app-header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="app-header-container">
        <div className="header-left">
          <img src={Logo} alt="logo" className="logo" />
          {showDrawer && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              className="hamburger-btn"
              onClick={() => setDrawerOpen(true)}
            />
          )}
        </div>

        {!showDrawer && (
          <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode="horizontal"
            selectedKeys={[pathname]}
            items={mainMenuItems}
            overflowedIndicator={<MoreOutlined style={{ fontSize: 18 }} />}
            className="nav-menu"
            style={{ minWidth: 0, flex: 'auto' }}
          />
        )}

        <div className="header-right">
          <Space size="middle">
            <PreferencesDropdown />
            {user ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'profile',
                      icon: <UserOutlined />,
                      label: (
                        <NavLink to="/profile/info">
                          {t('menu.profile')}
                        </NavLink>
                      ),
                    },
                    {
                      key: 'logout',
                      icon: <LogoutOutlined className="logout-link" />,
                      label: (
                        <span
                          onClick={() => {
                            dispatch(logoutUser());
                            navigate('/');
                          }}
                          className="logout-link"
                        >
                          {t('menu.logout')}
                        </span>
                      ),
                    },
                  ],
                }}
                open={usrMenuOpen}
                onOpenChange={setUsrMenuOpen}
                placement="bottomRight"
                overlayClassName={
                  isDarkMode ? 'dropdown-dark' : 'dropdown-light'
                }
              >
                <div className={`user-profile ${isDarkMode ? 'dark' : ''}`}>
                  <Avatar size="small" src={user?.photoURL}>
                    {!user.photoURL && (user.firstName ?? ' ')[0]}
                  </Avatar>
                  <Text className={`username ${isDarkMode ? 'dark' : ''}`}>
                    {user.firstName} {user.lastName}
                  </Text>
                  <span
                    className={`arrow-icon ${usrMenuOpen ? 'rotated' : ''}`}
                  >
                    <DownOutlined />
                  </span>
                </div>
              </Dropdown>
            ) : (
              <Button
                type="primary"
                className={`username ${isDarkMode ? 'dark' : ''}`}
                onClick={() => navigate('/auth/login')}
              >
                {t('menu.login', 'Log In')}
              </Button>
            )}
          </Space>
        </div>

        <Drawer
          className={isDarkMode ? 'dark-drawer' : ''}
          title="Menu"
          placement="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          styles={{ body: { padding: 0 } }}
        >
          <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode="vertical"
            selectedKeys={[pathname]}
            items={mainMenuItems}
            onClick={() => setDrawerOpen(false)}
          />
        </Drawer>
      </div>
    </Header>
  );
}
