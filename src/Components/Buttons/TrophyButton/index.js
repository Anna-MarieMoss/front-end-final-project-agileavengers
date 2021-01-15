import React, { useContext, useState } from 'react';
// import toaster from 'toasted-notes';
import './TrophyButton.css';
import { ThemeContext } from '../../../ThemeContext';
//// 2ND TYPE OF ALERTS WITH COLOURS!
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../../../AppContext';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function TrophyButton({ name, path, id, color, awarded }) {
  const theme = useContext(ThemeContext);
  const [click, setClick] = useState(0);
  const [trophyAwarded, setTrophyAwarded] = useState(awarded);
  const { accessToken } = useAppContext();

  async function patchTrophy() {
    const res = await fetch(`${BACKEND_URL}/trophies/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/JSON',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    console.log(data);
    limitClicks();
    setTrophyAwarded(!trophyAwarded);
  }

  function limitClicks() {
    if (click < 1 && !trophyAwarded) {
      setClick(click + 1);
      console.log(`click is`, click);
      toast(`Congratulations, you've mastered a new skill!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div id={theme}>
      <button
        id={theme}
        className='trophy-button'
        style={{ border: '0px', strokeOpacity: '0', outline: 'none' }}
        onClick={patchTrophy}
      >
        <svg
          role='img'
          id={id}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          width='4em'
          height='4em'
          fill={trophyAwarded ? color : '#384D54'}
        >
          <path d={path} />
        </svg>
        <h3>{name}</h3>
      </button>
    </div>
  );
}
export default TrophyButton;
