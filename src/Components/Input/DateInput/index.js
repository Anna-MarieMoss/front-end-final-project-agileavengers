import 'date-fns';
import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ThemeContext } from '../../../ThemeContext';

export default function DatePicker({ handleDate, values }) {
  // The first commit of Material-UI
  // const [selectedDate, setSelectedDate] = React.useState(new Date());

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const theme = useContext(ThemeContext);
  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} color={muiTheme(theme)}>
      <Grid container justify='space-around' color={muiTheme(theme)}>
        <KeyboardDatePicker
          color={muiTheme(theme)}
          autoOk={true}
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-inline'
          label='Start Date'
          value={values}
          onChange={handleDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
