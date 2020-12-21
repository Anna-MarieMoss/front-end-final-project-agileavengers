import React from 'react';

function Button({ handleClick, color , text}) {
  return (
    <button style={{ backgroundColor: color }} onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;