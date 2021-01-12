import React, { createContext, useContext, useState, useEffect } from 'react';
import { themeSwitch } from './theme';
import { useAppContext } from '../../AppContext';

const ThemeContext = createContext(themeSwitch.light);

export function ThemeProvider({ children }) {
  const [week1, setweek1] = useState(false);
  const [week2, setweek2] = useState(false);
  const [week3, setweek3] = useState(false);
  const [week4, setweek4] = useState(false);
  const [week5, setweek5] = useState(false);
  const [week6, setweek6] = useState(false);
  const [week7, setweek7] = useState(false);
  const [week8, setweek8] = useState(false);
  const [week9, setweek9] = useState(false);
  const [week10, setweek10] = useState(false);
  const [week11, setweek11] = useState(false);
  const [week12, setweek12] = useState(false);
  const [week16, setweek16] = useState(false);
  const { currentWeek } = useAppContext();

  useEffect(() => {
    if (
      currentWeek === 'week13' ||
      currentWeek === 'week14' ||
      currentWeek === 'week15'
    ) {
      setweek16(true);
    } else if (currentWeek === 'week11') {
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week10') {
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week9') {
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week8') {
      setweek9(true);
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week7') {
      setweek8(true);
      setweek9(true);
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week6') {
      setweek7(true);
      setweek8(true);
      setweek9(true);
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week5') {
      setweek6(true);
      setweek7(true);
      setweek8(true);
      setweek9(true);
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week4') {
      setweek5(true);
      setweek6(true);
      setweek7(true);
      setweek8(true);
      setweek9(true);
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week3') {
      setweek4(true);
      setweek5(true);
      setweek6(true);
      setweek7(true);
      setweek8(true);
      setweek9(true);
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week2') {
      setweek3(true);
      setweek4(true);
      setweek5(true);
      setweek6(true);
      setweek7(true);
      setweek8(true);
      setweek9(true);
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week1') {
      setweek2(true);
      setweek3(true);
      setweek4(true);
      setweek5(true);
      setweek6(true);
      setweek7(true);
      setweek8(true);
      setweek9(true);
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    } else if (currentWeek === 'week0') {
      setweek1(true);
      setweek2(true);
      setweek3(true);
      setweek4(true);
      setweek5(true);
      setweek6(true);
      setweek7(true);
      setweek8(true);
      setweek9(true);
      setweek10(true);
      setweek11(true);
      setweek12(true);
      setweek16(true);
    }
  }, [currentWeek]);

  return (
    <ThemeContext.Provider
      value={{
        week1: week1,
        week2: week2,
        week3: week3,
        week4: week4,
        week5: week5,
        week6: week6,
        week7: week7,
        week8: week8,
        week9: week9,
        week10: week10,
        week11: week11,
        week12: week12,
        week16: week16,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
