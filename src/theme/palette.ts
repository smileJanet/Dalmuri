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
    hover: purple[300],
  },
  neutral: {
    lighter: grey[100],
    light: grey[200],
    main: grey[300],
    dark: grey[400],
    darker: grey[600],
  },
  primary: {
    main: purple[500],
    dark: purple[800],
  },
  secondary: {
    lighter: blue[200],
    light: cyan[400],
    main: cyan[500],
    dark: cyan[900],
    darker: blue[500],
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
    primary: grey[900],
    secondary: grey[400],
    disabled: grey[500],
  },
  gradients: {
    primary: {
      main: purple[500],
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
