import React from 'react';
import LoginButton from '../Buttons/LogInButton/index';
import H1 from '../DisplayText/H1Text/index';
import SoCLogo from '../Pictures/SocLogo/index'

function LogIn() {
  return (
    <div>
      <H1 text={`Welcome to your SoC Journal`} />
      <SoCLogo style={{width: '200px', margin: '20px'}}/>
      <br/>
      <LoginButton />
    </div>
  );
}

export default LogIn;
