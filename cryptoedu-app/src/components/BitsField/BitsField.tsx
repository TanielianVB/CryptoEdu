import React from "react";
import {
  Grid,
  GridJustification,
  TextField,
  Typography,
} from "@material-ui/core";
import BitTextField from "../BitTextField/BitTextField";
import Utils from "../../utils/Utils";

interface BitsFieldProps {
  bits: number[];
  justify?: GridJustification;
  addChar?: boolean;
}

function BitsField(props: BitsFieldProps) {
  const { bits, justify, addChar } = props;
  return (
    <Grid container spacing={1} justify={justify} alignItems="center">
      {bits.map((b, i) => {
        return (
          <Grid item>
            <BitTextField position={i + 1} value={b} />
          </Grid>
        );
      })}
      {addChar && (
        <>
          <Grid item>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              =
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Char"
              variant="outlined"
              size="small"
              style={{ width: "52px" }}
              value={Utils.getChar(bits)}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default BitsField;
