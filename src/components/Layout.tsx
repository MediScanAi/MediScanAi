import { Header } from './Header.tsx';
import { Footer } from './Footer.tsx';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/ai-doctor') || location.pathname.startsWith('/my-health');

  return (
    <>
      <Header />
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
