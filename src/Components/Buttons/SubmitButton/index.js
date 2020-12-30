import AddRoundedIcon from '@material-ui/icons/AddRounded';

function SubmitButton({submitColor, handleClick}) {
    return (
      <AddRoundedIcon fontSize="large" variant="contained" style={{color: submitColor}} onClick={handleClick}>
      </AddRoundedIcon>
    );
  }
  
  export default SubmitButton;