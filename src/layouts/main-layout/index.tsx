import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Sidebar from 'layouts/main-layout/sidebar';
import Topbar from 'layouts/main-layout/topbar';
import Footer from './Footer';
import { Outlet, useLocation} from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material'
import { useNoTopbarFooter } from 'contexts/NoTopbarFooterContext.tsx'

// 1. 기존엔 PropsWithChildren을 사용하고, 컴포넌트가 와야 할 부분에 {children}을 작성한 방식이었지만.. 이건 일반 컴포넌트 트리에서 써야 하는 방식이다.
// 2. 라우트에서 중첩 라우트를 사용할 땐 <Outlet />을 써야 router.tsx에서 지정한 자식 컴포넌트들이 그 위치에 출력된다.
const MainLayout = () => {
  const theme = useTheme();
  const isMobileorTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { isChatRoomOpen } = useNoTopbarFooter()

  const location = useLocation();
  const path = location.pathname;

  const hideHeaderFooter = isChatRoomOpen && isMobileorTablet

  let title = '';
  switch(path){
    case '/pages/dashboard' : title = '대시보드'; break;
    case '/pages/journal' : title = '기록하기'; break;
    case '/pages/community' : title = '소통하기'; break;
    case '/pages/chat' :title = '채팅하기'; break;
    case '/pages/memories' :title = '추억하기'; break;
    default :title = '환영해요 Welcome!';
  }

  return (
    <Stack width={1} minHeight={'100vh'}>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} setIsClosing={setIsClosing} />
      <Stack
        component="main"
        direction="column"
        p={{ xs: 2, sm: 3, lg: 5 }}
        bgcolor="background.lighter"
        spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}
        width={{ xs: 1, lg: `calc(100% - 300px)` }}
        flexGrow={1}
      >
        {!hideHeaderFooter &&
          <Topbar
          title={title}
          isClosing={isClosing}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        }
          {/* {children} ⬅️는 기존 방식 */}
          <Outlet />
        {!hideHeaderFooter && <Footer /> }
      </Stack>
    </Stack>
  );
};

export default MainLayout;
