import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

const ProtectedRoute = () => {
//   const { user, loading } = useSelector((state) => state.auth);

//   if (loading) return <div>Loading...</div>;

  return true ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
