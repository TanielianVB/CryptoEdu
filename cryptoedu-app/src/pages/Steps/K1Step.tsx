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
          O próximo passo é uma permutação a ser aplicada sobre R<sub>LS-1</sub>{" "}
          obtido no passo anterior. A permutação ocorrerá através da aplicação
          de uma função de permutação. A função de permutação P8 é definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
            P8(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{6}, k_{3}, k_{7}, k_{4}, k_{8}, k_{5}, k_{10}, k_{9}) */}
        <MathImg src="sdes\p8.svg" alt="P8" />
        <ExplanationText>
          A permutação nada mais é do que uma reorganização dos bits passados por
          parâmetro para a função. A função acima deve ser interpretada da
          seguinte forma: P8 recebe por parâmetro 10 bits K ordenados das
          posições 1 à 10 e estes serão reordenados na seguinte ordem:
        </ExplanationText>
        <BitsField label="P8" bits={SDES.getP8Positions()} />
        <ExplanationText>
          Lê-se: Na 1ª posição ficará o bit que estava na 6ª posição, na 2ª
          posição ficará o bit que estava na 3ª posição, na 3ª posição ficará o
          bit que estava na 7ª posição, e assim consecutivamente...
        </ExplanationText>
        <ExplanationText>
          É interessante observar que, diferente da função de permutação P10,
          essa função de permutação P8 irá gerar somente 8 bits no seu
          resultado. Sendo assim, aplicando a função P8 sobre R<sub>LS-1</sub>{" "}
          temos:
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
          O resultado da aplicação da função de permutação P8 sobre R
          <sub>LS-1</sub> será a primeira chave K<sub>1</sub>.
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
