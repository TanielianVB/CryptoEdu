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
import GitHubIcon from "@material-ui/icons/GitHub";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import TranslateRoundedIcon from "@material-ui/icons/TranslateRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      flex: "0 1 auto",
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
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.bar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Código fonte no GitHub">
            <IconButton
              color="inherit"
              href="https://github.com/TanielianVB/CryptoEdu"
              target="CryptoEduGitHub"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pesquisa de utilização do simulador">
            <IconButton
              color="inherit"
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4WZFS6CSGD95991vkVQdrcDK-c01BnqNNBQV5Z86E2yMbvw/viewform?usp=sf_link"
              target="CryptoEduGoogleForms"
            >
              <ListRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">CryptoEdu</Typography>
          <Typography variant="caption">
            Simulador de Algoritmos de Criptografia com Finalidade Educacional
          </Typography>
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
