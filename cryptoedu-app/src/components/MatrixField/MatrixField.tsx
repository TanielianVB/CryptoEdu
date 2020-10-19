import React from "react";
import { Grid, GridJustification } from "@material-ui/core";
import BitTextField from "../BitTextField/BitTextField";

interface MatrixFieldProps {
  bits: number[][][];
  justify?: GridJustification;
}

function MatrixField(props: MatrixFieldProps) {
  const { bits, justify } = props;
  return (
    <Grid
      container
      direction="column"
      spacing={1}
      justify={justify}
      alignItems="center"
    >
      {bits.map((bitRow, rowIndex) => {
        return (
          <Grid
            item
            container
            spacing={1}
            justify={justify}
            alignItems="center"
          >
            {bitRow.map((bitColumn, columnIndex) => {
              return (
                <Grid item>
                  <BitTextField
                    position={rowIndex.toString() + columnIndex.toString()}
                    value={bitColumn.join("")}
                  />
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default MatrixField;
