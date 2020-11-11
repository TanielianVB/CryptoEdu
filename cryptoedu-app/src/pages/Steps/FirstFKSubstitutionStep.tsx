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
import MathImg from "../../components/MathImg/MathImg";

interface FirstFKSubstitutionStepProps {
  epXorKeyBits: number[];
  subBits: number[];
  p4Bits: number[];
  ipLBits: number[];
  p4XorIpLBits: number[];
}

function FirstFKSubstitutionStep(props: FirstFKSubstitutionStepProps) {
  const { epXorKeyBits, subBits, p4Bits, ipLBits, p4XorIpLBits } = props;

  return (
    <>
      <StepContentAccordion title="S0 & S1 - Substituições S0 e S1">
        <ExplanationText>
          O próximo passo é a substituição de R<sub>&oplus;</sub>, que ocorre
          separadamente em cada uma das metades de R<sub>&oplus;</sub> que foi
          obtido no passo anterior. Então o primeiro passo dessa etapa é dividir
          R<sub>&oplus;</sub> em 2 metades:
        </ExplanationText>
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
          O próximo passo é a substituição das metades. A substituição usa uma
          matriz de substituição para gerar os bits de saída. A substituição
          contém 3 passos. 1º: Identificação da linha da matriz que deve ser
          utilizada.; 2º: Identificação da coluna da matriz que deve ser
          utilizada.; 3º: Identificação da posição exata que conterá os bits de
          saída.
        </ExplanationText>
        <ExplanationText>
          A metade esquerda será substituida utilizando a matriz de substituição
          S0. A metade direita será substituida utilizando a matriz de
          substituição S1. O resultado da substituição (R<sub>S</sub>) será a
          junção dos bits da esquerda com os bits da direita após a substituição
          idenpendente das metades.
        </ExplanationText>
        <ExplanationText>
          Aplicando as substituições nas metades de R<sub>&oplus;</sub> temos:
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
            outputShortLabel={
              <>
                R<sub>S0</sub>
              </>
            }
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
            outputShortLabel={
              <>
                R<sub>S1</sub>
              </>
            }
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
        <ExplanationText>
          O próximo passo é uma permutação a ser aplicada sobre R<sub>S</sub>{" "}
          obtido no passo anterior. A permutação ocorrerá através da aplicação
          de uma função de permutação. A função de permutação P4 é definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
            P4(k_{1}, k_{2}, k_{3}, k_{4}) = (k_{2}, k_{4}, k_{3}, k_{1}) */}
        <MathImg src="sdes\p4.svg" alt="P4" />
        <ExplanationText>
          A permutação nada mais é do que uma reorganiação dos bits passados por
          parâmetro para a função. A função acima deve ser interpretada da
          seguinte forma: P4 recebe por parâmetro 4 bits K ordenados das
          posições 1 à 4 e estes serão reordenados na seguinte ordem:
        </ExplanationText>
        <BitsField label="P4" bits={SDES.getP4Positions()} />
        <ExplanationText>
          Lê-se: Na 1ª posição ficará o bit que estava na 2ª posição, na 2ª
          posição ficará o bit que estava na 4ª posição, na 3ª posição ficará o
          bit que estava na 3ª posição, e assim consecutivamente...
        </ExplanationText>
        <ExplanationText>
          Sendo assim, aplicando a função P4 sobre a R<sub>S</sub> temos:
        </ExplanationText>
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
          Com o resultado da permutação P4 (R<sub>P4</sub>) será feito um OU
          exclusivo com a metade esquerda (L) do resultado da Permutação Inicial
          (IP) já obtido.
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepXOR
        inputALabel={
          <>
            R<sub>P4</sub>
          </>
        }
        inputA={p4Bits}
        inputBLabel="L (de IP)"
        inputB={ipLBits}
        outputLabel={
          <>
            R<sub>&oplus;</sub> = R<sub>P4</sub> &oplus; L (de IP)
          </>
        }
        output={p4XorIpLBits}
      />
    </>
  );
}

export default FirstFKSubstitutionStep;
