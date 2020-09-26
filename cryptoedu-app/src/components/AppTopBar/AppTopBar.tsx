import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Tooltip, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

function AppTopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Tooltip title="Simulador de Algoritmos de Criptografia com Finalidade
              Educacional">
            <Typography variant="h6" color="secondary">
              CryptoEdu
            </Typography>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppTopBar;
