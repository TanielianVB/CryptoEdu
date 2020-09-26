import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/app/App";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light, dark, contrastText: will be calculated from palette.primary.main,
      main: "#323232",
    },
    secondary: {
      // light, dark, contrastText: will be calculated from palette.secondary.main,
      main: "#03a9f4",
    },
    background: {
      default: "#323232",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
