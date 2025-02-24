'use client';

import { ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';

interface ThemeProviderProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#fff',
    },
  },
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;
