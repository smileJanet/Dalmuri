import { Theme } from '@mui/material';

const scrollbar = (theme: Theme) => ({
  '@supports (-moz-appearance:none)': {
    scrollbarColor: `${theme.palette.background.main} transparent`,
  },
  '*::-webkit-scrollbar': {
    width: 5,
    height: 5,
    WebkitAppearance: 'none',
    visibility: 'hidden',
  },
  '*::-webkit-scrollbar-track': {
    margin: 0,
  },
  '*::-webkit-scrollbar-thumb': {
    borderRadius: 3,
    backgroundColor: theme.palette.background.light,
    visibility: 'hidden',
  },
});

export default scrollbar;
