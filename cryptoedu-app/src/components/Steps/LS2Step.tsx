import React from "react";
import { Grid, Typography } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import SDES from "../../utils/SDES";
import StepContentTitle from "../StepContentTitle/StepContentTitle";

interface LS2StepProps {
  ls1Bits: number[];
  ls2Bits: number[];
  k2Bits: number[];
}

function LS2Step(props: LS2StepProps) {
  const { ls1Bits, ls2Bits, k2Bits } = props;

  return (
    <>
      <StepContentTitle>
        LS-2 & K<sub>2</sub>
      </StepContentTitle>
      <Typography variant="body2" component="p" gutterBottom>
        Munidos do conhecimento obtido até o momento podemos enfim obter a
        segunda chave (K<sub>2</sub>) que será utilizada, juntamente com K
        <sub>1</sub>, durante o processo de criptografia e descriptografia.
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        A segunda chave (K<sub>2</sub>) será obtida através da repetição de
        alguns passos agora já conhecidos por nós.
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
        Aplica-se então a rotação de 2 posições para esquerda, circular left
        shift (LS-2), nas metades de LS-1.
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
        Finalmente, se aplica P8 sobre a junção das metades alteradas pela
        rotação LS-2. Obtendo-se assim a chave K<sub>2</sub>.
      </Typography>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          LS-2:
        </Typography>
        <BitsField bits={ls2Bits} justify="center" />
      </Grid>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Função de permutação P8 à ser aplicada sobre LS-2:
        </Typography>
        <BitsField bits={SDES.getP8Positions()} justify="center" />
      </Grid>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          K<sub>2</sub> obtida através da aplicação da função de permutação P8
          sobre LS-2:
        </Typography>
        <BitsField bits={k2Bits} justify="center" />
      </Grid>
    </>
  );
}

export default LS2Step;
