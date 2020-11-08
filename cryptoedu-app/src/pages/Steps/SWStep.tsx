import React from "react";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";
import UnderDevelopmentTag from "../../components/UnderDevelopmentTag/UnderDevelopmentTag";

interface SWStepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function SWStep(props: SWStepProps) {
  return (
    <>
      <StepContentAccordion title="SW - Troca">
        <ExplanationText>...</ExplanationText>
        {/* <BitsField label="Resultado do XOR" bits={xor1Bits} labelAbove />
        <SplitBitsField
          leftLabel="Esquerda do resultado do XOR"
          rightLabel="Direita do resultado do XOR"
          bits={xor1Bits}
        /> */}
        <ExplanationText>...</ExplanationText>
      </StepContentAccordion>
      <StepContentTitle>
        SW & f
        <sub>
          K<sub>2</sub>
        </sub>
      </StepContentTitle>
      <UnderDevelopmentTag />
    </>
  );
}

export default SWStep;
