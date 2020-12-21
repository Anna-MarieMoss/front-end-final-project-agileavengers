import React from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

function DeleteButton({deleteColor}) {
  return (
    <DeleteRoundedIcon fontSize="large" variant="contained" style={{color: deleteColor}}>
    </DeleteRoundedIcon>
  );
}

export default DeleteButton;

