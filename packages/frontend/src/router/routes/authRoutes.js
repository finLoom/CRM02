import React from 'react';

// Lazy-load authentication-related components
const LoginPage = React.lazy(() => import('../../modules/auth/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../../modules/auth/pages/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('../../modules/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('../../modules/auth/pages/ResetPasswordPage'));
const VerifyEmailPage = React.lazy(() => import('../../modules/auth/pages/VerifyEmailPage'));

/**
 * Authentication module route configuration
 */
const authRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
    exact: true
  },
  {
    path: '/register',
    element: <RegisterPage />,
    exact: true
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
    exact: true
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
    exact: true
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
    exact: true
  }
];

export default authRoutes;