import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <Typography
      mt={1}
      px={1}
      pb={{ xs: 1.5, sm: 1, lg: 0 }}
      color="text.first"
      variant="body1"
      sx={{ textAlign: { xs: 'center', md: 'right' } }}
      letterSpacing={0.5}
    >
      Made with ❤️ by{' '}
      <Link href="https://github.com/smileJanet" target="_blank" rel="noreferrer">
        {'Janet'}
      </Link>
    </Typography>
  );
};

export default Footer;
