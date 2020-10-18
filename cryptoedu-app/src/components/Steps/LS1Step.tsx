import React from "react";
import { Grid, Typography } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";

interface LS1StepProps {
  p10Bits: number[];
  ls1Bits: number[];
}

function LS1Step(props: LS1StepProps) {
  const { p10Bits, ls1Bits } = props;

  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom>
        LS-1
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        O próximo passo é a rotação de P10, que ocorre em cada uma das metades
        de P10 obtida no passo anterior. Então o primeiro passo dessa etapa é
        dividir P10 em 2 metades:
      </Typography>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          P10:
        </Typography>
        <BitsField bits={p10Bits} justify="center" />
      </Grid>
      <Grid container justify="center" spacing={5}>
        <Grid item justify="center">
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Esquerda de P10:
          </Typography>
          <BitsField bits={p10Bits.slice(0, 5)} justify="center" />
        </Grid>
        <Grid item justify="center">
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Direita de P10:
          </Typography>
          <BitsField bits={p10Bits.slice(5, 10)} justify="center" />
        </Grid>
      </Grid>
      <Typography variant="body2" component="p" gutterBottom>
        O próximo passo é a rotação das metades. A rotação nada mais é do que a
        movimentação de todos os bits. No caso do S-DES essa rotação inicial
        será de 1 posição para esquerda, circular left shift (LS-1). O bit na
        primeira posição irá então para a última posição.
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        Aplicando a rotação LS-1 na metade da esquerda temos:
      </Typography>
      <Grid container justify="center" spacing={5}>
        <Grid item justify="center">
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Esquerda de P10:
          </Typography>
          <BitsField bits={p10Bits.slice(0, 5)} justify="center" />
        </Grid>
        <Grid item justify="center">
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Esquerda após a rotação LS-1:
          </Typography>
          <BitsField bits={ls1Bits.slice(0, 5)} justify="center" />
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
          <BitsField bits={p10Bits.slice(5, 10)} justify="center" />
        </Grid>
        <Grid item justify="center">
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Direita após a rotação LS-1:
          </Typography>
          <BitsField bits={ls1Bits.slice(5, 10)} justify="center" />
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
    </>
  );
}

export default LS1Step;