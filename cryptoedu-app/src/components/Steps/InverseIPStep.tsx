import React from "react";
import { Grid, Typography } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import SDES from "../../utils/SDES";
import StepContentTitle from "../StepContentTitle/StepContentTitle";

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
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Função de permutação IP<sup>-1</sup>:
        </Typography>
        <BitsField bits={SDES.getInverseIPPositions()} justify="center" />
      </Grid>
      <Typography variant="h6" color="secondary">
        Em desenvolvimento...
      </Typography>
    </>
  );
}

export default InverseIPStep;
