import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

function FavoriteButton({ favoriteColor, handleFavorite, journalEntryId }) {
  function changeColor(journalEntryId) {
    document.getElementById(journalEntryId).style.color = '#DC143C';
    handleFavorite(journalEntryId);
  }

  return (
    <FavoriteIcon
      fontSize='medium'
      variant='contained'
      style={{ color: favoriteColor }}
      onClick={() => changeColor(journalEntryId)}
      id={journalEntryId}
    ></FavoriteIcon>
  );
}

export default FavoriteButton;
