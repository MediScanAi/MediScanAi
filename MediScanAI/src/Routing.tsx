import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/main/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/ai-doctor",
        element: <div>AI Doctor page</div>,
      },
      //...
    ],
  },
  { path: "*", element: <Navigate to={"/"} replace /> },
]);

export default router;
