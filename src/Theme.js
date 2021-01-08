import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
    breakpoints: {
        values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
        }
    },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: '#9c27b0',
    },
    info: {
        main: '#00bbff',
      },
    success: {
    main: '#ff9800',
    },
    text: {
        primary: "#000000",
        secondary: '#f44336',
        disabled: '#f44336'
    },
    background: {
        paper: "#fafafa",
        default: "#495867"
    },
    action: {
        active: "#9c27b0",
        hover: "#00bcd4",
        selected: "#00bcd4",
        disabled: "#00bbff",
        disabledBackground: "#fafafa"
    }
    
  },
});

export default Theme;