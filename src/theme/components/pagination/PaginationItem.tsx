import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const PaginationItem: Components<Omit<Theme, 'components'>>['MuiPaginationItem'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.neutral.lighter,
      fontSize: theme.typography.body2.fontSize,
      '&.Mui-selected': {
        background: theme.palette.primary.dark,
        '&:hover': {
          background: '#9a70da',
        },
      },
    }),
  },
};

export default PaginationItem;
