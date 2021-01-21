import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

function FavoriteButton({ handleFavorite, journalEntryId, favorite }) {
  if (favorite === true) {
    return (
      <button style={{paddingLeft: '2em', paddingRight: '2em'}}>
      <FavoriteIcon
        fontSize='medium'
        variant='contained'
        style={{ color: '#DC143C' }}
        onClick={() => handleFavorite(journalEntryId, !favorite)}
        id={journalEntryId}
      />
      </button>
    );
  }

  return (
    <button style={{paddingLeft: '2em', paddingRight: '2em'}}>
    <FavoriteIcon
      fontSize='medium'
      variant='contained'
      onClick={() => handleFavorite(journalEntryId, !favorite)}
      id={journalEntryId}
    />
    </button>
  );
}

export default FavoriteButton;
