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
  gridItem?: boolean;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

function BitArrayField(props: BitsFieldProps) {
  const { bits, justify, addChar, gridItem, className, style } = props;
  return (
    <Grid
      item={gridItem}
      container
      spacing={1}
      justify={justify}
      alignItems="center"
      className={className}
      style={style}
    >
      {bits.map((b, i) => {
        return (
          <Grid item>
            <BitTextField position={(i + 1).toString()} value={b.toString()} />
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

export default BitArrayField;
