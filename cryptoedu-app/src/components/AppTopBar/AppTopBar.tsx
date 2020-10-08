import React from "react";
import { AppBar, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ToggleButtons from "../ToggleButtons/ToggleButtons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    bar: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

function AppTopBar() {
  const classes = useStyles();

  const languages = [
    { value: "c", text: "C", supported: true },
    { value: "cs", text: "C#", supported: true },
    { value: "java", text: "Java", supported: true },
    { value: "javascript", text: "Javacript", supported: true },
  ];

  const types = [
    { value: "des", text: "DES", supported: true },
    { value: "tripledes", text: "3DES", supported: true },
    { value: "rijndael", text: "Rijndael", supported: true },
  ];

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense" className={classes.bar} disableGutters>
        <ToggleButtons initialSelectedOption="cs" options={languages} />
        <Tooltip
          title="Simulador de Algoritmos de Criptografia com Finalidade
              Educacional"
        >
          <Typography variant="h6" color="secondary">
            CryptoEdu
          </Typography>
        </Tooltip>
        <ToggleButtons initialSelectedOption="des" options={types} />
      </Toolbar>
    </AppBar>
  );
}

export default AppTopBar;