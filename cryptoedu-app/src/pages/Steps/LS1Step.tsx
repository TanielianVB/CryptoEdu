import React from "react";
import { Grid } from "@material-ui/core";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsField from "../../components/BitsField/BitsField";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import StepByStepCircularLeftShift from "../../components/StepByStepCircularLeftShift/StepByStepCircularLeftShift";

interface LS1StepProps {
  p10Bits: number[];
  ls1Bits: number[];
}

function LS1Step(props: LS1StepProps) {
  const { p10Bits, ls1Bits } = props;

  return (
    <>
      <StepContentAccordion title="LS-1 - Circular Left Shift de 1 posição">
        <ExplanationText>
          O próximo passo é a rotação de P10, que ocorre em cada uma das metades
          de P10 obtida no passo anterior. Então o primeiro passo dessa etapa é
          dividir P10 em 2 metades:
        </ExplanationText>
        <BitsField label="Chave após P10" bits={p10Bits} labelAbove />
        <SplitBitsField
          leftLabel="Esquerda de P10"
          rightLabel="Direita de P10"
          bits={p10Bits}
        />
        <ExplanationText>
          O próximo passo é a rotação das metades. A rotação nada mais é do que
          a movimentação de todos os bits. No caso do S-DES essa rotação inicial
          será de 1 posição para esquerda, circular left shift (LS-1). O bit na
          primeira posição irá então para a última posição.
        </ExplanationText>
        <ExplanationText>
          Aplicando a rotação LS-1 nas metades temos:
        </ExplanationText>
      </StepContentAccordion>
      <Grid container direction="row" justify="center" spacing={3}>
        <Grid item md={6}>
          <StepByStepCircularLeftShift
            shift={1}
            inputLabel="Esquerda de P10"
            input={p10Bits.slice(0, 5)}
            outputLabel="Esquerda após LS-1"
            output={ls1Bits.slice(0, 5)}
          />
        </Grid>
        <Grid item md={6}>
          <StepByStepCircularLeftShift
            shift={1}
            inputLabel="Direita de P10"
            input={p10Bits.slice(5, 10)}
            outputLabel="Direita após LS-1"
            output={ls1Bits.slice(5, 10)}
          />
        </Grid>
      </Grid>
      <BitsField
        label="Juntando as metades após a rotação temos a Chave rotacionada LS-1"
        bits={ls1Bits}
        labelAbove
      />
    </>
  );
}

export default LS1Step;
