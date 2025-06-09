import AppHeader from './Header.tsx';
import Footer from './Footer.tsx';
import { useLocation } from 'react-router-dom';
import '../../assets/styles/components/layout/layout.css';
import { useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const hideFooter = location.pathname.startsWith('/ai-doctor');

  return (
    <>
      <AppHeader />
      <div className="main-content">{children}</div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
