import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
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
        <ExplanationText>...</ExplanationText>
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
      <SplitBitsField
        leftLabel="Nova esquerda (antiga direita)"
        rightLabel="Nova direita (antiga esquerda)"
        bits={swBits}
      />
      <BitsField
        label={
          <>
            R<sub>SW</sub> = Resultado de SW
          </>
        }
        bits={swBits}
        labelAbove
      />
    </>
  );
}

export default SWStep;
