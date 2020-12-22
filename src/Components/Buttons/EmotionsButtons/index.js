import React from 'react';
import './EmotionButton.css';

function EmotionsButton({text, emotionNumber, handleClick}){
    return(
        <button className="emotionBar" key={emotionNumber} style={{fontSize: '50px'}}onClick={()=> {handleClick(emotionNumber)}}>{text}</button>
    )
}

export default EmotionsButton;