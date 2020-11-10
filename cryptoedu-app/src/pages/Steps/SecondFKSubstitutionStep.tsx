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
        <BitsField
          label={
            <>
              R<sub>&oplus;</sub>
            </>
          }
          bits={epXorKeyBits}
          labelAbove
        />
        <SplitBitsField
          leftLabel={
            <>
              Esquerda (L) de R<sub>&oplus;</sub>
            </>
          }
          rightLabel={
            <>
              Direita (R) de R<sub>&oplus;</sub>
            </>
          }
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
            substitutionLabel="S0"
            substitution={SDES.getSubstitution0Matrix()}
            inputLabel={
              <>
                Esquerda (L) de R<sub>&oplus;</sub>
              </>
            }
            input={Utils.leftHalf(epXorKeyBits)}
            outputLabel={
              <>
                R<sub>S0</sub> = Resultado de S0 sobre a esquerda
              </>
            }
            output={Utils.leftHalf(subBits)}
          />
        </Grid>
        <Grid item md={6}>
          <StepByStepSubstitution
            substitutionLabel="S1"
            substitution={SDES.getSubstitution1Matrix()}
            inputLabel={
              <>
                Direita (R) de R<sub>&oplus;</sub>
              </>
            }
            input={Utils.rightHalf(epXorKeyBits)}
            outputLabel={
              <>
                R<sub>S1</sub> = Resultado de S1 sobre a direita
              </>
            }
            output={Utils.rightHalf(subBits)}
          />
        </Grid>
      </Grid>
      <BitsField
        label={
          <>
            R<sub>S</sub> = R<sub>S0</sub> + R<sub>S1</sub>
          </>
        }
        bits={subBits}
        labelAbove
      />
      <StepContentAccordion title="P4 - permutação de 4 bits">
        <ExplanationText>...</ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel="P4"
        permutation={SDES.getP4Positions()}
        inputLabel={
          <>
            R<sub>S</sub>
          </>
        }
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
      <StepContentAccordion title="XOR - OU exclusivo - &oplus;">
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
        inputBLabel="L (de SW)"
        inputB={swLBits}
        outputLabel={
          <>
            R<sub>&oplus;</sub> = R<sub>P4</sub> &oplus; L (de SW)
          </>
        }
        output={p4XorSwLBits}
      />
    </>
  );
}

export default SecondFKSubstitutionStep;
