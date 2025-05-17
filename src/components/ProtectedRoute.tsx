import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import type { RootState } from '../app/store';
import React from 'react';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, loading } = useSelector((s: RootState) => s.auth);

  if (loading) return <Spin fullscreen />;
  if (!user) return <Navigate to="/auth/login" replace />;
  return children ?? <Outlet />;
};

export default ProtectedRoute;
