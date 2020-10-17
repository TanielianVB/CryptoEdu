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
import AppTopBar from "../../components/AppTopBar/AppTopBar";
import BitsField from "../../components/BitsField/BitsField";
import StepperNavigation from "../../components/StepperNavigation/StepperNavigation";
import Utils from "../../utils/Utils";
import SDES from "../../utils/SDES";

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
  return "[" + array.join("") + "]";
};

const getSteps = () => {
  return ["Entradas", "P10", "LS-1", "P8", "PI", "PF", "Resultado"];
};

function App() {
  const [activeStep, setActiveStep] = useState(3);
  const [selectedTab, setSelectedTab] = useState(0);
  const [message, setMessage] = useState("01110010");
  const [messageBits, setMessageBits] = useState([0, 1, 1, 1, 0, 0, 1, 0]);
  const [key, setKey] = useState("1010000010");
  const [keyBits, setKeyBits] = useState([1, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
  const [p10KeyBits, setP10KeyBits] = useState<number[]>([]);
  const [ls1Bits, setLs1Bits] = useState<number[]>([]);
  const [p8KeyBits, setP8KeyBits] = useState<number[]>([]);
  const [ls2Bits, setLs2Bits] = useState<number[]>([]);

  useEffect(() => {
    setP10KeyBits(SDES.generateP10Key(keyBits));
    setLs1Bits(SDES.generateLS1(keyBits));
    setP8KeyBits(SDES.generateP8Key(keyBits));
  }, [keyBits]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var m = event.target.value;

    if (m.length <= 8) {
      setMessage(m);
      if (m.length == 1) {
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
                Este se utiliza uma chave de 10 bits que deve ser compartilha
                entre o emissor e o receptor da mensagem para que a mensagem
                possa ser criptografada e descriptografada.
                <br />
                Nesta execução (que possui objetivo educacional) podemos
                informar uma mensagem e uma chave para assim melhor
                visualizarmos como a criptografia ocorre quando os valores
                desejados são utilizados.
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
                    <BitsField bits={messageBits} />
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
              <Typography variant="h5" color="primary" gutterBottom>
                P10
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                O primeiro passo é a permutação da chave criptográfica de 10
                bits provida no passo anterior.
                <br />A permutação ocorrerá através da aplicação de uma função
                de permutação. A função de permutação P10 é definida por:
              </Typography>
              <Grid container justify="center">
                {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression: P10(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{3}, k_{5}, k_{2}, k_{7}, k_{4}, k_{10}, k_{1}, k_{9}, k_{8}, k_{6}) */}
                <img src="sdes\p10.svg" alt="P10" />
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                Pode parecer complicado mas a permutação nada mais é do que uma
                reorganiação dos bits presentes na chave passada por parâmetro
                para a função. A função acima deve ser interpretada da seguinte
                forma: P10 recebe por parâmetro 10 bits K ordenados das posições
                1 à 10 e estes serão então reordenados na seguinte ordem:
              </Typography>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Função de permutação P10:
                </Typography>
                <BitsField
                  bits={[3, 5, 2, 7, 4, 10, 1, 9, 8, 6]}
                  justify="center"
                />
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                Lê-se: Na 1ª posição agora ficará o bit que estava na 3ª
                posição, na 2ª posição ficará o bit que estava na 5ª posição, na
                3ª posição ficará o bit que estava na 2ª posição, e assim
                consecutivamente...
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Sendo assim, aplicando a função P10 sobre a chave temos:
              </Typography>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Chave:
                </Typography>
                <BitsField bits={keyBits} justify="center" />
              </Grid>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Função de permutação P10 à ser aplicada sobre a chave:
                </Typography>
                <BitsField
                  bits={[3, 5, 2, 7, 4, 10, 1, 9, 8, 6]}
                  justify="center"
                />
              </Grid>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  P10 obtida através da aplicação da função de permutação P10:
                </Typography>
                <BitsField bits={p10KeyBits} justify="center" />
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
      case 2:
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                LS-1
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                O próximo passo é a rotação de P10, que ocorre em cada uma das
                metades de P10 obtida no passo anterior.
                <br />
                Então o primeiro passo dessa etapa é dividir P10 em 2 metades:
              </Typography>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  P10:
                </Typography>
                <BitsField bits={p10KeyBits} justify="center" />
              </Grid>
              <Grid container justify="center" spacing={5}>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Esquerda de P10:
                  </Typography>
                  <BitsField bits={p10KeyBits.slice(0, 5)} justify="center" />
                </Grid>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Direita de P10:
                  </Typography>
                  <BitsField bits={p10KeyBits.slice(5, 10)} justify="center" />
                </Grid>
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                O próximo passo é a rotação das metades. A rotação nada mais é
                do que a movimentação de todos os bits. No caso do S-DES essa
                rotação inicial será de 1 posição para esquerda, circular left
                shift (LS-1). O bit na primeira posição irá então para a última
                posição.
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                Aplicando a rotação LS-1 na metade da esquerda temos:
              </Typography>
              <Grid container justify="center" spacing={5}>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Esquerda de P10:
                  </Typography>
                  <BitsField bits={p10KeyBits.slice(0, 5)} justify="center" />
                </Grid>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Esquerda após a rotação LS-1:
                  </Typography>
                  <BitsField
                    bits={SDES.circularLeftShiftNTimes(
                      p10KeyBits.slice(0, 5),
                      1
                    )}
                    justify="center"
                  />
                </Grid>
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                Aplicando a rotação LS-1 na metade da direita temos:
              </Typography>
              <Grid container justify="center" spacing={5}>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Direita da chave P10:
                  </Typography>
                  <BitsField bits={p10KeyBits.slice(5, 10)} justify="center" />
                </Grid>
                <Grid item justify="center">
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Direita após a rotação LS-1:
                  </Typography>
                  <BitsField
                    bits={SDES.circularLeftShiftNTimes(
                      p10KeyBits.slice(5, 10),
                      1
                    )}
                    justify="center"
                  />
                </Grid>
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                Juntando as metades após a rotação temos:
              </Typography>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Resultado da rotação LS-1 nas metades de P10:
                </Typography>
                <BitsField bits={ls1Bits} justify="center" />
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
                <BitsField bits={[6, 3, 7, 4, 8, 5, 10, 9]} justify="center" />
              </Grid>
              <Typography variant="body2" component="p" gutterBottom>
                É interessante observar que, diferente da função de permuutação
                P10, essa função de permutação irá gerar somente 8 bits no seu resultado.
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
                <BitsField bits={[6, 3, 7, 4, 8, 5, 10, 9]} justify="center" />
              </Grid>
              <Grid container justify="center">
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  P8 obtida através da aplicação da função de permutação P8:
                </Typography>
                <BitsField bits={p8KeyBits} justify="center" />
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
      default:
        return (
          <Typography variant="h3" color="secondary">
            You are not prepared...
            <StepperNavigation
              setActiveStep={setActiveStep}
              previousStep={activeStep - 1}
            />
          </Typography>
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
        >
          {getSteps().map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </footer>
    </div>
  );
}

export default App;
