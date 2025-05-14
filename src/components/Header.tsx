import {Button,Dropdown, Flex, type MenuProps, Switch, Tabs, type TabsProps,} from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {ExperimentOutlined, HomeOutlined, LogoutOutlined, MedicineBoxOutlined, MenuOutlined, MoonOutlined, SettingOutlined, SunOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import '../assets/styles/header.css';

const burgerItems: MenuProps['items'] = [
    {
        label: <NavLink to={'/'}>Home</NavLink>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <NavLink to="/">Analysis</NavLink>,
        key: 'Analysis',
        icon: <ExperimentOutlined />,
    },
    {
        label: <NavLink to="/">Your AI Doctor</NavLink>,
        key: 'Doctor',
        icon: <MedicineBoxOutlined />
    },
    {
        label: <NavLink to="/about-us">About Us</NavLink>,
        key: 'About',
        icon: <TeamOutlined />,
    },
];

const userItems: MenuProps['items'] = [
    {
        key:'profile',
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
        key: 'doctor',
        label: 'Your AI Doctor',
        icon: <MedicineBoxOutlined />
    },
    {
        key: 'about',
        label: 'About Us',
        icon: <TeamOutlined />
    },
];

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleTabClick = (key: string) => {
      switch (key) {
          case 'home':
              navigate('/');
              break;
          case 'analysis':
              navigate('/analysis');
              break;
          case 'about':
              navigate('/about-us');
              break;
          case 'doctor':
              navigate('/ai-doctor');
              break;
      }
  }


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
        justify="space-around"
        align="middle"
        style={{ width: '100%', height: 40 }}
      >
        {width < 820 ? (
            <Dropdown menu={{ items: burgerItems }}>
                <MenuOutlined style={{ fontSize: 30 }} />
            </Dropdown>
        ) : (
            <Tabs
                onTabClick={handleTabClick}
                className="custom-tabs" size={'middle'} items={items}>
            </Tabs>
        )}
        <div className={'Right-buttons'}>
          <Dropdown menu={{ items: userItems }}>
            <Button className="user-button">
              <UserOutlined style={{ fontSize: 20 }}/>
              arayik@gmail.com
            </Button>
          </Dropdown>
          <Switch
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
          />
        </div>
      </Flex>
    </header>
  );
};

export { Header };
