import React from 'react';

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <p>(Add profile img from Auth0 here)</p>
      <p>(Upload photo link here)</p>
      <form>
        <input className='userName' placeholder='Name' />
        <br></br>
        <input className='Email' placeholder='Email' />
        <br></br>
        <input className='MyersBriggs' placeholder='Myers Briggs' />
        <br></br>
        <input className='startDate' type='date' />
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Profile;
