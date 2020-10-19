import React from "react";
import { Grid } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import SDES from "../../utils/SDES";
import StepContentTitle from "../StepContentTitle/StepContentTitle";
import BitsFieldLabel from "../BitsFieldLabel/BitsFieldLabel";
import UnderDevelopmentTag from "../UnderDevelopmentTag/UnderDevelopmentTag";

interface InverseIPStepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function InverseIPStep(props: InverseIPStepProps) {
  return (
    <>
      <StepContentTitle>
        IP<sup>-1</sup> (Inverse Initial Permutation)
      </StepContentTitle>
      <Grid container justify="center">
        <BitsFieldLabel>
          Função de permutação IP<sup>-1</sup>:
        </BitsFieldLabel>
        <BitsField bits={SDES.getInverseIPPositions()} justify="center" />
      </Grid>
      <UnderDevelopmentTag />
    </>
  );
}

export default InverseIPStep;
