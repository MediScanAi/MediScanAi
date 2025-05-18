import {
  Avatar,
  Dropdown,
  Flex,
  type MenuProps,
  Select,
  Switch,
  Tabs,
  type TabsProps,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const activeKey = useLocation().pathname.substring(1);
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  console.log(user?.email);
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

  const toggleArrow = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <NavLink to={'/profile/info'}>Profile</NavLink>,
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: (
        <NavLink onClick={() => dispatch(logoutUser())} to={'/auth/login'}>
          Logout
        </NavLink>
      ),
      icon: <LogoutOutlined />,
    },
  ];

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
          <Dropdown trigger={['click']} menu={{ items: burgerItems }}>
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
            <NavLink to={'/auth/login'}>Log In</NavLink>
          )}
          <Switch
            defaultChecked={theme}
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            onClick={handleThemeChange}
          />
          <Select defaultValue="english" style={{ width: 120 }}>
            <Select.Option value="english">ENG</Select.Option>
            <Select.Option value="russian">RUS</Select.Option>
            <Select.Option value="armenian">ARM</Select.Option>
          </Select>
        </div>
      </Flex>
    </header>
  );
}

export { Header };
