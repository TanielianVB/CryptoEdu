import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AppDrawer from "../AppDrawer/AppDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      // flexGrow: 1,
      // padding: theme.spacing(0),
      // // "& .MuiTextField-root": {
      // //   padding: theme.spacing(1),
      // // },
      // // "& > .MuiButton-root": {
      // //   margin: theme.spacing(1),
      // // },
    },
  })
);

function CodeSideBar() {
  const [expanded, setExpanded] = useState<string>("encryptPanel");

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(panel);
  };

  const classes = useStyles();
  return (
    <AppDrawer anchor="left">
      <div className={classes.content}>
        <Accordion
          expanded={expanded === "encryptPanel"}
          onChange={handleChange("encryptPanel")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color="secondary">
              Criptografar
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              spacing={1}
            >
              <Grid item>
                <TextField
                  label="Mensagem"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Chave"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Button
                  endIcon={<PlayArrowRoundedIcon />}
                  variant="outlined"
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  Executar
                </Button>
              </Grid>
              <Grid item>
                <TextField
                  label="Resultado"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "decryptPanel"}
          onChange={handleChange("decryptPanel")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color="secondary">
              Decriptografar
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              spacing={1}
            >
              <Grid item>
                <TextField
                  label="Men. criptografada"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Chave"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Button
                  endIcon={<PlayArrowRoundedIcon />}
                  variant="outlined"
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  Executar
                </Button>
              </Grid>
              <Grid item>
                <TextField
                  label="Resultado"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </AppDrawer>
  );
}

export default CodeSideBar;
