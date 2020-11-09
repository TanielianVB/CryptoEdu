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

interface SecondFKSubstitutionStepProps {
  epXorKeyBits: number[];
  subBits: number[];
  p4Bits: number[];
  swLBits: number[];
  p4XorSwLBits: number[];
}

function SecondFKSubstitutionStep(props: SecondFKSubstitutionStepProps) {
  const { epXorKeyBits, subBits, p4Bits, swLBits, p4XorSwLBits } = props;

  return (
    <>
      <StepContentAccordion title="S0 & S2 - Substituições S0 e S2">
        <ExplanationText>...</ExplanationText>
        <BitsField label="Resultado do XOR" bits={epXorKeyBits} labelAbove />
        <SplitBitsField
          leftLabel="Esquerda do resultado do XOR"
          rightLabel="Direita do resultado do XOR"
          bits={epXorKeyBits}
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
            input={Utils.leftHalf(epXorKeyBits)}
            outputLabel="Esquerda do XOR substituída"
            output={Utils.leftHalf(subBits)}
          />
        </Grid>
        <Grid item md={6}>
          <StepByStepSubstitution
            substitutionLabel="Matriz de substituição S2"
            substitution={SDES.getSubstitution1Matrix()}
            inputLabel="Direita do XOR"
            input={Utils.rightHalf(epXorKeyBits)}
            outputLabel="Direita do XOR substituída"
            output={Utils.rightHalf(subBits)}
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
        input={subBits}
        outputShortLabel={
          <>
            R<sub>P4</sub>
          </>
        }
        outputLabel={
          <>
            R<sub>P4</sub> = Resultado de P4
          </>
        }
        output={p4Bits}
      />
      <StepContentAccordion title="XOR - OU exclusivo">
        <ExplanationText>
          Com a saída da função P4 por sua vez será feito um OU exclusivo com a
          chave a metade esquerda (L) do resultado da Permutação Inicial (IP).
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepXOR
        inputALabel={
          <>
            R<sub>P4</sub>
          </>
        }
        inputA={p4Bits}
        inputBLabel="L de SW"
        inputB={swLBits}
        outputLabel={
          <>
            R<sub>P4</sub> &oplus; L de SW
          </>
        }
        output={p4XorSwLBits}
      />
    </>
  );
}

export default SecondFKSubstitutionStep;
