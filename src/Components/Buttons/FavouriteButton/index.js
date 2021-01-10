import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

function FavoriteButton({
  favoriteColor,
  handleFavorite,
  journalEntryId,
  favorite,
}) {
  // function changeColor(journalEntryId, favorite) {
  //     handleFavorite(journalEntryId, !favorite);
  //   }
  // }

  return (
    <FavoriteIcon
      fontSize='medium'
      variant='contained'
      style={{ color: favoriteColor }}
      onClick={() => handleFavorite(journalEntryId, !favorite)}
      id={journalEntryId}
    ></FavoriteIcon>
  );
}

export default FavoriteButton;
