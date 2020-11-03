import React from "react";
import { Grid } from "@material-ui/core";
import SDES from "../../utils/SDES";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import UnderDevelopmentTag from "../../components/UnderDevelopmentTag/UnderDevelopmentTag";
import BitsField from "../../components/BitsField/BitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import BitMatrixField from "../../components/BitMatrixField/BitMatrixField";

interface S0S1StepProps {
  xor1Bits: number[];
}

function S0S1Step(props: S0S1StepProps) {
  const { xor1Bits } = props;

  return (
    <>
      <StepContentAccordion title="S0 & S1 - Substituições S0 e S1">
        <ExplanationText>...</ExplanationText>
        <BitsField label="Resultado do XOR" bits={xor1Bits} labelAbove />
        <SplitBitsField
          leftLabel="Esquerda do resultado do XOR"
          rightLabel="Direita do resultado do XOR"
          bits={xor1Bits}
        />
        <ExplanationText>
          A função de substituição S0 é na realidade uma matrix com pares de
          bits...
        </ExplanationText>
      </StepContentAccordion>
      <Grid container direction="row" justify="center" spacing={3}>
        <Grid item md={6}>
          <BitMatrixField
            label="Função de substituição S0"
            bits={SDES.getSubstitution0Positions()}
          />
        </Grid>
        <Grid item md={6}>
          <BitMatrixField
            label="Função de substituição S1"
            bits={SDES.getSubstitution1Positions()}
          />
        </Grid>
      </Grid>
      <StepContentAccordion title="P4 - permutação de 4 bits">
        <ExplanationText>...</ExplanationText>
      </StepContentAccordion>
      <BitsField label="P4" bits={SDES.getP4Positions()} labelAbove />
      <UnderDevelopmentTag />
    </>
  );
}

export default S0S1Step;
