import React from "react";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import FirstFKEPStep from "../Steps/FirstFKEPStep";
import FirstFKSubstitutionStep from "../Steps/FirstFKSubstitutionStep";

interface FirstFKStepProps {
  mode: "encrypt" | "decrypt";
  ipRBits: number[];
  epBits: number[];
  keyNumber: number;
  keyBits: number[];
  epXorKeyBits: number[];
  subBits: number[];
  p4Bits: number[];
  ipLBits: number[];
  p4XorIpLBits: number[];
  firstFKBits: number[];
}

function FirstFKStep(props: FirstFKStepProps) {
  const {
    mode,
    ipRBits,
    epBits,
    keyNumber,
    keyBits,
    epXorKeyBits,
    subBits,
    p4Bits,
    ipLBits,
    p4XorIpLBits,
    firstFKBits,
  } = props;

  return (
    <>
      <FirstFKEPStep
        mode={mode}
        ipRBits={ipRBits}
        epBits={epBits}
        keyNumber={keyNumber}
        keyBits={keyBits}
        epXorKeyBits={epXorKeyBits}
      />
      <FirstFKSubstitutionStep
        epXorKeyBits={epXorKeyBits}
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
              K<sub>{keyNumber}</sub>
            </sub>
          </>
        }
      >
        <ExplanationText>
          O resultado da função f
          <sub>
            K<sub>{keyNumber}</sub>
          </sub>{" "}
          será simplesmente a junção do R<sub>&oplus;</sub> obtido no passo
          anterior com R (de IP) obtido na permutação inicial. Sendo assim,
          temos:
        </ExplanationText>
      </StepContentAccordion>
      <SplitBitsField
        leftLabel={
          <>
            R<sub>&oplus;</sub> = R<sub>P4</sub> &oplus; L (de IP)
          </>
        }
        rightLabel="R (de IP)"
        bits={firstFKBits}
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
            = R<sub>&oplus;</sub> + R (de IP)
          </>
        }
        bits={firstFKBits}
        labelAbove
      />
    </>
  );
}

export default FirstFKStep;
