import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";

interface SWStepProps {
  fK1Bits: number[];
  swBits: number[];
}

function SWStep(props: SWStepProps) {
  const { fK1Bits, swBits } = props;
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
        bits={fK1Bits}
        labelAbove
      />
      <SplitBitsField
        leftLabel="Esquerda"
        rightLabel="Direita"
        bits={fK1Bits}
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
