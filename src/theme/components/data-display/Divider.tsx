import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const Divider: Components<Omit<Theme, 'components'>>['MuiDivider'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      margin: theme.spacing(2, 0),
      backgroundColor: theme.palette.background.lighter,

      '&.MuiDivider-withChildren': {
        color: theme.palette.text.secondary,
        backgroundColor: 'transparent',
        '&::before': {
          backgroundColor: theme.palette.background.lighter,
        },
        '&::after': {
          backgroundColor: theme.palette.background.lighter,
        },
      },
    }),
  },
};

export default Divider;
