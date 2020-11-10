import React from "react";
import SDES from "../../utils/SDES";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import MathImg from "../../components/MathImg/MathImg";
import BitsField from "../../components/BitsField/BitsField";

interface InverseIPStepProps {
  mode: "encrypt" | "decrypt";
  secondFKBits: number[];
  iipBits: number[];
}

function InverseIPStep(props: InverseIPStepProps) {
  const { mode, secondFKBits, iipBits } = props;

  const operation = mode === "encrypt" ? "criptografia" : "descriptografia";

  return (
    <>
      <StepContentAccordion
        title={
          <>
            IP<sup>-1</sup> - Permutação Inicial Inversa
          </>
        }
      >
        <ExplanationText>
          O último passo da {operation} é a permutação inicial inversa que é
          definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
            IP^{-1}(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}) = (k_{4}, k_{1}, k_{3}, k_{5}, k_{7}, k_{2}, k_{8}, k_{6}) */}
        <MathImg src="sdes\iip.svg" alt="IIP" />
        <ExplanationText>
          A permutação nada mais é do que uma reorganiação dos bits passados por
          parâmetro para a função. A função acima deve ser interpretada da
          seguinte forma: IP<sup>-1</sup> recebe por parâmetro 8 bits K
          ordenados das posições 1 à 8 e estes serão reordenados na seguinte
          ordem:
        </ExplanationText>
        <BitsField
          label={
            <>
              IP<sup>-1</sup>
            </>
          }
          bits={SDES.getInverseIPPositions()}
        />
        <ExplanationText>
          Lê-se: Na 1ª posição ficará o bit que estava na 4ª posição, na 2ª
          posição ficará o bit que estava na 1ª posição, na 3ª posição ficará o
          bit que estava na 3ª posição, e assim consecutivamente...
        </ExplanationText>
        <ExplanationText>
          Sendo assim, aplicando a função IP<sup>-1</sup> sobre a R
          <sub>
            f
            <sub>
              K<sub>2</sub>
            </sub>
          </sub>{" "}
          temos:
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel={
          <>
            IP<sup>-1</sup>
          </>
        }
        permutation={SDES.getInverseIPPositions()}
        inputLabel={
          <>
            R
            <sub>
              f
              <sub>
                K<sub>2</sub>
              </sub>
            </sub>
          </>
        }
        input={secondFKBits}
        outputShortLabel={
          <>
            R
            <sub>
              IP<sup>-1</sup>
            </sub>
          </>
        }
        outputLabel={
          <>
            R
            <sub>
              IP<sup>-1</sup>
            </sub>{" "}
            = Resultado de IP<sup>-1</sup>
          </>
        }
        output={iipBits}
      />
    </>
  );
}

export default InverseIPStep;
