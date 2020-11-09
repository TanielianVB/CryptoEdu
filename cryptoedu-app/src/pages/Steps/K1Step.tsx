import React from "react";
import SDES from "../../utils/SDES";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import MathImg from "../../components/MathImg/MathImg";
import BitsField from "../../components/BitsField/BitsField";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";

interface K1StepProps {
  ls1Bits: number[];
  k1Bits: number[];
}

function K1Step(props: K1StepProps) {
  const { ls1Bits, k1Bits } = props;

  return (
    <>
      <StepContentAccordion title="P8 - Permutação de 8 bits">
        <ExplanationText>
          O próximo passo é uma nova permutação a ser aplicada dessa vez sobre
          LS-1 obtida no passo anterior.
        </ExplanationText>
        <ExplanationText>
          A permutação ocorrerá através da aplicação de uma função de
          permutação. A função de permutação P8 é definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
          P8(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{6}, k_{3}, k_{7}, k_{4}, k_{8}, k_{5}, k_{10}, k_{9}) */}
        <MathImg src="sdes\p8.svg" alt="P8" />
        <ExplanationText>
          Como já aprendemos a interpretar uma função de permutação, extraímos
          da função acima que os 10 bits da chave devem ser reordenados nas
          seguintes posições:
        </ExplanationText>
        <BitsField label="P8" bits={SDES.getP8Positions()} />
        <ExplanationText>
          É interessante observar que, diferente da função de permutação P10,
          essa função de permutação P8 irá gerar somente 8 bits no seu
          resultado.
        </ExplanationText>
        <ExplanationText>
          Sendo assim, aplicando a função P8 sobre LS-1 temos:
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel="P8"
        permutation={SDES.getP8Positions()}
        inputLabel={
          <>
            R<sub>LS-1</sub>
          </>
        }
        input={ls1Bits}
        outputShortLabel={
          <>
            R
            <sub>
              P8<sub>LS-1</sub>
            </sub>
          </>
        }
        outputLabel={
          <>
            R
            <sub>
              P8<sub>LS-1</sub>
            </sub>{" "}
            = Resultado de P8
          </>
        }
        output={k1Bits}
      />
      <StepContentAccordion
        title={
          <>
            K<sub>1</sub> - Primeira chave
          </>
        }
      >
        <ExplanationText>
          O resultado da aplicação da função de permutação P8 será a nossa
          primeira chave K<sub>1</sub>.
        </ExplanationText>
      </StepContentAccordion>
      <BitsField
        label={
          <>
            K<sub>1</sub> = R
            <sub>
              P8<sub>LS-1</sub>
            </sub>
          </>
        }
        bits={k1Bits}
        labelAbove
      />
    </>
  );
}

export default K1Step;
