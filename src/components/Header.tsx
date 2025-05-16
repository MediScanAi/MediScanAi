import {
  Dropdown,
  Flex,
  type MenuProps,
  Switch,
  Tabs,
  type TabsProps,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ExperimentOutlined,
  HomeOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
  MenuOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import '../assets/styles/header.css';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { toggleTheme } from '../app/slices/theme';

const burgerItems: MenuProps['items'] = [
  {
    label: <NavLink to={'/'}>Home</NavLink>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <NavLink to="/">Analysis</NavLink>,
    key: 'analysis',
    icon: <ExperimentOutlined />,
  },
  {
    label: <NavLink to="/">Your AI Doctor</NavLink>,
    key: 'ai-doctor',
    icon: <MedicineBoxOutlined />,
  },
  {
    label: <NavLink to="/about-us">About Us</NavLink>,
    key: 'about-us\n',
    icon: <TeamOutlined />,
  },
];

const userItems: MenuProps['items'] = [
  {
    key: 'profile',
    label: <NavLink to={'/profile'}>Profile</NavLink>,
    icon: <SettingOutlined />,
  },
  {
    key: 'logout',
    label: <NavLink to={'/'}>Logout</NavLink>,
    icon: <LogoutOutlined />,
  },
];

const items: TabsProps['items'] = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Analysis',
    key: 'analysis',
    icon: <ExperimentOutlined />,
  },
  {
    key: 'ai-doctor',
    label: 'Your AI Doctor',
    icon: <MedicineBoxOutlined />,
  },
  {
    key: 'about-us',
    label: 'About Us',
    icon: <TeamOutlined />,
  },
];

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const activeKey = useLocation().pathname.substring(1);
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();
  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const handleTabClick = (key: string) => {
    switch (key) {
      case 'home':
        navigate('/');
        break;
      case 'analysis':
        navigate('/analysis');
        break;
      case 'about-us':
        navigate('/about-us');
        break;
      case 'ai-doctor':
        navigate('/ai-doctor');
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header>
      <Flex
        className={'Header' + ' ' + (theme ? 'dark-Header' : '')}
        justify="space-around"
        align="middle"
      >
        {width < 820 ? (
          <Dropdown menu={{ items: burgerItems }}>
            <MenuOutlined style={{ fontSize: 30 }} />
          </Dropdown>
        ) : (
          <div>
            <Tabs
              onTabClick={handleTabClick}
              className="custom-tabs"
              size={'middle'}
              defaultActiveKey={activeKey ? activeKey : 'home'}
              items={items}
              animated={false}
            ></Tabs>
          </div>
        )}
        <div className={'Right-buttons'}>
          <Dropdown menu={{ items: userItems }}>
            <div className={'user-button' + (theme ? ' dark-user-button' : '')}>
              <UserOutlined style={{ fontSize: 20 }} />
              arayik@gmail.com
            </div>
          </Dropdown>
          <Switch
            defaultChecked={theme}
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            onClick={handleThemeChange}
          />
        </div>
      </Flex>
    </header>
  );
};

export { Header };
