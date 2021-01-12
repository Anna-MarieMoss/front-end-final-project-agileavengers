import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

function FavoriteButton({ handleFavorite, journalEntryId, favorite }) {
  // function changeColor(journalEntryId, favorite) {
  //     handleFavorite(journalEntryId, !favorite);
  //   }
  // }
  if (favorite === true) {
    return (
      <FavoriteIcon
        fontSize='medium'
        variant='contained'
        style={{ color: '#DC143C' }}
        onClick={() => handleFavorite(journalEntryId, !favorite)}
        id={journalEntryId}
      ></FavoriteIcon>
    );
  }

  return (
    <FavoriteIcon
      fontSize='medium'
      variant='contained'
      onClick={() => handleFavorite(journalEntryId, !favorite)}
      id={journalEntryId}
    ></FavoriteIcon>
  );
}

export default FavoriteButton;
