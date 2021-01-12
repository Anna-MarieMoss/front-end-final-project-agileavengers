import React, { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext';
import css from './EmotionButton.module.css';

function EmotionsButton({ text, emotionNumber, handleClick }) {
  const theme = useContext(ThemeContext);

  return (
    <button
      id={theme}
      className={css.emotionButtons}
      key={emotionNumber}
      style={{ fontSize: '50px', paddingBottom: '-80px', outline: 'none' }}
      onClick={() => {
        handleClick(emotionNumber);
      }}
    >
      {text}
    </button>
  );
}

export default EmotionsButton;
