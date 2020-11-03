import React from "react";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BitsFieldLabel from "../BitsFieldLabel/BitsFieldLabel";
import MatrixField from "../MatrixField/MatrixField";

interface BitMatrixFieldProps {
  label: React.ReactNode;
  bits: number[][][];
  gridItem?: boolean;
  paragraphMargin?: boolean;
  // accent?: number;
  // focus?: number;
  // accentNumbers?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paragraphMargin: {
      marginBottom: theme.spacing(2),
    },
    margin: {
      marginBottom: theme.spacing(1),
    },
    labelRow: {
      display: "flex",
      [theme.breakpoints.up("xs")]: {
        justifyContent: "center",
      },
    },
    bitsRow: {
      [theme.breakpoints.up("xs")]: {
        justifyContent: "center",
      },
    },
  })
);

function BitMatrixField(props: BitMatrixFieldProps) {
  const {
    label,
    bits,
    gridItem,
    paragraphMargin,
    // accent,
    // focus,
    // accentNumbers,
  } = props;

  const classes = useStyles();

  const gridClassName =
    paragraphMargin === true || paragraphMargin === undefined
      ? classes.paragraphMargin
      : classes.margin;

  return (
    <Grid
      item={gridItem}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
      className={gridClassName}
    >
      <Grid item xs={12} className={classes.labelRow}>
        <BitsFieldLabel>{label}</BitsFieldLabel>
      </Grid>
      <Grid item xs={12} className={classes.bitsRow}>
        {/* <BitArrayField
          bits={bits}
          className={classes.bitsRow}
          addChar={addChar}
          accent={accent}
          focus={focus}
          accentNumbers={accentNumbers}
        /> */}
        <MatrixField bits={bits} justify="center" />
      </Grid>
    </Grid>
  );
}

export default BitMatrixField;
