import React from "react";
import { Grid } from "@material-ui/core";
import SDES from "../../utils/SDES";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsField from "../../components/BitsField/BitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepByStepSubstitution from "../../components/StepByStepSubstitution/StepByStepSubstitution";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import StepByStepXOR from "../../components/StepByStepXOR/StepByStepXOR";
import Utils from "../../utils/Utils";

interface S0S1StepProps {
  ep1XorK1Bits: number[];
  sub1Bits: number[];
  p41Bits: number[];
  ipLBits: number[];
  p4XorIplBits: number[];
}

function S0S1Step(props: S0S1StepProps) {
  const { ep1XorK1Bits, sub1Bits, p41Bits, ipLBits, p4XorIplBits } = props;

  return (
    <>
      <StepContentAccordion title="S0 & S1 - Substituições S0 e S1">
        <ExplanationText>...</ExplanationText>
        <BitsField label="Resultado do XOR" bits={ep1XorK1Bits} labelAbove />
        <SplitBitsField
          leftLabel="Esquerda do resultado do XOR"
          rightLabel="Direita do resultado do XOR"
          bits={ep1XorK1Bits}
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
            input={Utils.leftHalf(ep1XorK1Bits)}
            outputLabel="Esquerda do XOR substituída"
            output={Utils.leftHalf(sub1Bits)}
          />
        </Grid>
        <Grid item md={6}>
          <StepByStepSubstitution
            substitutionLabel="Matriz de substituição S1"
            substitution={SDES.getSubstitution1Matrix()}
            inputLabel="Direita do XOR"
            input={Utils.rightHalf(ep1XorK1Bits)}
            outputLabel="Direita do XOR substituída"
            output={Utils.rightHalf(sub1Bits)}
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
      <StepContentAccordion title="XOR - OU exclusivo">
        <ExplanationText>
          Com a saída da função P4 por sua vez será feito um OU exclusivo com a
          chave a metade esquerda (L) do resultado da Permutação Inicial (IP).
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepXOR
        inputALabel="Resultado de P4"
        inputA={p41Bits}
        inputBLabel="L de IP"
        inputB={ipLBits}
        outputLabel="P4 XOR L"
        output={p4XorIplBits}
      />
    </>
  );
}

export default S0S1Step;
