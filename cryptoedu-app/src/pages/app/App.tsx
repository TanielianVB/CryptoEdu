import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  InputAdornment,
  Step,
  StepButton,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AppTopBar from "../../components/AppTopBar/AppTopBar";
import BitsField from "../../components/BitsField/BitsField";
import StepperNavigation from "../../components/StepperNavigation/StepperNavigation";
import Utils from "../../utils/Utils";
import SDES from "../../utils/SDES";
import P10Step from "../../components/Steps/P10Step";
import LS1Step from "../../components/Steps/LS1Step";
import IPStep from "../../components/Steps/IPStep";

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

const formatArray = (array: number[]) => {
  // return "[ " + array.join(", ") + " ]";
  // return "[" + array.join("") + "]";
  // return array.join("");
  const char = Utils.getChar(array);
  return (char ? "'" + char + "' " : "") + array.join("");
};

const getSteps = (): React.ReactNode[] => {
  return [
    "Inicio",
    "P10",
    "LS-1",
    "P8",
    <>
      K<sub>1</sub> & K<sub>2</sub>
    </>,
    "IP",
    <>
      f
      <sub>
        k<sub>1</sub>
      </sub>{" "}
      & E/P
    </>,
    "S0 & S1 & P4",
    <>
      SW & f
      <sub>
        k<sub>2</sub>
      </sub>
    </>,
    <>
      IP<sup>-1</sup>
    </>,
    "Revisão",
  ];
};

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [message, setMessage] = useState("01110010");
  const [messageBits, setMessageBits] = useState([0, 1, 1, 1, 0, 0, 1, 0]);
  const [key, setKey] = useState("1010000010");
  const [keyBits, setKeyBits] = useState([1, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
  const [p10Bits, setP10Bits] = useState<number[]>([]);
  const [ls1Bits, setLs1Bits] = useState<number[]>([]);
  const [k1Bits, setK1Bits] = useState<number[]>([]);
  const [ls2Bits, setLs2Bits] = useState<number[]>([]);
  const [k2Bits, setK2Bits] = useState<number[]>([]);
  const [ipBits, setIpBits] = useState<number[]>([]);

  useEffect(() => {
    const p10 = SDES.permutate10(keyBits);
    setP10Bits(p10);
    const ls1 = SDES.generateLS1(p10);
    setLs1Bits(ls1);
    const k1 = SDES.generateKey1(ls1);
    setK1Bits(k1);
    const ls2 = SDES.generateLS2(ls1);
    setLs2Bits(ls2);
    const k2 = SDES.generateKey2(ls2);
    setK2Bits(k2);
  }, [keyBits]);

  useEffect(() => {
    const ip = SDES.permutateIP(messageBits);
    setIpBits(ip);
  }, [messageBits]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var m = event.target.value;

    if (m.length <= 8) {
      setMessage(m);
      if (m.length === 1) {
        // Convert e letter to binary
        m = m.charCodeAt(0).toString(2).padStart(8, "0");
      }
      setMessageBits(Utils.getBits(m, 8));
    }
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var k = event.target.value;

    if (k.length <= 10) {
      setKey(k);
      setKeyBits(Utils.getBits(k, 10));
    }
  };

  const classes = useStyles();

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                S-DES
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                O S-DES é uma versão simplificada do algorítimo DES (Data
                Encryption Standard).
                <br />
                Este se utiliza de uma chave de 10 bits que deve ser
                compartilhada entre o emissor e o receptor da mensagem para que
                a mensagem possa ser criptografada e descriptografada.
                <br />
                Nesta execução (que possui objetivo educacional) podemos
                escolher se desejamos criptografar ou descriptografar a mensagem
                e informar uma mensagem e uma chave que irão ser utilizadas
                durante a execução do algoritmo para assim melhor visualizarmos
                como a ocorre o processo quando os valores desejados são
                utilizados.
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
              <Box paddingTop={3}>
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
                        "mensagem" +
                        (selectedTab === 0 ? "" : " cifrada") +
                        "..."
                      }
                      helperText="1 char ou 8 bits"
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
                      value={message}
                      onChange={handleMessageChange}
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
                      value={key}
                      onChange={handleKeyChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      gutterBottom
                    >
                      Bits da mensagem:
                    </Typography>
                    <BitsField bits={messageBits} addChar />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      gutterBottom
                    >
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
                  onClick={(event) => {
                    setActiveStep(stepIndex + 1);
                  }}
                >
                  Iniciar
                  {selectedTab === 0 ? " criptografia" : " descriptografia"}
                </Button>
              </Grid>
            </CardActions>
          </Card>
        );
      case 1:
        return (
          <Card className={classes.card}>
            <CardContent>
              <P10Step keyBits={keyBits} p10Bits={p10Bits} />
            </CardContent>
            <CardActions>
              <StepperNavigation
                setActiveStep={setActiveStep}
                previousStep={stepIndex - 1}
                nextStep={stepIndex + 1}
              />
            </CardActions>
          </Card>
        );
      case 2:
        return (
          <Card className={classes.card}>
            <CardContent>
              <LS1Step p10Bits={p10Bits} ls1Bits={ls1Bits} />
            </CardContent>
            <CardActions>
              <StepperNavigation
                setActiveStep={setActiveStep}
                previousStep={stepIndex - 1}
                nextStep={stepIndex + 1}
              />
            </CardActions>
          </Card>
        );
      case 3:
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                P8
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                O próximo passo é uma nova permutação a ser aplicada dessa vez
                sobre LS-1 obtida no passo anterior.
                <br />A permutação ocorrerá através da aplicação de uma função
                de permutação. A função de permutação P8 é definida por:
              </Typography>
              <Grid container justify="center">
                {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression: P8(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{6}, k_{3}, k_{7}, k_{4}, k_{8}, k_{5}, k_{10}, k_{9}) */}
                <img src="sdes\p8.svg" alt="P8" />
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                Como já aprendemos a interppretar uma função de permutação,
                extraímos da função acima que os 10 bits da chave devem ser
                reordenados nas seguintes posições:
              </Typography>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Função de permutação P8:
                </Typography>
                <BitsField bits={SDES.getP8Positions()} justify="center" />
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                É interessante observar que, diferente da função de permuutação
                P10, essa função de permutação irá gerar somente 8 bits no seu
                resultado.
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Sendo assim, aplicando a função P8 sobre LS-1 temos:
              </Typography>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  LS-1:
                </Typography>
                <BitsField bits={ls1Bits} justify="center" />
              </Grid>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Função de permutação P8 à ser aplicada sobre LS-1:
                </Typography>
                <BitsField bits={SDES.getP8Positions()} justify="center" />
              </Grid>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  P8 obtida através da aplicação da função de permutação P8:
                </Typography>
                <BitsField bits={k1Bits} justify="center" />
              </Grid>
            </CardContent>
            <CardActions>
              <StepperNavigation
                setActiveStep={setActiveStep}
                previousStep={stepIndex - 1}
                nextStep={stepIndex + 1}
              />
            </CardActions>
          </Card>
        );
      case 4:
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                K<sub>1</sub> & K<sub>2</sub>
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Munidos do conhecimento obtido até o momento podemos enfim obter
                as duas chaves que serão utilizadas durante o processo de
                criptografia e descriptografia.
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                A primeira chave (K<sub>1</sub>) é exatamente o resultado que
                obtivemos ao aplicar a função P8.
              </Typography>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  K<sub>1</sub>:
                </Typography>
                <BitsField bits={k1Bits} justify="center" />
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                A segunda chave (K<sub>2</sub>) por sua vez será obtida através
                da repetição de passos agora já conhecidos por nós.
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Primeiramente, divide-se LS-1 em duas metades:
              </Typography>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  LS-1:
                </Typography>
                <BitsField bits={ls1Bits} justify="center" />
              </Grid>
              <Grid container justify="center" spacing={5}>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Esquerda de LS-1:
                  </Typography>
                  <BitsField bits={ls1Bits.slice(0, 5)} justify="center" />
                </Grid>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Direita de LS-1:
                  </Typography>
                  <BitsField bits={ls1Bits.slice(5, 10)} justify="center" />
                </Grid>
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                Aplica-se então a rotação de 2 posições para esquerda, circular
                left shift (LS-2) nas metades de LS-1.
              </Typography>
              <Grid container justify="center" spacing={5}>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Esquerda após a rotação LS-2:
                  </Typography>
                  <BitsField bits={ls2Bits.slice(0, 5)} justify="center" />
                </Grid>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Direita após a rotação LS-2:
                  </Typography>
                  <BitsField bits={ls2Bits.slice(5, 10)} justify="center" />
                </Grid>
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                Finalmente, se aplica P8 sobre a junção das metades alteradas
                pela rotação LS-2. Obtendo-se assim a chave K<sub>2</sub>.
              </Typography>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  K<sub>2</sub>:
                </Typography>
                <BitsField bits={k2Bits} justify="center" />
              </Grid>
            </CardContent>
            <CardActions>
              <StepperNavigation
                setActiveStep={setActiveStep}
                previousStep={stepIndex - 1}
                nextStep={stepIndex + 1}
              />
            </CardActions>
          </Card>
        );
      case 5:
        return (
          <Card className={classes.card}>
            <CardContent>
              <IPStep messageBits={messageBits} ipBits={ipBits} />
            </CardContent>
            <CardActions>
              <StepperNavigation
                setActiveStep={setActiveStep}
                previousStep={stepIndex - 1}
                nextStep={stepIndex + 1}
              />
            </CardActions>
          </Card>
        );
      case 6:
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                f
                <sub>
                  k<sub>1</sub>
                </sub>{" "}
                & E/P (Expansion / Permutation - Permutação de expansão)
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                A função f<sub>k</sub> é o componente mais complexo da execução
                do algoritmo e consiste de uma combinação de permutações e
                substituições e será chamada duas vezes durante o fluxo de
                execução, sendo uma vez para cada chave (K<sub>1</sub> e K
                <sub>2</sub>). A função f<sub>k</sub> é definida por:
              </Typography>
              <Grid container justify="center">
                {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression: P10(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{3}, k_{5}, k_{2}, k_{7}, k_{4}, k_{10}, k_{1}, k_{9}, k_{8}, k_{6}) */}
                <img src="sdes\fk.svg" alt="fk" />
              </Grid>
              <Typography
                variant="body2"
                component="p"
                gutterBottom
              ></Typography>
              <Typography variant="h6" color="secondary">
                Em desenvolvimento...
              </Typography>
            </CardContent>
            <CardActions>
              <StepperNavigation
                setActiveStep={setActiveStep}
                previousStep={stepIndex - 1}
                nextStep={stepIndex + 1}
              />
            </CardActions>
          </Card>
        );
      default:
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h3" color="secondary">
                Em desenvolvimento...
              </Typography>
            </CardContent>
            <CardActions>
              <StepperNavigation
                setActiveStep={setActiveStep}
                previousStep={activeStep - 1}
              />
            </CardActions>
          </Card>
        );
    }
  };

  return (
    <div className={classes.appRoot}>
      <AppTopBar
        title={
          (selectedTab === 0 ? "Criptografando " : "Descriptografando ") +
          formatArray(messageBits) +
          " com a chave " +
          formatArray(keyBits)
        }
      />
      <main className={classes.content}>{getStepContent(activeStep)}</main>
      <footer className={classes.footer}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepper}
          nonLinear
        >
          {getSteps().map((label, index) => (
            <Step key={index}>
              <StepButton
                completed={index < activeStep}
                onClick={(event) => setActiveStep(index)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </footer>
    </div>
  );
}

export default App;
