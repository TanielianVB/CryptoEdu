import React from "react";
import { Grid, Typography } from "@material-ui/core";

interface SWStepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function SWStep(props: SWStepProps) {
  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom>
        SW & f
        <sub>
          k<sub>2</sub>
        </sub>
      </Typography>
      <Typography variant="h6" color="secondary">
        Em desenvolvimento...
      </Typography>
    </>
  );
}

export default SWStep;
