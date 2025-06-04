import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import engFlag from '../../assets/photos/united-kingdom.png';
import rusFlag from '../../assets/photos/russia.png';
import armFlag from '../../assets/photos/armenia.png';
import { useAppSelector } from '../../app/hooks';
import '../../assets/styles/components/preferences/languagePicker.css';
const languageOptions = [
  {
    label: (
      <div className="language-option">
        <img draggable={false} src={engFlag} alt="EN" style={{ height: 16 }} />
        <span style={{ marginLeft: 8 }}>ENG</span>
      </div>
    ),
    value: 'en',
  },
  {
    label: (
      <div className="language-option">
        <img draggable={false} src={rusFlag} alt="RU" style={{ height: 16 }} />
        <span style={{ marginLeft: 8 }}>РУС</span>
      </div>
    ),
    value: 'ru',
  },
  {
    label: (
      <div className="language-option">
        <img draggable={false} src={armFlag} alt="HY" style={{ height: 16 }} />
        <span style={{ marginLeft: 8 }}>ՀԱՅ</span>
      </div>
    ),
    value: 'hy',
  },
];
const LanguagePicker = () => {
  const { i18n } = useTranslation('global');
  const isDarkMode = useAppSelector((s) => s.theme.isDarkMode);

  return (
    <Select
      value={i18n.language}
      options={languageOptions}
      onChange={(lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
      }}
      className={`lang-select ${isDarkMode ? 'dark' : ''}`}
      popupMatchSelectWidth={false}
      classNames={{
        popup: {
          root: isDarkMode ? 'lang-dropdown-dark' : undefined,
        },
      }}
    />
  );
};

export default LanguagePicker;
