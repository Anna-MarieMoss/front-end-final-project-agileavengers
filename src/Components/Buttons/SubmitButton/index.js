import AddRoundedIcon from '@material-ui/icons/AddRounded';

function SubmitButton({submitColor}) {
    return (
      <AddRoundedIcon fontSize="large" variant="contained" style={{color: submitColor}}>
      </AddRoundedIcon>
    );
  }
  
  export default SubmitButton;