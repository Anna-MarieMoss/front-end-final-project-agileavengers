import React from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

//Do we need to add the key of the item to be deleted here?

function DeleteButton({deleteColor, handleDelete, journalEntryId}) {
  return (
    <DeleteRoundedIcon fontSize="medium" variant="contained" style={{color: deleteColor}} onClick={() => handleDelete(journalEntryId)}>
    </DeleteRoundedIcon>
  );
}

export default DeleteButton;

