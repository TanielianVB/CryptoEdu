import React from "react";
import { Typography } from "@material-ui/core";
import StepContentTitle from "../StepContentTitle/StepContentTitle";

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
      <Typography variant="h6" color="secondary">
        Em desenvolvimento...
      </Typography>
    </>
  );
}

export default SWStep;
