/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loading/Splash';
import PageLoader from 'components/loading/PageLoader';
import LoginLayout from 'layouts/login-layout';

const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard'));
const Journal = lazy(() => import('@/pages/journal'));
const Login = lazy(() => import('pages/authentication/Login'));
const Signup = lazy(() => import('pages/authentication/Signup'));

// 1. children을 써야 하는 상황 : 공통적으로 감싸야 하는 Layout(ex. MainLayout)이 있을 때 children을 사용한다.

const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <LoginLayout>
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            </LoginLayout>
          ),
        },
        {
          path: '/pages',
          element: <MainLayout />, // ✅ 사이드바가 있는 레이아웃 <- 이렇게!
          children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'journal', element: <Journal /> },
          ],
        },
        // { // 이렇게 말고
        //   path:'/pages/dashboard',
        //   element: (
        //     <MainLayout>
        //       <Dashboard />
        //     </MainLayout>
        //   ),
        // },
        // {
        //   path: '/pages/journal',
        //   element : (
        //     <MainLayout>
        //     <Journal />
        //   </MainLayout>
        //   ),
        // },
        {
          path: rootPaths.authRoot,
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [
            {
              path: paths.login,
              element: <Login />,
            },
            {
              path: paths.signup,
              element: <Signup />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/dalmuri',
  },
);

export default router;
