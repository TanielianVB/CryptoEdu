import React from "react";
import { Grid } from "@material-ui/core";
import BitArrayField from "../../components/BitArrayField/BitArrayField";
import SDES from "../../utils/SDES";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsFieldLabel from "../../components/BitsFieldLabel/BitsFieldLabel";
import BitsField from "../../components/BitsField/BitsField";

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
        LS-2 & K<sub>2</sub> - Circular Left Shift de 2 posições e obtenção da
        chave K<sub>2</sub>
      </StepContentTitle>
      <ExplanationText>
        Munidos do conhecimento obtido até o momento podemos enfim obter a
        segunda chave (K<sub>2</sub>) que será utilizada, juntamente com K
        <sub>1</sub>, durante o processo de criptografia e descriptografia.
      </ExplanationText>
      <ExplanationText>
        A segunda chave (K<sub>2</sub>) será obtida através da repetição de
        alguns passos agora já conhecidos por nós.
      </ExplanationText>
      <ExplanationText>
        Primeiramente, divide-se LS-1 em duas metades:
      </ExplanationText>
      <BitsField label="LS-1:" bits={ls1Bits} />
      <Grid container justify="center" spacing={5}>
        <Grid item justify="center">
          <BitsFieldLabel>Esquerda de LS-1:</BitsFieldLabel>
          <BitArrayField bits={ls1Bits.slice(0, 5)} justify="center" />
        </Grid>
        <Grid item justify="center">
          <BitsFieldLabel>Direita de LS-1:</BitsFieldLabel>
          <BitArrayField bits={ls1Bits.slice(5, 10)} justify="center" />
        </Grid>
      </Grid>
      <ExplanationText>
        Aplica-se então a rotação de 2 posições para esquerda, circular left
        shift (LS-2), nas metades de LS-1.
      </ExplanationText>
      <Grid container justify="center" spacing={5}>
        <Grid item justify="center">
          <BitsFieldLabel>Esquerda após a rotação LS-2:</BitsFieldLabel>
          <BitArrayField bits={ls2Bits.slice(0, 5)} justify="center" />
        </Grid>
        <Grid item justify="center">
          <BitsFieldLabel>Direita após a rotação LS-2:</BitsFieldLabel>
          <BitArrayField bits={ls2Bits.slice(5, 10)} justify="center" />
        </Grid>
      </Grid>
      <ExplanationText>
        Finalmente, se aplica P8 sobre a junção das metades alteradas pela
        rotação LS-2. Obtendo-se assim a chave K<sub>2</sub>.
      </ExplanationText>
      <BitsField label="LS-2:" bits={ls2Bits} paragraphMargin={false} />
      <BitsField
        label="P8:"
        bits={SDES.getP8Positions()}
        paragraphMargin={false}
      />
      <BitsField label="LS-2 permutada:" bits={k2Bits} />
    </>
  );
}

export default LS2Step;
