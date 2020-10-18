import React from "react";
import { Grid, Typography } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import SDES from "../../utils/SDES";

interface IPStepProps {
  messageBits: number[];
  ipBits: number[];
}

function IPStep(props: IPStepProps) {
  const { messageBits, ipBits } = props;

  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom>
        IP - Initial Permutation - Permutação Inicial
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        Uma vez tendo-se obtidas as chaves que serão utilizadas na criptografia
        (K<sub>1</sub> & K<sub>2</sub>) iremos finalmente começar a criptografar
        a mensagem. A mensagem também é referida como P (plaintext).
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        A primeira alteração a ser aplicada à mensagem (P) é a permutação inicial que
        é definida por:
      </Typography>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Função de permutação IP:
        </Typography>
        <BitsField bits={SDES.getIPPositions()} justify="center" />
      </Grid>
      <Typography variant="body2" component="p" gutterBottom>
        Sendo assim, aplicando a função IP sobre a mensagem temos:
      </Typography>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          P:
        </Typography>
        <BitsField bits={messageBits} justify="center" addChar />
      </Grid>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Função de permutação IP:
        </Typography>
        <BitsField bits={SDES.getIPPositions()} justify="center" />
      </Grid>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Mensagem permutada obtida através da aplicação da função de IP:
        </Typography>
        <BitsField bits={ipBits} justify="center" addChar />
      </Grid>
    </>
  );
}

export default IPStep;
