import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setThemeMode } from '../../app/slices/themeModeSlice';
import { MoonOutlined, SunOutlined, LaptopOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/ThemePicker.css';

const ThemePicker = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('global');
    const themeMode = useAppSelector((state) => state.theme.themeMode);
    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
    
    const themeOptions = [
      {
        label: (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <LaptopOutlined style={{ marginRight: 8 }} />
            {t('themePicker.system')}
          </span>
        ),
        value: 'system',
      },
      {
        label: (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <SunOutlined style={{ marginRight: 8 }} />
            {t('themePicker.light')}
          </span>
        ),
        value: 'light',
      },
      {
        label: (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <MoonOutlined style={{ marginRight: 8 }} />
            {t('themePicker.dark')}
          </span>
        ),
        value: 'dark',
      },
    ];

  return (
    <Select
      value={themeMode}
      options={themeOptions.map((option) => ({
        ...option,
        label: (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {option.label}
          </span>
        ),
      }))}
      onChange={(mode) => dispatch(setThemeMode(mode))}
      className={`theme-select ${isDarkMode ? 'dark' : ''}`}
      popupMatchSelectWidth={false}
      classNames={{
        popup: {
          root: isDarkMode ? 'theme-dropdown-dark' : undefined,
        },
      }}
      style={{ width: 110 }}
    />
  );
};

export default ThemePicker;
