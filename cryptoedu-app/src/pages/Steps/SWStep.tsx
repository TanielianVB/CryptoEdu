import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import MathImg from "../../components/MathImg/MathImg";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";

interface SWStepProps {
  firstFKBits: number[];
  swBits: number[];
}

function SWStep(props: SWStepProps) {
  const { firstFKBits, swBits } = props;
  return (
    <>
      <StepContentAccordion title="SW - Troca">
        <ExplanationText>
          A troca (ou switch) ocorre entre as execuções das funções f
          <sub>K</sub>. Ela recebe o resultado obtido pela primeira f
          <sub>K</sub> executada e o seu resultado será o parâmetro recebido
          pela segunda f<sub>K</sub> executada no processo.
        </ExplanationText>
        <ExplanationText>
          A troca é simplesmente a troca das metades dos bits recebidos pela
          função de troca. Esta é definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
            SW(L, R) = (R, L) */}
        <MathImg src="sdes\sw.svg" alt="SW" />
        <ExplanationText>
          Primeiramente se divide os bits em metades e depois junta-se a metade
          da direita com a da esquerda. Sendo assim, temos:
        </ExplanationText>
      </StepContentAccordion>
      <BitsField
        label={
          <>
            R
            <sub>
              f
              <sub>
                K<sub>1</sub>
              </sub>
            </sub>
          </>
        }
        bits={firstFKBits}
        labelAbove
      />
      <SplitBitsField
        leftLabel="Esquerda"
        rightLabel="Direita"
        bits={firstFKBits}
      />
      <SplitBitsField leftLabel="Direita" rightLabel="Esquerda" bits={swBits} />
      <BitsField
        label={
          <>
            R<sub>SW</sub> = Resultado de SW = Direita + Equerda
          </>
        }
        bits={swBits}
        labelAbove
      />
    </>
  );
}

export default SWStep;
