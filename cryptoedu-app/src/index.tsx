import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/app/App";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#040404",
      paper: "#040404",
    },
    primary: {
      main: "#040404",
    },
    secondary: {
      main: "#03a9f4",
    },
    text: {
      // primary: "#999999",
      //disabled: "#757575",
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
