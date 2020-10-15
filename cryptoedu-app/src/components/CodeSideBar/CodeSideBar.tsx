import React, { useState } from "react";
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

function CodeSideBar() {
  const [expanded, setExpanded] = useState<string>("encryptPanel");

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(panel);
  };

  return (
    <AppDrawer anchor="left">
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
    </AppDrawer>
  );
}

export default CodeSideBar;
