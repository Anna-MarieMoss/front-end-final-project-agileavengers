import { createContext } from 'react';

export const ThemeContext = createContext('lightTheme', {
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  });
