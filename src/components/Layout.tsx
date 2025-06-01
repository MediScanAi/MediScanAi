import AppHeader from './Header.tsx';
import { Footer } from './Footer.tsx';
import { useLocation } from 'react-router-dom';
import '../assets/styles/layout.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideFooter =
    location.pathname.startsWith('/ai-doctor');

  return (
    <>
      <AppHeader />
      <div className="main-content">{children}</div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
