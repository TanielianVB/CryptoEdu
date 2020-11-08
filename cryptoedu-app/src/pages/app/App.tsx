import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppTopBar from "../../components/AppTopBar/AppTopBar";
import SDESStepper from "../Algorithms/SDESStepper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appRoot: {
      display: "flex",
      flexFlow: "column",
      minHeight: "100vh",
    },
    content: {
      flex: "1 1 auto",
      padding: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      maxWidth: "1000px",
    },
    footer: {
      flex: "0 1 auto",
      display: "flex",
      flexDirection: "column",
    },
    stepper: {
      flex: "1 1 auto",
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <div className={classes.appRoot}>
      <AppTopBar />
      <SDESStepper
        mainClassName={classes.content}
        cardClassName={classes.card}
        footerClassName={classes.footer}
        stepperClassName={classes.stepper}
      />
    </div>
  );
}

export default App;
