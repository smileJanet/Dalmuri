import Stack from '@mui/material/Stack';
import { PropsWithChildren } from 'react';
// import { useState } from 'react';
const LoginLayout = ({ children }: PropsWithChildren) => {

  // const [mobileOpen, setMobileOpen] = useState(false);
  // const [isClosing, setIsClosing] = useState(false);

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
    </Stack>
  );
};

export default LoginLayout;
