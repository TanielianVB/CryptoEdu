import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import AppTopBar from "../../components/AppTopBar/AppTopBar";
import BitsField from "../../components/BitsField/BitsField";

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
    },
    stepper: {
      flex: "1 1 auto",
    },
  })
);

const getBits = (text: string, size: number) => {
  var bits = new Array(size);

  for (let index = 0; index < bits.length; index++) {
    var letter = text[index];
    var number = 0;
    if (letter !== undefined) {
      number = Number(letter);
      if (isNaN(number) || number > 0) {
        number = 1;
      }
    }
    bits[index] = number || 0;
  }

  return bits;
};

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [message, setMessage] = useState("01110010");
  const [messageBits, setMessageBits] = useState([0, 1, 1, 1, 0, 0, 1, 0]);
  const [key, setKey] = useState("1010000010");
  const [keyBits, setKeyBits] = useState([1, 0, 1, 0, 0, 0, 0, 0, 1, 0]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var m = event.target.value;

    if (m.length <= 8) {
      setMessage(m);
      if (m.length == 1) {
        // Convert e letter to binary
        m = m.charCodeAt(0).toString(2).padStart(8, "0");
      }
      setMessageBits(getBits(m, 8));
    }
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var k = event.target.value;

    if (k.length <= 10) {
      setKey(k);
      setKeyBits(getBits(k, 10));
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.appRoot}>
      <AppTopBar
        title={
          (selectedTab === 0 ? "Criptografando" : "Descriptografando") +
          " [ " +
          messageBits.join(", ") +
          " ] com a chave [ " +
          keyBits.join(", ") +
          " ]"
        }
      />
      <main className={classes.content}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              S-DES
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              O S-DES é uma versão simplificada do algorítimo DES (Data
              Encryption Standard).
              <br />
              Ele se utiliza de parâmetros de entrada menores que os possíveis
              com o DES e faz somente 2 permutações, tornando assim este o
              melhor candidato para análise quando o objetivo é aprendizado.
            </Typography>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              centered
              value={selectedTab}
              onChange={(event, newValue) => {
                setSelectedTab(newValue);
              }}
            >
              <Tab label="Criptografar" />
              <Tab label="Descriptografar" />
            </Tabs>
            <Box p={3}>
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={6}>
                  <TextField
                    label={"Mensagem" + (selectedTab === 0 ? "" : " cifrada")}
                    placeholder={
                      "mensagem" + (selectedTab === 0 ? "" : " cifrada") + "..."
                    }
                    helperText="1 letra ou 8 bits"
                    required
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailRoundedIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleMessageChange}
                    value={message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Chave"
                    placeholder="chave secreta..."
                    helperText="10 bits"
                    required
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyRoundedIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleKeyChange}
                    value={key}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Bits da mensagem:
                  </Typography>
                  <BitsField bits={messageBits} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Bits da chave:
                  </Typography>
                  <BitsField bits={keyBits} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<PlayArrowRoundedIcon />}
              >
                Iniciar {selectedTab === 0 ? "criptografia" : "descriptografia"}
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </main>
      <footer className={classes.footer}>
        {/* <IconButton color="primary">
          <NavigateBeforeRoundedIcon />
        </IconButton> */}
        <Stepper activeStep={0} alternativeLabel className={classes.stepper}>
          <Step key="">
            <StepLabel>Entradas</StepLabel>
          </Step>
          <Step key="">
            <StepLabel>Geração da chave P10</StepLabel>
          </Step>
          <Step key="">
            <StepLabel>Geração da chave P8</StepLabel>
          </Step>
          <Step key="">
            <StepLabel>Permutação inicial</StepLabel>
          </Step>
          <Step key="">
            <StepLabel>Permutação final</StepLabel>
          </Step>
          <Step key="">
            <StepLabel>Resultado</StepLabel>
          </Step>
        </Stepper>
        {/* <IconButton color="primary">
          <NavigateNextRoundedIcon />
        </IconButton> */}
      </footer>
    </div>
  );
}

export default App;
