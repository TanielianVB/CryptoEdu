import React from "react";
import SDES from "../../utils/SDES";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";

interface InverseIPStepProps {
  fK2Bits: number[];
  iipBits: number[];
}

function InverseIPStep(props: InverseIPStepProps) {
  const { fK2Bits, iipBits } = props;

  return (
    <>
      <StepContentAccordion
        title={
          <>
            IP<sup>-1</sup> - Permutação Inicial Inversa
          </>
        }
      >
        <ExplanationText>...</ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel={
          <>
            IP<sup>-1</sup>
          </>
        }
        permutation={SDES.getInverseIPPositions()}
        inputLabel={
          <>
            R
            <sub>
              f
              <sub>
                K<sub>2</sub>
              </sub>
            </sub>
          </>
        }
        input={fK2Bits}
        outputLabel={
          <>
            R
            <sub>
              f
              <sub>
                K<sub>2</sub>
              </sub>
            </sub>{" "}
            permutada
          </>
        }
        output={iipBits}
      />
    </>
  );
}

export default InverseIPStep;
