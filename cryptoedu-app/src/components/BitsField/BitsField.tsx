import React from "react";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BitArrayField from "../BitArrayField/BitArrayField";
import BitsFieldLabel from "../BitsFieldLabel/BitsFieldLabel";

interface BitsFieldProps {
  label: React.ReactNode;
  bits: number[];
  addChar?: boolean;
  gridItem?: boolean;
  paragraphMargin?: boolean;
  labelAbove?: boolean;
  accent?: number | number[];
  focus?: number | number[];
  accentNumbers?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paragraphMargin: {
      marginBottom: theme.spacing(2),
    },
    margin: {
      marginBottom: theme.spacing(1),
    },
    label: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.up("sm")]: {
        justifyContent: "flex-end",
      },
    },
    labelRow: {
      display: "flex",
      [theme.breakpoints.up("xs")]: {
        justifyContent: "center",
      },
    },
    bits: {
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.up("sm")]: {
        justifyContent: "flex-start",
      },
    },
    bitsRow: {
      [theme.breakpoints.up("xs")]: {
        justifyContent: "center",
      },
    },
  })
);

function BitsField(props: BitsFieldProps) {
  const {
    label,
    bits,
    addChar,
    gridItem,
    paragraphMargin,
    labelAbove,
    accent,
    focus,
    accentNumbers,
  } = props;

  const classes = useStyles();

  const gridClassName =
    paragraphMargin === true || paragraphMargin === undefined
      ? classes.paragraphMargin
      : classes.margin;

  const labelClassName = labelAbove ? classes.labelRow : classes.label;
  const bitsClassName = labelAbove ? classes.bitsRow : classes.bits;

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
      <Grid
        item
        xs={12}
        sm={labelAbove ? undefined : 3}
        className={labelClassName}
      >
        <BitsFieldLabel>{label}</BitsFieldLabel>
      </Grid>
      <Grid
        item
        xs={12}
        sm={labelAbove ? undefined : 9}
        className={bitsClassName}
      >
        <BitArrayField
          bits={bits}
          className={bitsClassName}
          addChar={addChar}
          accent={accent}
          focus={focus}
          accentNumbers={accentNumbers}
        />
      </Grid>
    </Grid>
  );
}

export default BitsField;
