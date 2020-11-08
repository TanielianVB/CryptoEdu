import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import FK2EPStep from "../Steps/FK2EPStep";
import FK2S0S2Step from "../Steps/FK2S0S1Step";

interface FK2StepProps {
  swRBits: number[];
  epBits: number[];
  k2Bits: number[];
  epXorK2Bits: number[];
  subBits: number[];
  p4Bits: number[];
  swLBits: number[];
  p4XorSwLBits: number[];
  secondFKBits: number[];
}

function FK2Step(props: FK2StepProps) {
  const {
    swRBits,
    epBits,
    k2Bits,
    epXorK2Bits,
    subBits,
    p4Bits,
    swLBits,
    p4XorSwLBits,
    secondFKBits,
  } = props;

  return (
    <>
      <FK2EPStep
        swRBits={swRBits}
        epBits={epBits}
        k2Bits={k2Bits}
        epXorK2Bits={epXorK2Bits}
      />
      <FK2S0S2Step
        epXorK2Bits={epXorK2Bits}
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
              K<sub>2</sub>
            </sub>
          </>
        }
      >
        <ExplanationText>...</ExplanationText>
      </StepContentAccordion>
      <SplitBitsField
        leftLabel={
          <>
            R<sub>P4</sub> &oplus; L de SW
          </>
        }
        rightLabel="R de SW"
        bits={secondFKBits}
      />
      <BitsField
        label={
          <>
            R
            <sub>
              f
              <sub>
                K<sub>2</sub>
              </sub>
            </sub>{" "}
            = Resultado de f
            <sub>
              K<sub>2</sub>
            </sub>{" "}
            = (R<sub>P4</sub> &oplus; L de SW) + R de SW
          </>
        }
        bits={secondFKBits}
        labelAbove
      />
    </>
  );
}

export default FK2Step;
