import {
  Button,
  Dropdown,
  Flex,
  type MenuProps,
  Tabs,
  type TabsProps,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ExperimentOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
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
  },
  {
    label: <NavLink to="/about-us">About Us</NavLink>,
    key: 'About',
  },
];

const userItems: MenuProps['items'] = [
  {
    key: 'logout',
    label: <NavLink to={'/'}>Logout</NavLink>,
    icon: <LogoutOutlined />,
  },
];

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const items: TabsProps['items'] = [
    {
      label: <span onClick={() => navigate('/')}>Home</span>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <span onClick={() => navigate('/')}>Analysis</span>,
      key: 'analysis',
      icon: <ExperimentOutlined />,
    },
    {
      key: 'doctor',
      label: <span onClick={() => navigate('/ai-doctor')}>Your AI Doctor</span>,
    },
    {
      key: 'about-us',
      label: <span onClick={() => navigate('/about-us')}>About Us</span>,
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
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #e8e8e8',
        padding: 5,
        backgroundColor: 'rgba(154, 154, 154, 0.77)',
        backdropFilter: 'blur(5px)',
      }}
    >
      <Flex
        justify="space-around"
        align="middle"
        style={{ width: '100%', height: 40 }}
      >
        {width < 820 ? (
          <div>
            <Dropdown menu={{ items: burgerItems }}>
              <MenuOutlined style={{ fontSize: 30 }} />
            </Dropdown>
          </div>
        ) : (
          <div>
            <Tabs className="custom-tabs" size={'middle'} items={items}></Tabs>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Dropdown menu={{ items: userItems }}>
            <Button
              style={{
                backgroundColor: 'transparent',
                color: 'black',
                border: 'none',
                fontSize: 16,
              }}
            >
              <UserOutlined style={{ fontSize: 20 }} />
              arayik@gmail.com
            </Button>
          </Dropdown>
        </div>
      </Flex>
    </header>
  );
};

export { Header };
