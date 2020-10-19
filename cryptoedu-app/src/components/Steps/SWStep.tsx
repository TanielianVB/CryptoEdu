import React from "react";
import StepContentTitle from "../StepContentTitle/StepContentTitle";
import UnderDevelopmentTag from "../UnderDevelopmentTag/UnderDevelopmentTag";

interface SWStepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function SWStep() {
  return (
    <>
      <StepContentTitle>
        SW & f
        <sub>
          k<sub>2</sub>
        </sub>
      </StepContentTitle>
      <UnderDevelopmentTag />
    </>
  );
}

export default SWStep;
