import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from "react-redux";

const PublicRoute = () => {
  //   const { user, loading } = useSelector((state) => state.auth);
  //   if (loading) return null;
  return false ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
