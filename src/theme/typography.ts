import { TypographyOptions } from '@mui/material/styles/createTypography';

export const fontFamily = {
  Main: ['Ownglyph_corncorn-Rg', 'omyu_pretty'].join(','),
  sub: ['omyu_pretty', 'omyu_pretty'].join(','),
  third : ['galmuri11', 'omyu_pretty'].join(','),
};

const typography: TypographyOptions = {
  fontFamily: fontFamily.Main,
  h1: {
    fontSize: '3rem',
    fontWeight: 700,
  },
  h2: {
    fontSize: '2.25rem',
    fontWeight: 700,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 700,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 700,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  button: {
    fontSize: '1rem',
    fontWeight: 500,
  },
};

export default typography;
