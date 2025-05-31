import { useState } from 'react';
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Switch,
  Select,
  Button,
  Space,
  Drawer,
  Typography,
  Grid,
} from 'antd';
import {
  SunOutlined,
  MoonOutlined,
  LogoutOutlined,
  SettingOutlined,
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
import { toggleTheme } from '../app/slices/theme';
import { logoutUser } from '../app/slices/authSlice';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/photos/Logo.svg';
import engFlag from '../assets/photos/united-kingdom.png';
import rusFlag from '../assets/photos/russia.png';
import armFlag from '../assets/photos/armenia.png';
import '../assets/styles/Header.css';

const { Header } = Layout;
const { Text } = Typography;

const languageOptions = [
  {
    label: (
      <div className="language-option">
        <img src={engFlag} alt="EN" style={{ height: 16 }} />
        <span style={{ marginLeft: 8 }}>ENG</span>
      </div>
    ),
    value: 'en',
  },
  {
    label: (
      <div className="language-option">
        <img src={rusFlag} alt="RU" style={{ height: 16 }} />
        <span style={{ marginLeft: 8 }}>РУС</span>
      </div>
    ),
    value: 'ru',
  },
  {
    label: (
      <div className="language-option">
        <img src={armFlag} alt="HY" style={{ height: 16 }} />
        <span style={{ marginLeft: 8 }}>ՀԱՅ</span>
      </div>
    ),
    value: 'hy',
  },
];

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
  const { t, i18n } = useTranslation('global');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAppSelector((s) => s.auth.user);
  const isDarkMode = useAppSelector((s) => s.theme.isDarkMode);
  const screens = Grid.useBreakpoint();
  const showDrawer = screens.xs;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [usrMenuOpen, setUsrMenuOpen] = useState(false);
  const [prefMenuOpen, setPrefMenuOpen] = useState(false);

  const prefsContent = (
    <div className="preferences-dropdown">
      <div className="preference-item">
        <span>{t('menu.selectLanguage')}</span>
        <Select
          value={i18n.language}
          options={languageOptions}
          onChange={(lng) => {
            i18n.changeLanguage(lng);
            localStorage.setItem('language', lng);
          }}
          className={`lang-select ${isDarkMode ? 'dark' : ''}`}
          popupMatchSelectWidth={false}
          classNames={{
            popup: {
              root: isDarkMode ? 'lang-dropdown-dark' : undefined,
            },
          }}
        />
      </div>
      <div className="preference-item">
        <span>{t('menu.selectLanguage')}</span>
        <Switch
          checked={isDarkMode}
          onChange={() => dispatch(toggleTheme())}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </div>
    </div>
  );

  return (
    <Header className={`app-header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="header-container">
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
            <Dropdown
              menu={{ items: [] }}
              open={prefMenuOpen}
              popupRender={() => prefsContent}
              onOpenChange={setPrefMenuOpen}
              placement="bottomRight"
              overlayClassName={isDarkMode ? 'dropdown-dark' : 'dropdown-light'}
            >
              <div className={`settings-btn ${isDarkMode ? 'dark' : ''}`}>
                <Button
                  type="text"
                  size="large"
                  icon={
                    <SettingOutlined
                      className={`settings-icon ${prefMenuOpen ? 'spinning' : 're-spinning'}`}
                    />
                  }
                ></Button>
                <span className={`arrow-icon ${prefMenuOpen ? 'rotated' : ''}`}>
                  <DownOutlined />
                </span>
              </div>
            </Dropdown>

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
                      icon: <LogoutOutlined className='logout-link'/>,
                      label: (
                        <span
                          onClick={() => {
                            dispatch(logoutUser());
                            navigate('/');
                          }}
                          className='logout-link'
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
