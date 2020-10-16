import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import TranslateRoundedIcon from "@material-ui/icons/TranslateRounded";

interface AppTopBarProps {
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      flex: "0 1 auto",
      // zIndex: theme.zIndex.drawer + 1,
    },
    bar: {
      display: "flex",
      justifyContent: "space-between",
    },
    title: {
      padding: theme.spacing(1),
      // flexGrow: 1,
    },
  })
);

function AppTopBar(props: AppTopBarProps) {
  const { title } = props;

  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.bar}>
        <div>
          <Tooltip
            title="Simulador de Algoritmos de Criptografia com Finalidade
              Educacional"
          >
            <Typography variant="h6">CryptoEdu</Typography>
          </Tooltip>
        </div>
        <div className={classes.title}>
          <Typography variant="subtitle2">{title}</Typography>
        </div>
        <div>
          <Tooltip title="Trocar o algorítimo?">
            <Button
              color="inherit"
              size="large"
              startIcon={<VpnKeyRoundedIcon />}
              endIcon={<ExpandMoreRoundedIcon />}
            >
              S-DES
            </Button>
          </Tooltip>
          <Tooltip title="Somente o tema claro está disponível no momento">
            <IconButton color="inherit">
              <Brightness4RoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Somente o idioma Português-BR está disponível no momento">
            <IconButton color="inherit">
              <TranslateRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppTopBar;
