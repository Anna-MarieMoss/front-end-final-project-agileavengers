import React from 'react';
import pic from "./SoC_Logo.png"

function SoCLogo({style}) {
  return <img id='soc-logo' style={style} src={pic} alt="Soc Logo" width='7em'/>;
}

export default SoCLogo;