import React from "react";
import { Grid } from "@material-ui/core";
import BitArrayField from "../../components/BitArrayField/BitArrayField";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsFieldLabel from "../../components/BitsFieldLabel/BitsFieldLabel";
import BitsField from "../../components/BitsField/BitsField";

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
      <BitsField label="Chave após P10:" bits={p10Bits} />
      <Grid container justify="center" spacing={5}>
        <Grid item>
          <BitsFieldLabel>Esquerda de P10:</BitsFieldLabel>
          <BitArrayField bits={p10Bits.slice(0, 5)} justify="center" />
        </Grid>
        <Grid item>
          <BitsFieldLabel>Direita de P10:</BitsFieldLabel>
          <BitArrayField bits={p10Bits.slice(5, 10)} justify="center" />
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
        <Grid item>
          <BitsFieldLabel>Esquerda de P10:</BitsFieldLabel>
          <BitArrayField bits={p10Bits.slice(0, 5)} justify="center" />
        </Grid>
        <Grid item>
          <BitsFieldLabel>Esquerda após a rotação LS-1:</BitsFieldLabel>
          <BitArrayField bits={ls1Bits.slice(0, 5)} justify="center" />
        </Grid>
      </Grid>
      <ExplanationText>
        Aplicando a rotação LS-1 na metade da direita temos:
      </ExplanationText>
      <Grid container justify="center" spacing={5}>
        <Grid item>
          <BitsFieldLabel>Direita da chave P10:</BitsFieldLabel>
          <BitArrayField bits={p10Bits.slice(5, 10)} justify="center" />
        </Grid>
        <Grid item>
          <BitsFieldLabel>Direita após a rotação LS-1:</BitsFieldLabel>
          <BitArrayField bits={ls1Bits.slice(5, 10)} justify="center" />
        </Grid>
      </Grid>
      <ExplanationText>
        Juntando as metades após a rotação temos:
      </ExplanationText>
      <BitsField label="Chave rotacionada:" bits={ls1Bits} />
    </>
  );
}

export default LS1Step;
