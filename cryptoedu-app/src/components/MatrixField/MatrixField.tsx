import React from "react";
import { Grid, GridJustification } from "@material-ui/core";
import BitTextField from "../BitTextField/BitTextField";

interface MatrixFieldProps {
  bits: number[][][];
  justify?: GridJustification;
  accentFullRow?: number;
  accentFullCol?: number;
  accentRow?: number;
  accentCol?: number;
  focusRow?: number;
  focusCol?: number;
}

function MatrixField(props: MatrixFieldProps) {
  const {
    bits,
    justify,
    accentFullRow,
    accentFullCol,
    accentRow,
    accentCol,
    focusRow,
    focusCol,
  } = props;

  const isAccent = (rowIndex: number, colIndex: number): boolean => {
    if (rowIndex === accentFullRow) {
      return true;
    } else if (colIndex === accentFullCol) {
      return true;
    } else if (rowIndex === accentRow && colIndex === accentCol) {
      return true;
    }
    return false;
  };

  const isFocus = (rowIndex: number, colIndex: number): boolean => {
    if (rowIndex === focusRow && colIndex === focusCol) {
      return true;
    }
    return false;
  };

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
            {bitRow.map((bitCol, colIndex) => {
              return (
                <Grid item>
                  <BitTextField
                    position={rowIndex.toString() + colIndex.toString()}
                    value={bitCol.join("")}
                    accent={isAccent(rowIndex, colIndex)}
                    focus={isFocus(rowIndex, colIndex)}
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
