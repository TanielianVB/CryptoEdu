import React from "react";
import SDES from "../../utils/SDES";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";
import UnderDevelopmentTag from "../../components/UnderDevelopmentTag/UnderDevelopmentTag";
import BitsField from "../../components/BitsField/BitsField";

interface InverseIPStepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function InverseIPStep(props: InverseIPStepProps) {
  return (
    <>
      <StepContentTitle>
        IP<sup>-1</sup> - Permutação Inicial Inversa
      </StepContentTitle>
      <BitsField
        label={
          <>
            IP<sup>-1</sup>
          </>
        }
        bits={SDES.getInverseIPPositions()}
      />
      <UnderDevelopmentTag />
    </>
  );
}

export default InverseIPStep;
