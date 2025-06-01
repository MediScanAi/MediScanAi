import {
  DownOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Switch } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguagePicker from './LanguagePicker';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleTheme } from '../../app/slices/theme';
import '../../assets/styles/preferencesDropdown.css';
const PreferencesDropdown = () => {
  const { t } = useTranslation('global');
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();
  const [prefMenuOpen, setPrefMenuOpen] = useState(false);
  const prefsContent = (
    <div className="preferences-dropdown">
      <div className="preference-item">
        <span>{t('menu.selectLanguage')}</span>
        <LanguagePicker />
      </div>
      <div className="preference-item">
        <span>{t('menu.selectTheme')}</span>
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
  );
};


export default PreferencesDropdown;