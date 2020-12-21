import FavoriteIcon from '@material-ui/icons/Favorite';

function FavoriteButton({favoriteColor}) {
    return (
      <FavoriteIcon fontSize="large" variant="contained" style={{color: favoriteColor}}>
      </FavoriteIcon>
    );
  }
  
  export default FavoriteButton;