import React from 'react';
import css from './EmotionButton.module.css';

function EmotionsButton({text, emotionNumber, handleClick}){
    return(
        <button className={css.emotionButtons} key={emotionNumber} style={{fontSize: '50px'}} onClick={()=> {handleClick(emotionNumber)}}>{text}</button>
    )
}

export default EmotionsButton;