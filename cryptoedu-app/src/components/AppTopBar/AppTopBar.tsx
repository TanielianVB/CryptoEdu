import React from "react";
import { AppBar, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ToggleButtons from "../ToggleButtons/ToggleButtons";

interface AppTopBarProps {
  languages: {
    id: string;
    text: string;
    supported: boolean;
  }[];
  selectedLanguage: string;
  setSelectedLanguage: (value: React.SetStateAction<string>) => void;
  algorithms: {
    id: string;
    text: string;
    supported: boolean;
  }[];
  selectedAlgorithm: string;
  setSelectedAlgorithm: (value: React.SetStateAction<string>) => void;
}

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

function AppTopBar(props: AppTopBarProps) {
  const {
    languages,
    selectedLanguage,
    setSelectedLanguage,
    algorithms,
    selectedAlgorithm,
    setSelectedAlgorithm,
  } = props;

  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense" className={classes.bar} disableGutters>
        <ToggleButtons
          options={languages}
          selectedOption={selectedLanguage}
          setSelectedOption={setSelectedLanguage}
        />
        <Tooltip
          title="Simulador de Algoritmos de Criptografia com Finalidade
              Educacional"
        >
          <Typography variant="h6" color="secondary">
            CryptoEdu
          </Typography>
        </Tooltip>
        <ToggleButtons
          options={algorithms}
          selectedOption={selectedAlgorithm}
          setSelectedOption={setSelectedAlgorithm}
        />
      </Toolbar>
    </AppBar>
  );
}

export default AppTopBar;
