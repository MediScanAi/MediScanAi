import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/main/HomePage";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/",
        element: <div>Layout</div>,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "*",
                element: <div>Page not found</div>
            }
        ]
    }
]);

export default router;