/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import LoginLayout from 'layouts/login-layout';
import Splash from 'components/loading/Splash';
import PageLoader from 'components/loading/PageLoader';
import { NoTopbarFooterProvider } from 'contexts/NoTopbarFooterContext.tsx'
import Lottery from 'components/sections/journal/mini-game/Lottery.tsx'
import DrawLots from 'components/sections/journal/mini-game/DrawLots.tsx'
import Gomoku from 'components/sections/journal/mini-game/Gomoku.tsx'
import MainEdiary from 'components/sections/journal/emotion-diary-personal/MainEdiary.tsx'

const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Journal = lazy(() => import('@/pages/journal'));
const Community = lazy(() => import('@/pages/community'));
const Chat = lazy(() => import('@/pages/chat'))
const Memories = lazy(() => import('@/pages/memories'));

const Login = lazy(() => import('pages/authentication/Login'));
const Signup = lazy(() => import('pages/authentication/Signup'));

/*
* [React 컴포넌트의 children]
* 1. children: 컴포넌트 안에 감싸진 콘텐츠.
* 2. ⭐ createBrowserRouter의 children과 다르다! ⭐
*
* (ex)
* const myBox = ({children}) => {
*   return <div>{children}</div>
* }
* 위와 같은 컴포넌트를 쓰면
*
* <MyBox>
    <h4> Hello! </h4>
* </MyBox>
* MyBox 안에 있는 <h4> Hello! </h4>를 children으로 받는다.
*
* ===============================================================
* [ React Router DOM ]
*
* [createBrowserRouter의 children]
* 1. 위에서 말한 children은 React 컴포넌트고, 이쪽은 'react-router-dom'이다. 완전 다름
* 2. 부모 라우터 경로 안에 들어가는 '하위 경로들'을 정의하는 "배열"
* 3. children:[....] 이렇게 작성된다.
* 
*    react의 children     |     router의 children   
* --------------------------------------------------
*       컴포넌트 안        |        라우터 안
* 안의 내용을 받아서 보여줌 | 어떤 경로가 어떤 컴포넌트와 연결되는지
*                               하위경로로 연결해줌
* 4. children을 써야 하는 상황 : 공통적으로 감싸야 하는 Layout(ex. MainLayout)이 있을 때 children을 사용한다.
* 5. 단, children을 사용하려면 공통으로 감싸는 Layout에 <Outlet />이 있어야 한다. ➡️ Outlet에서 설명
*
* [React의 중첩라우팅]
* 1. React에선 페이지를 이동할 때 react-router-dom을 사용한다.
* 2. 중첩 라우팅은 "페이지 안에 또 페이지가 있는 구조"를 만들고 싶을 때 사용하는 방식이다.
*
* (ex)
* <MainLayout>
    <Profile /> ⬅️ MainLayout이라는 구조 아래 또 Profile이라는 구조가 있다.
    <Setting /> ⬅️ MainLayout이라는 구조 아래 또 Settings라는 구조가 있다.
* </MainLayout>
*
* [Outlet]
* 1. "여기에 자식 라우트 내용을 넣어줘"라는 표시. === children과 동일한 의미.
* 2. 중첩 라우팅의 출력 위치이다.
*
* (ex)
* const MainLayout = () => {
*   return(
*     <div>
        <h1>Main Layout 공통 레이아웃</h1>
          <Outlet />
*     </div>
*   )
* }
*
* */

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
          element:
           <NoTopbarFooterProvider>
             <MainLayout />
           </NoTopbarFooterProvider>, // ✅ 사이드바가 있는 레이아웃
          children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'journal', element: <Journal /> },
            { path: 'community', element: <Community /> },
            { path: 'chat', element: <Chat />},
            { path: 'memories', element: <Memories /> },

            /* journal */
            { path:'journal/mini-game/Lottery', element: <Lottery /> },
            { path:'journal/mini-game/DrawLots', element: <DrawLots /> },
            { path:'journal/mini-game/Gomoku', element: <Gomoku /> },
            { path:'journal/emotion-diary-personal/MainEdiary', element: <MainEdiary />}

            /* community */

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
