import React from "react";
import { Grid, GridJustification } from "@material-ui/core";
import BitTextField from "../BitTextField/BitTextField";

interface BitsFieldProps {
  bits: number[];
  justify?: GridJustification;
}

function BitsField(props: BitsFieldProps) {
  const { bits, justify } = props;
  return (
    <Grid container spacing={1} justify={justify}>
      {bits.map((b, i) => {
        return (
          <Grid item>
            <BitTextField position={i + 1} value={b} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BitsField;
