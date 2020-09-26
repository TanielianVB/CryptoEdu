import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Tooltip, Typography } from "@material-ui/core";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bar: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

function AppTopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.bar} disableGutters>
          <LanguageSelector />
          <Tooltip
            title="Simulador de Algoritmos de Criptografia com Finalidade
              Educacional"
          >
            <Typography variant="h6" color="secondary">
              CryptoEdu
            </Typography>
          </Tooltip>
          <LanguageSelector />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppTopBar;
