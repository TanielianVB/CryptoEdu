import React from "react";
import { Grid } from "@material-ui/core";
import SDES from "../../utils/SDES";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsField from "../../components/BitsField/BitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepByStepSubstitution from "../../components/StepByStepSubstitution/StepByStepSubstitution";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";

interface S0S1StepProps {
  xor1Bits: number[];
  sub1Bits: number[];
  p41Bits: number[];
}

function S0S1Step(props: S0S1StepProps) {
  const { xor1Bits, sub1Bits, p41Bits } = props;

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
          <StepByStepSubstitution
            substitutionLabel="Matriz de substituição S0"
            substitution={SDES.getSubstitution0Matrix()}
            inputLabel="Esquerda do XOR"
            input={xor1Bits.slice(0, 4)}
            outputLabel="Esquerda do XOR substituída"
            output={sub1Bits.slice(0, 2)}
          />
        </Grid>
        <Grid item md={6}>
          <StepByStepSubstitution
            substitutionLabel="Matriz de substituição S1"
            substitution={SDES.getSubstitution1Matrix()}
            inputLabel="Direita do XOR"
            input={xor1Bits.slice(4, 8)}
            outputLabel="Direita do XOR substituída"
            output={sub1Bits.slice(2, 4)}
          />
        </Grid>
      </Grid>
      <StepContentAccordion title="P4 - permutação de 4 bits">
        <ExplanationText>...</ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel="P4"
        permutation={SDES.getP4Positions()}
        inputLabel="Resultado das Substituições"
        input={sub1Bits}
        outputLabel="Resultado permutado"
        output={p41Bits}
      />
    </>
  );
}

export default S0S1Step;
