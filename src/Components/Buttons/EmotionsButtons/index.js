import React from 'react';

function EmotionsButton({text, emotionNumber, handleClick}){
    return(
        <button key={emotionNumber} style={{fontSize: '30px'}}onClick={()=> {handleClick(emotionNumber)}}>{text}</button>
    )
}

export default EmotionsButton;