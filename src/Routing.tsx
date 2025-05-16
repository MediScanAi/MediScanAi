import { createBrowserRouter, Navigate } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/main/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import AboutUsPage from './pages/main/AboutUsPage';
import Layout from './components/Layout.tsx';
import AnalysisPage from './pages/main/analysis/AnalysisPage.tsx';
import RootForm from './pages/main/testsform/RootForm.tsx';
import ChatWithAI from './pages/main/ChatWithAI.tsx';
import Profile from './pages/main/Profile/Profile.tsx';
import BloodAnalysis from './pages/main/analysis/BloodAnalysis.tsx';
import VitaminAnalysis from './pages/main/analysis/VitaminAnalysis.tsx';
import UrineAnalysis from './pages/main/analysis/UrineAnalysis.tsx';
import GeneticAnalysis from './pages/main/analysis/GeneticAnalysis.tsx';

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        index: true,
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
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/analysis',
        element: (
          <Layout>
            <AnalysisPage />
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
        path: '/profile',
        element: (
          <Layout>
            <Profile />
          </Layout>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to={'/'} replace /> },
]);

export default router;
