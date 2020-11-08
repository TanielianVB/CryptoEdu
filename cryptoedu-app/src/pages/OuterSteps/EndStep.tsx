import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";

interface EndStepProps {
  messageBits: number[];
  keyBits: number[];
  resultBits: number[];
}

function EndStep(props: EndStepProps) {
  const { messageBits, keyBits, resultBits } = props;

  return (
    <>
      <StepContentAccordion title="Resultado da criptografia SDES">
        <ExplanationText>
          Explicação breve sobre o resutado obtido...
        </ExplanationText>
      </StepContentAccordion>
      <BitsField
        label="Bits da mensagem"
        bits={messageBits}
        labelAbove
        addChar
      />
      <BitsField label="Bits da chave" bits={keyBits} labelAbove />
      <BitsField
        label="Mensagem cifrada"
        bits={resultBits}
        labelAbove
        addChar
      />
    </>
  );
}

export default EndStep;
