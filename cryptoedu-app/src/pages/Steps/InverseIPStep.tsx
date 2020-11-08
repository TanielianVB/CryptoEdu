import React from "react";
import SDES from "../../utils/SDES";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";

interface InverseIPStepProps {
  secondFKBits: number[];
  iipBits: number[];
}

function InverseIPStep(props: InverseIPStepProps) {
  const { secondFKBits, iipBits } = props;

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
        input={secondFKBits}
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
