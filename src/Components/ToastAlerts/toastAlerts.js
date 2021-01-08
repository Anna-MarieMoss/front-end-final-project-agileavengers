/////// TOAST NOTIFICATIONS PRACTICE
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const ToastAlert = () => (
  <button
    onClick={() => {
      toaster.notify('What have you learned today?', {
        duration: 2000,
      });
    }}
  >
    Test Alert
  </button>
);

export default ToastAlert;
///////
