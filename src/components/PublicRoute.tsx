import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { Spin } from 'antd';

const PublicRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, loading } = useSelector((s: RootState) => s.auth);

  if (loading) return <Spin fullscreen/>;
  if (user) return <Navigate to="/" replace />;
  return children ?? <Outlet />;
};

export default PublicRoute;
