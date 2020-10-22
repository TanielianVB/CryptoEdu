import React from "react";
import { Grid } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import StepContentTitle from "../StepContentTitle/StepContentTitle";
import ExplanationText from "../ExplanationText/ExplanationText";
import BitsFieldLabel from "../BitsFieldLabel/BitsFieldLabel";

interface LS1StepProps {
  p10Bits: number[];
  ls1Bits: number[];
}

function LS1Step(props: LS1StepProps) {
  const { p10Bits, ls1Bits } = props;

  return (
    <>
      <StepContentTitle>
        LS-1 - Circular Left Shift de 1 posição
      </StepContentTitle>
      <ExplanationText>
        O próximo passo é a rotação de P10, que ocorre em cada uma das metades
        de P10 obtida no passo anterior. Então o primeiro passo dessa etapa é
        dividir P10 em 2 metades:
      </ExplanationText>
      <Grid container justify="center">
        <BitsFieldLabel>P10:</BitsFieldLabel>
        <BitsField bits={p10Bits} justify="center" />
      </Grid>
      <Grid container justify="center" spacing={5}>
        <Grid item justify="center">
          <BitsFieldLabel>Esquerda de P10:</BitsFieldLabel>
          <BitsField bits={p10Bits.slice(0, 5)} justify="center" />
        </Grid>
        <Grid item justify="center">
          <BitsFieldLabel>Direita de P10:</BitsFieldLabel>
          <BitsField bits={p10Bits.slice(5, 10)} justify="center" />
        </Grid>
      </Grid>
      <ExplanationText>
        O próximo passo é a rotação das metades. A rotação nada mais é do que a
        movimentação de todos os bits. No caso do S-DES essa rotação inicial
        será de 1 posição para esquerda, circular left shift (LS-1). O bit na
        primeira posição irá então para a última posição.
      </ExplanationText>
      <ExplanationText>
        Aplicando a rotação LS-1 na metade da esquerda temos:
      </ExplanationText>
      <Grid container justify="center" spacing={5}>
        <Grid item justify="center">
          <BitsFieldLabel>Esquerda de P10:</BitsFieldLabel>
          <BitsField bits={p10Bits.slice(0, 5)} justify="center" />
        </Grid>
        <Grid item justify="center">
          <BitsFieldLabel>Esquerda após a rotação LS-1:</BitsFieldLabel>
          <BitsField bits={ls1Bits.slice(0, 5)} justify="center" />
        </Grid>
      </Grid>
      <ExplanationText>
        Aplicando a rotação LS-1 na metade da direita temos:
      </ExplanationText>
      <Grid container justify="center" spacing={5}>
        <Grid item justify="center">
          <BitsFieldLabel>Direita da chave P10:</BitsFieldLabel>
          <BitsField bits={p10Bits.slice(5, 10)} justify="center" />
        </Grid>
        <Grid item justify="center">
          <BitsFieldLabel>Direita após a rotação LS-1:</BitsFieldLabel>
          <BitsField bits={ls1Bits.slice(5, 10)} justify="center" />
        </Grid>
      </Grid>
      <ExplanationText>
        Juntando as metades após a rotação temos:
      </ExplanationText>
      <Grid container justify="center">
        <BitsFieldLabel>
          Resultado da rotação LS-1 nas metades de P10:
        </BitsFieldLabel>
        <BitsField bits={ls1Bits} justify="center" />
      </Grid>
    </>
  );
}

export default LS1Step;
