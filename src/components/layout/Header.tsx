import { useState } from 'react';
import { Layout, Menu, Button, Space, Drawer, Grid } from 'antd';
import {
  MenuOutlined,
  MoreOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';
import logoLight from '../../assets/photos/logo-light.svg';
import logoDark from '../../assets/photos/logo-dark.svg';
import '../../assets/styles/components/layout/header.css';
import PreferencesDropdown from '../preferences/PreferencesDropdown';
import PrimaryButton from '../common/buttons/PrimaryButton';
import LogoWeb from '../../assets/photos/Logo Web.png';
import UserDropdown from './UserDropdown';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const { t } = useTranslation('header');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAppSelector((s) => s.auth.user);
  const isDarkMode = useAppSelector((s) => s.theme.isDarkMode);
  const screens = Grid.useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const showDrawer = screens.xs;

  const mainMenuItems = [
    {
      label: <NavLink to="/">{t('menu.home')}</NavLink>,
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: <NavLink to="/my-health">{t('menu.myHealth')}</NavLink>,
      key: '/my-health',
      icon: <MedicineBoxOutlined />,
    },
    {
      label: t('menu.analysis'),
      key: 'analysis',
      icon: <ExperimentOutlined />,
      children: [
        {
          label: (
            <NavLink to="/analysis/blood-test">{t('menu.bloodTest')}</NavLink>
          ),
          key: '/analysis/blood-test',
        },
        {
          label: (
            <NavLink to="/analysis/vitamin-test">
              {t('menu.vitaminTest')}
            </NavLink>
          ),
          key: '/analysis/vitamin-test',
        },
        {
          label: (
            <NavLink to="/analysis/urine-test">{t('menu.urineTest')}</NavLink>
          ),
          key: '/analysis/urine-test',
        },
        {
          label: (
            <NavLink to="/analysis/genetic-test">
              {t('menu.geneticTest')}
            </NavLink>
          ),
          key: '/analysis/genetic-test',
        },
      ],
    },
    {
      label: <NavLink to="/ai-doctor">{t('menu.aiDoctor')}</NavLink>,
      key: '/ai-doctor',
      icon: <img style={{ width: '18px' }} src={LogoWeb} alt="logo" />,
    },
    {
      label: <NavLink to="/about-us">{t('menu.aboutUs')}</NavLink>,
      key: '/about-us',
      icon: <TeamOutlined />,
    },
  ];

  const navigateHome = (): void => {
    navigate('/');
  };

  return (
    <Header className={`app-header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="app-header-container">
        <div className="header-left">
          <img
            src={isDarkMode ? logoDark : logoLight}
            draggable={false}
            onClick={navigateHome}
            alt="logo"
            className="logo"
          />
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
              <UserDropdown user={user} />
            ) : (
              <PrimaryButton
                style={{ height: '35px' }}
                size="small"
                onClick={() => navigate('/auth/login')}
              >
                {t('menu.login', 'Log In')}
              </PrimaryButton>
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
};

export default AppHeader;
