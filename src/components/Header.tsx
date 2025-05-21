import {
    Avatar,
    Dropdown,
    Flex,
    type MenuProps,
    Select,
    Switch,
    Menu,
    Button, Space, Image,
} from 'antd';
import { NavLink } from 'react-router-dom';
import {useEffect, useState} from 'react';
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
import Logo from '../assets/photos/Logo.svg'


const options = [
    {
        label:(<div className={'language-options'} ><img style={{width:'20px'}} src={'src/assets/photos/united-kingdom.png'}/><span>ENG</span></div>),
        value: 'english',
    },
    {
        label: (<div className={'language-options'}><img style={{height:'20px'}} src={'src/assets/photos/russia.png'}/> RUS</div>),
        value: 'russian',
    },
    {
        label: (<div className={'language-options'}><img style={{height:'20px'}} src={'src/assets/photos/armenia.png'}/> ARM</div>),
        value: 'armenia',
    },
];

const menuItems: MenuProps['items'] = [
  {
    label: (
      <span>
        <HomeOutlined /> Home
      </span>
    ),
    key: 'home',
  },
  {
    label: (
      <span>
        <ExperimentOutlined /> Analysis
      </span>
    ),
    key: 'analysis',
    children: [
      {
        label: 'Blood Test',
        key: 'blood-test',
      },
      {
        label: 'Urine Test',
        key: 'urine-test',
      },
      {
        label: 'Vitamin Test',
        key: 'vitamin-test',
      },
      {
        label: 'Genetic Test',
        key: 'genetic-test',
      },
    ],
  },
  {
    label: (
      <span>
        <MedicineBoxOutlined /> Your AI Doctor
      </span>
    ),
    key: 'ai-doctor',
  },
  {
    label: (
      <span>
        <TeamOutlined /> About Us
      </span>
    ),
    key: 'about-us',
  },
];

const analysisItems: MenuProps['items'] = [
  {
    label: <NavLink to={'/analysis/blood-test'}>Blood Test</NavLink>,
    key: 'blood-test',
    icon: <MedicineBoxOutlined />,
  },
  {
    label: <NavLink to={'/analysis/urine-test'}>Urine Test</NavLink>,
    key: 'urine-test',
    icon: <MedicineBoxOutlined />,
  },
  {
    label: <NavLink to={'/analysis/vitamin-test'}>Vitamin Test</NavLink>,
    key: 'vitamin-test',
    icon: <MedicineBoxOutlined />,
  },
  {
    label: <NavLink to={'/analysis/genetic-test'}>Genetic Test</NavLink>,
    key: 'genetic-test',
    icon: <MedicineBoxOutlined />,
  },
];

const burgerItems: MenuProps['items'] = [
  {
    label: <NavLink to={'/'}>Home</NavLink>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Dropdown trigger={['hover']} menu={{ items: analysisItems }}>
        <div style={{ height: '100%', width: '100%' }}>
          <ExperimentOutlined /> Analysis
        </div>
      </Dropdown>
    ),
    key: 'analysis',
  },
  {
    label: <NavLink to="/ai-doctor">Your AI Doctor</NavLink>,
    key: 'ai-doctor',
    icon: <MedicineBoxOutlined />,
  },
  {
    label: <NavLink to="/about-us">About Us</NavLink>,
    key: 'about-us\n',
    icon: <TeamOutlined />,
  },
];

function Header() {
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

  useEffect(() => {
      window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      })
      return () => {
          window.removeEventListener('resize', () => {})
      }
  })

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

  const userItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <NavLink to={'/profile/info'}>Profile</NavLink>,
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: (
        <NavLink onClick={() => dispatch(logoutUser())} to={'/'}>
          Logout
        </NavLink>
      ),
      icon: <LogoutOutlined />,
    },
  ];

    return (
        <header>
            <Flex
                className={'Header' + ' ' + (theme ? 'dark-Header' : '')}
                justify="space-around"
                align="middle"
            >
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:(width<820?'30%':'50%')}}>
                <Image
                  preview={false}
                  src={Logo}
                  alt="Logo"
                  height={30}
                />
                {width < 820 ? (
                    <Dropdown trigger={["click"]} menu={{items: burgerItems}}>
                        <MenuOutlined style={{fontSize: 30}}/>
                    </Dropdown>
                ) : (
                        <Menu
                            onClick={handleMenuClick}
                            className="custom-menu"
                            mode="horizontal"
                            selectedKeys={[activeKey.includes('analysis/') ? 'analysis' : activeKey]}
                            items={menuItems}
                        />
                )}
            </div>
                <div className={'Right-buttons'}>
                    {user ? <Dropdown trigger={['click']} menu={{items: userItems}} onOpenChange={toggleArrow}>
                        <div
                            className={'user-button' + (theme ? ' dark-user-button' : '')}
                        >
                            <Avatar style={{fontSize: 20}}>
                                {user?.email ? user?.email[0].toUpperCase() : 'Profile'}
                            </Avatar>
                            {
                                isDropdownOpen ?
                                    <UpOutlined/> :
                                    <DownOutlined/>
                            }
                        </div>
                    </Dropdown> :
                        <Button onClick={()=>navigate('/auth/login')}  ghost variant={"text"} style={{border:'none',color:(theme?'white':'black')}}>
                          Log In
                        </Button>}
                    <Switch
                        defaultChecked={!theme}
                        checkedChildren={<SunOutlined/>}
                        unCheckedChildren={<MoonOutlined/>}
                        onClick={handleThemeChange}
                    />
                    <Select variant={'borderless'} options={options} optionRender={(option)=>{
                        return(
                        <Space>
                            {option.data.label}
                        </Space>
                    )}}  defaultValue="english" className={theme?'dark-select-selector':''} style={{width: 100,backgroundColor:'transparent'}}/>
                </div>
            </Flex>
        </header>
    );
}

export {Header};