import React from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

function DeleteButton({deleteColor, handleDelete}) {
  return (
    <DeleteRoundedIcon fontSize="medium" variant="contained" style={{color: deleteColor}} onclick={handleDelete}>
    </DeleteRoundedIcon>
  );
}

export default DeleteButton;

