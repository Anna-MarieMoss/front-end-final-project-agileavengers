import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

function FavoriteButton({favoriteColor, handleFavorite}) {
    return (
      <FavoriteIcon fontSize="medium" variant="contained" style={{color: favoriteColor}} onClick={handleFavorite}>
      </FavoriteIcon>
    );
  }
  
  export default FavoriteButton;