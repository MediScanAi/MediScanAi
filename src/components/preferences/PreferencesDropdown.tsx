import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguagePicker from './LanguagePicker';
import { useAppSelector } from '../../app/hooks';
import '../../assets/styles/components/preferences/preferences-dropdown.css';
import ThemePicker from './ThemePicker';

const PreferencesDropdown = () => {
  const { t } = useTranslation('header');
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const [prefMenuOpen, setPrefMenuOpen] = useState(false);

  document.body.classList.toggle('dark', isDarkMode); // apply dark mode to <body>

  const prefsContent = (
    <div className="preferences-dropdown">
      <div className="preference-item">
        <span>{t('menu.selectLanguage')}</span>
        <LanguagePicker />
      </div>
      <div className="preference-item">
        <span>{t('menu.selectTheme')}</span>
        <ThemePicker />
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
