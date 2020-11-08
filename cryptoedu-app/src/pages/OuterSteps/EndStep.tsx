import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";

interface EndStepProps {
  mode: "encrypt" | "decrypt";
  messageBits: number[];
  keyBits: number[];
  resultBits: number[];
}

function EndStep(props: EndStepProps) {
  const { mode, messageBits, keyBits, resultBits } = props;

  return (
    <>
      <StepContentAccordion
        title={
          <>
            Resultado da{" "}
            {mode === "encrypt" ? "criptografia" : "descriptografia"} SDES
          </>
        }
      >
        <ExplanationText>
          Explicação breve sobre o resutado obtido...
        </ExplanationText>
      </StepContentAccordion>
      <BitsField
        label={<>Bits da mensagem{mode === "encrypt" ? "" : " cifrada"}</>}
        bits={messageBits}
        labelAbove
        addChar
      />
      <BitsField label="Bits da chave" bits={keyBits} labelAbove />
      <BitsField
        label={<>Mensagem {mode === "encrypt" ? "cifrada" : "descifrada"}</>}
        bits={resultBits}
        labelAbove
        addChar
      />
    </>
  );
}

export default EndStep;
