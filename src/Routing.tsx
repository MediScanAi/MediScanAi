import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/main/HomePage';
import AboutUsPage from './pages/main/AboutUsPage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import BloodAnalysis from './pages/analysis/BloodAnalysis';
import VitaminAnalysis from './pages/analysis/VitaminAnalysis';
import UrineAnalysis from './pages/analysis/UrineAnalysis';
import GeneticAnalysis from './pages/analysis/GeneticAnalysis';
import ChatWithAI from './pages/main/ChatWithAI';
import RootForm from './components/testsform/RootForm';
import Profile from './pages/profile/Profile';
import PageNotFound from './pages/main/PageNotFound';
import MyHealth from './pages/health/MyHealth';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/about-us',
    element: (
      <Layout>
        <AboutUsPage />
      </Layout>
    ),
  },

  {
    path: '/auth',
    element: <PublicRoute />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { index: true, element: <Navigate to="login" replace /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/my-health',
        element: (
          <Layout>
            <MyHealth />
          </Layout>
        ),
      },
      {
        path: '/analysis/blood-test',
        element: (
          <Layout>
            <BloodAnalysis />
          </Layout>
        ),
      },
      {
        path: '/analysis/vitamin-test',
        element: (
          <Layout>
            <VitaminAnalysis />
          </Layout>
        ),
      },
      {
        path: '/analysis/urine-test',
        element: (
          <Layout>
            <UrineAnalysis />
          </Layout>
        ),
      },
      {
        path: '/analysis/genetic-test',
        element: (
          <Layout>
            <GeneticAnalysis />
          </Layout>
        ),
      },
      {
        path: '/ai-doctor',
        element: (
          <Layout>
            <ChatWithAI />
          </Layout>
        ),
      },
      {
        path: '/tests-form/:testType',
        element: (
          <Layout>
            <RootForm />
          </Layout>
        ),
      },
      {
        path: '/profile/:type',
        element: (
          <Layout>
            <Profile />
          </Layout>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Layout>
        <PageNotFound />
      </Layout>
    ),
  },
]);

export default router;
