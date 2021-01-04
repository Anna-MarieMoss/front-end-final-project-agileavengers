import React from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

//Do we need to add the key of the item to be deleted here?

function DeleteButton({deleteColor, handleDelete}) {
  return (
    <DeleteRoundedIcon fontSize="medium" variant="contained" style={{color: deleteColor}} onclick={handleDelete}>
    </DeleteRoundedIcon>
  );
}

export default DeleteButton;

