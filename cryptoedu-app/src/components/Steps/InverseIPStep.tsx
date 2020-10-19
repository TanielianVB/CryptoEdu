import React from "react";
import { Grid, Typography } from "@material-ui/core";

interface InverseIPStepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function InverseIPStep(props: InverseIPStepProps) {
  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom>
        IP<sup>-1</sup> (Inverse Initial Permutation)
      </Typography>
      <Typography variant="h6" color="secondary">
        Em desenvolvimento...
      </Typography>
    </>
  );
}

export default InverseIPStep;
