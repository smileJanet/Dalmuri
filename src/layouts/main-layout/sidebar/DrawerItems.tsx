import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Image from 'components/base/Image';
import CollapseListItem from './list-items/CollapseListItem';
import ListItem from './list-items/ListItem';
import LogoImg from 'assets/images/dalmuri.png';
import { topListData, bottomListData } from 'data/sidebarListData';

const DrawerItems = () => {
  return (
    <>
      <Stack
        pt={5}
        pb={4}
        px={3.5}
        position={'sticky'}
        top={0}
        bgcolor="background.lighter"
        alignItems="center"
        justifyContent="flex-start"
        zIndex={1000}
      >
        <ButtonBase component={Link} href="/" disableRipple>
          <Image src={LogoImg} alt="logo" height={50} width={50} sx={{ mr: 1 }} />
          <Typography variant="h4" color="text.primary" fontWeight={600} letterSpacing={1}>
            달무리 Dalmuri
          </Typography>
        </ButtonBase>
      </Stack>

      <List component="nav" sx={{ px: 2.5 }}>
        {topListData.map((route, index) => {
          return <ListItem key={index} {...route} />;
        })}
      </List>

      <Divider />

      <List component="nav" sx={{ px: 2.5 }}>
        {bottomListData.map((route) => {
          if (route.items) {
            return <CollapseListItem key={route.id} {...route} />;
          }
          return <ListItem key={route.id} {...route} />;
        })}
      </List>

    </>
  );
};

export default DrawerItems;
