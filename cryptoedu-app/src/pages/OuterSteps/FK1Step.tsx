import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import FK1EPStep from "../Steps/FK1EPStep";
import FK1S0S1Step from "../Steps/FK1S0S1Step";

interface FK1StepProps {
  ipRBits: number[];
  epBits: number[];
  k1Bits: number[];
  epXorK1Bits: number[];
  subBits: number[];
  p4Bits: number[];
  ipLBits: number[];
  p4XorIpLBits: number[];
  firstFKBits: number[];
}

function FK1Step(props: FK1StepProps) {
  const {
    ipRBits,
    epBits,
    k1Bits,
    epXorK1Bits,
    subBits,
    p4Bits,
    ipLBits,
    p4XorIpLBits,
    firstFKBits,
  } = props;

  return (
    <>
      <FK1EPStep
        ipRBits={ipRBits}
        epBits={epBits}
        k1Bits={k1Bits}
        epXorK1Bits={epXorK1Bits}
      />
      <FK1S0S1Step
        epXorK1Bits={epXorK1Bits}
        subBits={subBits}
        p4Bits={p4Bits}
        ipLBits={ipLBits}
        p4XorIpLBits={p4XorIpLBits}
      />
      <StepContentAccordion
        title={
          <>
            Resultado de f
            <sub>
              K<sub>1</sub>
            </sub>
          </>
        }
      >
        <ExplanationText>...</ExplanationText>
      </StepContentAccordion>
      <SplitBitsField
        leftLabel={
          <>
            R<sub>P4</sub> &oplus; L de IP
          </>
        }
        rightLabel="R de IP"
        bits={firstFKBits}
      />
      <BitsField
        label={
          <>
            R
            <sub>
              f
              <sub>
                K<sub>1</sub>
              </sub>
            </sub>{" "}
            = Resultado de f
            <sub>
              K<sub>1</sub>
            </sub>{" "}
            = (R<sub>P4</sub> &oplus; L de IP) + R de IP
          </>
        }
        bits={firstFKBits}
        labelAbove
      />
    </>
  );
}

export default FK1Step;
