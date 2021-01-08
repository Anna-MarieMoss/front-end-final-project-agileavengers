/////// TOAST NOTIFICATIONS PRACTICE
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import { Button } from '@material-ui/core';

const ToastAlert = () => (
  <Button
    onClick={() => {
      toaster.notify('What have you learned today?', {
        duration: 2000,
      });
    }}
    variant='outlined'
    color='secondary'
  >
    Test Alert
  </Button>
);

export default ToastAlert;
///////
