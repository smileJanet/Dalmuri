import { PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import {
  grey,
  red,
  green,
  blue,
  cyan,
  purple,
  indigo,
  violate,
  yellow,
  // white,
  transparentRed,
  transparentGreen,
  transparentYellow,
} from './colors';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral?: PaletteColorOptions;
    transparent?: {
      success: PaletteColorOptions;
      warning: PaletteColorOptions;
      error: PaletteColorOptions;
    };
    gradients?: {
      primary: PaletteColorOptions;
    };
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
    state?: string;
  }
  interface Palette {
    neutral: PaletteColor;
    gradients: {
      primary: PaletteColor;
    };
    transparent: {
      success: PaletteColor;
      warning: PaletteColor;
      error: PaletteColor;
    };
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
    state: string;
  }
  interface TypeBackground{
    lighter : string
    light: string
    main: string
    dark: string
    darker: string
  }
}

const palette: PaletteOptions = {
  background:{
    lighter: indigo[50],
    light: indigo[300],
    main: indigo[500],
    dark: indigo[700],
    darker: indigo[800],
  },
  action: {
    hover: indigo[400],
  },
  neutral: {
    lighter: grey[600],
    light: grey[400],
    main: grey[300],
    dark: grey[200],
    darker: grey[100]
  },
  primary: {
    main: indigo[400],
    dark: indigo[300],
    darker: indigo[200],
  },
  secondary: {
    lighter: cyan[100],
    light: cyan[300],
    main: purple[400],
    dark: cyan[700],
    darker: blue[600],
  },
  info: {
    main: blue[700],
    dark: blue[800],
    darker: blue[900],
  },
  success: {
    main: green[500],
  },
  warning: {
    main: yellow[500],
  },
  error: {
    main: red[500],
  },
  text: {
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500],
  },
  gradients: {
    primary: {
      main: indigo[500],
      state: violate[600],
    },
  },
  transparent: {
    success: {
      main: transparentGreen[500],
    },
    warning: {
      main: transparentYellow[500],
    },
    error: {
      main: transparentRed[500],
    },
  },
};

export default palette;
