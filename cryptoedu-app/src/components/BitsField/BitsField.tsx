import React from "react";
import { Grid } from "@material-ui/core";
import BitTextField from "../BitTextField/BitTextField";

interface BitsFieldProps {
  bits: number[];
}

function BitsField(props: BitsFieldProps) {
  const { bits } = props;
  return (
    <Grid container spacing={1}>
      {bits.map((b, i) => {
        return (
          <Grid item>
            <BitTextField index={i} value={b} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BitsField;
