import {
  Avatar,
  Dropdown,
  Flex,
  type MenuProps,
  Select,
  Switch,
  Menu,
  Button,
  Space,
  Image,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  DownOutlined,
  ExperimentOutlined,
  HomeOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
  MenuOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  TeamOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import '../assets/styles/header.css';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { toggleTheme } from '../app/slices/theme';
import { logoutUser } from '../app/slices/authSlice';
import { useTranslation } from 'react-i18next';
import engFlag from '../assets/photos/united-kingdom.png';
import rusFlag from '../assets/photos/russia.png';
import armFlag from '../assets/photos/armenia.png';
import Logo from '../assets/photos/Logo.svg';

function Header() {
  const { t, i18n } = useTranslation('global');
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const activeKey =
    useLocation().pathname === '/'
      ? 'home'
      : useLocation().pathname.substring(1);
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const menuItems: MenuProps['items'] = [
    {
      label: (
        <span>
          <HomeOutlined /> {t('menu.home')}
        </span>
      ),
      key: 'home',
    },
    {
      label: (
        <span>
          <MedicineBoxOutlined /> {t('menu.myHealth')}
        </span>
      ),
      key: 'my-health',
    },
    {
      label: (
        <span>
          <ExperimentOutlined /> {t('menu.analysis')}
        </span>
      ),
      key: 'analysis',
      children: [
        {
          label: t('menu.bloodTest'),
          key: 'blood-test',
        },
        {
          label: t('menu.urineTest'),
          key: 'urine-test',
        },
        {
          label: t('menu.vitaminTest'),
          key: 'vitamin-test',
        },
        {
          label: t('menu.geneticTest'),
          key: 'genetic-test',
        },
      ],
    },
    {
      label: (
        <span>
          <MedicineBoxOutlined /> {t('menu.aiDoctor')}
        </span>
      ),
      key: 'ai-doctor',
    },
    {
      label: (
        <span>
          <TeamOutlined /> {t('menu.aboutUs')}
        </span>
      ),
      key: 'about-us',
    },
  ];

  const analysisItems: MenuProps['items'] = [
    {
      label: (
        <NavLink to={'/analysis/blood-test'}>{t('menu.bloodTest')}</NavLink>
      ),
      key: 'blood-test',
      icon: <MedicineBoxOutlined />,
    },
    {
      label: (
        <NavLink to={'/analysis/urine-test'}>{t('menu.urineTest')}</NavLink>
      ),
      key: 'urine-test',
      icon: <MedicineBoxOutlined />,
    },
    {
      label: (
        <NavLink to={'/analysis/vitamin-test'}>{t('menu.vitaminTest')}</NavLink>
      ),
      key: 'vitamin-test',
      icon: <MedicineBoxOutlined />,
    },
    {
      label: (
        <NavLink to={'/analysis/genetic-test'}>{t('menu.geneticTest')}</NavLink>
      ),
      key: 'genetic-test',
      icon: <MedicineBoxOutlined />,
    },
  ];

  const burgerItems: MenuProps['items'] = [
    {
      label: <NavLink to={'/'}>{t('menu.home')}</NavLink>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <NavLink to={'/my-health'}>{t('menu.myHealth')}</NavLink>,
      key: 'my-health',
      icon: <MedicineBoxOutlined />,
    },
    {
      label: (
        <Dropdown trigger={['hover']} menu={{ items: analysisItems }}>
          <div style={{ height: '100%', width: '100%' }}>
            <ExperimentOutlined /> {t('menu.analysis')}
          </div>
        </Dropdown>
      ),
      key: 'analysis',
    },
    {
      label: <NavLink to="/ai-doctor">{t('menu.aiDoctor')}</NavLink>,
      key: 'ai-doctor',
      icon: <MedicineBoxOutlined />,
    },
    {
      label: <NavLink to="/about-us">{t('menu.aboutUs')}</NavLink>,
      key: 'about-us\n',
      icon: <TeamOutlined />,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'home':
        navigate('/');
        break;
      case 'about-us':
        navigate('/about-us');
        break;
      case 'ai-doctor':
        navigate('/ai-doctor');
        break;
      case 'my-health':
        navigate('/my-health');
        break;
      case 'blood-test':
        navigate('/analysis/blood-test');
        break;
      case 'urine-test':
        navigate('/analysis/urine-test');
        break;
      case 'vitamin-test':
        navigate('/analysis/vitamin-test');
        break;
      case 'genetic-test':
        navigate('/analysis/genetic-test');
        break;
    }
  };

  const toggleArrow = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  });

  const userItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <NavLink to={'/profile/info'}>{t('menu.profile')}</NavLink>,
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: (
        <NavLink onClick={() => dispatch(logoutUser())} to={'/'}>
          {t('menu.logout')}
        </NavLink>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  const options = [
    {
      label: (
        <div className={'language-options'}>
          <img style={{ height: '20px' }} src={engFlag} /> ENG
        </div>
      ),
      value: 'en',
    },
    {
      label: (
        <div className={'language-options'}>
          <img style={{ height: '20px' }} src={rusFlag} /> RUS
        </div>
      ),
      value: 'ru',
    },
    {
      label: (
        <div className={'language-options'}>
          <img style={{ height: '20px' }} src={armFlag} /> ARM
        </div>
      ),
      value: 'hy',
    },
  ];

  return (
    <header>
      <Flex
        className={'Header' + ' ' + (theme ? 'dark-Header' : '')}
        justify="space-around"
        align="middle"
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image preview={false} height={30} src={Logo} />
          {width < 820 ? (
            <Dropdown trigger={['click']} menu={{ items: burgerItems }}>
              <MenuOutlined style={{ fontSize: 30 }} />
            </Dropdown>
          ) : (
            <Menu
              onClick={handleMenuClick}
              className="custom-menu"
              mode="horizontal"
              selectedKeys={[
                activeKey.includes('analysis/') ? 'analysis' : activeKey,
              ]}
              items={menuItems}
            />
          )}
        </div>
        <div className={'Right-buttons'}>
          {user ? (
            <Dropdown
              trigger={['click']}
              menu={{ items: userItems }}
              onOpenChange={toggleArrow}
            >
              <div
                className={'user-button' + (theme ? ' dark-user-button' : '')}
              >
                <Avatar style={{ fontSize: 20 }}>
                  {user?.email ? user?.email[0].toUpperCase() : 'Profile'}
                </Avatar>
                {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
              </div>
            </Dropdown>
          ) : (
            <Button
              onClick={() => navigate('/auth/login')}
              ghost
              variant={'text'}
              style={{ border: 'none', color: theme ? 'white' : 'black' }}
            >
              Log In
            </Button>
          )}
          <Switch
            defaultChecked={!theme}
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            onClick={handleThemeChange}
          />
          <Select
            onChange={(value) => {
              i18n.changeLanguage(value);
              localStorage.setItem('language', value);
            }}
            defaultValue={i18n.language}
            variant={'borderless'}
            options={options}
            optionRender={(option) => {
              return <Space>{option.data.label}</Space>;
            }}
            className={theme ? 'dark-select-selector' : ''}
            style={{ width: 100, backgroundColor: 'transparent' }}
          />
        </div>
      </Flex>
    </header>
  );
}

export { Header };
