import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";

interface SWStepProps {
  swInputBits: number[];
  swBits: number[];
}

function SWStep(props: SWStepProps) {
  const { swInputBits, swBits } = props;
  return (
    <>
      <StepContentAccordion title="SW - Troca">
        <ExplanationText>...</ExplanationText>
      </StepContentAccordion>
      <BitsField
        label="Resultado de P4 XOR L de IP"
        bits={swInputBits}
        labelAbove
      />
      <SplitBitsField
        leftLabel="Esquerda"
        rightLabel="Direita"
        bits={swInputBits}
      />
      <SplitBitsField
        leftLabel="Nova esquerda (antiga direita)"
        rightLabel="Nova direita (antiga esquerda)"
        bits={swBits}
      />
      <BitsField label="Resultado de SW" bits={swBits} labelAbove />
    </>
  );
}

export default SWStep;
