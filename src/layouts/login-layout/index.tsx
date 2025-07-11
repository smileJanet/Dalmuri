import Stack from '@mui/material/Stack';
import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Login from 'assets/login.gif';
import { useMediaQuery, useTheme } from '@mui/material';
// import { useState } from 'react';

// 여기서는 라우터의 Outlet을 사용한 대신 PropsWithChildren을 사용한 케이스
// { children }과 같이 사용할 수 있으니 확인해볼 것

/*
* [MUI 라이브러리의 breakpoint]
* 1. breakpoint란 반응형 디자인을 위해 MUI 라이브러리에서 지정한 크기 단위.
* 2. 웹사이트, 애플리케이션이 다양한 화면의 크기(모바일, 태블릿, 데스크톱 등)에서 최적의 레이아웃을 보여줄 수 있도록 도와준다.
* 3. 각 브레이크포인트는 특정 화면 너비 이상을 나타낸다.
*   • xs(extra-small): 모바일(0px ~ )
*   • s(small): 태블릿 세로모드, 작은 노트북(600px ~ )
*   • md(medium): 태블릿 가로모드, 중간크기 노트북, 데스크탑(900px ~ )
*   • lg(large): 큰 화면, 데스크톱 모니터(1200px ~ )
*   • xl(extra-large): 매우 큰 화면, 매우 큰 데스크톱 모니터, 4k 디스플레이(1536px ~ )
* 4. 특히 Grid 컴포넌트와 함께 이 브레이크포인트가 쓰인다.
*
* ===============================================================
* useTheme과 useMediaQuery는 브레이크포인트를 활용하여 반응형 UI를 유연하고 동적으로 제어할 수 있는 React Hook이다.
*
* [useTheme]
* 1. MUI 라이브러리에서 제공하는 훅으로, 현재 테마 객체에 접근할 수 있도록 한다.
* 2. 이 훅을 사용하면 현재 테마에 정의된 색상, 타이포그래피, 간격 등의 스타일 속성에 쉽게 접근할 수 있도록 한다(=커스터마이징이 용이함)
* 3. theme.breakpoints.value, theme.palette.primary.main(css에서 많이 썼던거..), theme.typography.h1.fontSize.
* 4. 반환값: 테마 객체
*
* [useMediaQuery]
* 1. 특정 CSS 미디어 쿼리에 대한 결과를 반환하는 훅.
* 2. 화면 크기나 특정 조건에 따라 컴포넌트의 렌더링을 제어할 때 사용한다: isMobile ? <MobileComponent /> : <DesktopComponent />
* 3. css의 @media와 동일한 기능을 React 컴포넌트 안에서도 해줄 수 있도록 하는 훅.
* 4. 반환값: boolean
*
* (ex) useTheme + useMediaQuery
* const theme = useTheme()
*
* // 데스크탑: 1280px 이상
* const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
*
* // 태블릿: 960px 이상, 1280px 미만
* const isTablet = useMediaQuery(theme.breakpoint.between('md', 'lg'))
*
* // 모바일: 600px 이하
* const isMobile = useMediaQuery(theme.breakpoint.down('sm'))
*
* */

const LoginLayout = ({ children }: PropsWithChildren) => {
  // const [mobileOpen, setMobileOpen] = useState(false);
  // const [isClosing, setIsClosing] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // MUI가 설정한

  return (
    <Stack width={1} minHeight={'100vh'}>
      <Stack
        component="main"
        direction="column"
        justifyContent="center"
        flexGrow={1}
        px={{ xs: 4, sm: 6, lg: 10 }}
        py={{ xs: 6, sm: 8, lg: 8 }}
        maxWidth="sm"
        boxShadow = {3}
        borderRadius = {3}
        bgcolor="background.light"
        spacing={{ xs: 3, sm: 4, lg: 1 }}
        width={{ xs: 1, lg: `calc(100% - 300px)` }}
      >
        { children }
      </Stack>

      {isDesktop && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // 세로 가운데
            alignItems: 'center',     // 가로 가운데
            textAlign: 'center',
            px: 2, // 모바일에서도 양 옆 여백
            color: 'white',
            fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' }, // 반응형 글씨 크기
            fontWeight: 500,
            lineHeight: 1.6,
            zIndex: 0, // before보다 위로
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', // 흐린 배경에서 가독성 업!
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${Login})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(5px)',
              transform: 'scale(1.1)',
              zIndex: -1,
            },
          }}
        >
            <Box
              component="h1"
              sx={{
                display: {xs:'none', md:'block'},
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontFamily: 'galmuri11',
                textShadow: `
                            0 0 4px rgba(220, 220, 220, 0.8),
                            0 0 8px rgba(200, 200, 200, 0.6),
                            0 0 12px rgba(180, 180, 180, 0.4)
                          `,
                color: '#1c2854',
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.4,
              }}
            >
              조용한 오늘, 나를 닮은 하루
            </Box>

            <Box
              component="p"
              sx={{
                display: {xs:'none', md:'block'},
                fontFamily: 'galmuri11',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.3rem' },
                color: '#e3e8ff',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              작은 순간을 모아 당신만의 우주를 만들어보세요.
            </Box>
        </Box>
      )}
    </Stack>
  );
};

export default LoginLayout;
