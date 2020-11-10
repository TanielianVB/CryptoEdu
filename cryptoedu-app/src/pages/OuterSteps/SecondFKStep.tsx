import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import SecondFKEPStep from "../Steps/SecondFKEPStep";
import SecondFKSubstitutionStep from "../Steps/SecondFKSubstitutionStep";

interface SecondFKStepProps {
  mode: "encrypt" | "decrypt";
  swRBits: number[];
  epBits: number[];
  keyNumber: number;
  keyBits: number[];
  epXorKeyBits: number[];
  subBits: number[];
  p4Bits: number[];
  swLBits: number[];
  p4XorSwLBits: number[];
  secondFKBits: number[];
}

function SecondFKStep(props: SecondFKStepProps) {
  const {
    mode,
    swRBits,
    epBits,
    keyNumber,
    keyBits,
    epXorKeyBits,
    subBits,
    p4Bits,
    swLBits,
    p4XorSwLBits,
    secondFKBits,
  } = props;

  return (
    <>
      <SecondFKEPStep
        mode={mode}
        swRBits={swRBits}
        epBits={epBits}
        keyNumber={keyNumber}
        keyBits={keyBits}
        epXorKeyBits={epXorKeyBits}
      />
      <SecondFKSubstitutionStep
        epXorKeyBits={epXorKeyBits}
        subBits={subBits}
        p4Bits={p4Bits}
        swLBits={swLBits}
        p4XorSwLBits={p4XorSwLBits}
      />
      <StepContentAccordion
        title={
          <>
            Resultado de f
            <sub>
              K<sub>{keyNumber}</sub>
            </sub>
          </>
        }
      >
        <ExplanationText>...</ExplanationText>
      </StepContentAccordion>
      <SplitBitsField
        leftLabel={
          <>
            R<sub>&oplus;</sub> = R<sub>P4</sub> &oplus; L (de SW)
          </>
        }
        rightLabel="R (de SW)"
        bits={secondFKBits}
      />
      <BitsField
        label={
          <>
            R
            <sub>
              f
              <sub>
                K<sub>{keyNumber}</sub>
              </sub>
            </sub>{" "}
            = Resultado de f
            <sub>
              K<sub>{keyNumber}</sub>
            </sub>{" "}
            = R<sub>&oplus;</sub> + R (de SW)
          </>
        }
        bits={secondFKBits}
        labelAbove
      />
    </>
  );
}

export default SecondFKStep;
