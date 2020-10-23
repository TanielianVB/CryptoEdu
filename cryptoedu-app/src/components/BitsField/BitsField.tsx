import React from "react";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BitArrayField from "../BitArrayField/BitArrayField";
import BitsFieldLabel from "../BitsFieldLabel/BitsFieldLabel";

interface BitsFieldProps {
  label: React.ReactNode;
  bits: number[];
  addChar?: boolean;
  paragraphMargin?: boolean;
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
    bits: {
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.up("sm")]: {
        justifyContent: "flex-start",
      },
    },
  })
);

function BitsField(props: BitsFieldProps) {
  const { label, bits, addChar, paragraphMargin } = props;

  const classes = useStyles();

  const gridClassName =
    paragraphMargin === true || paragraphMargin === undefined
      ? classes.paragraphMargin
      : classes.margin;

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
      className={gridClassName}
    >
      <Grid item xs={12} sm={3} className={classes.label}>
        <BitsFieldLabel>{label}</BitsFieldLabel>
      </Grid>
      <Grid item xs={12} sm={9} className={classes.bits}>
        <BitArrayField bits={bits} className={classes.bits} addChar={addChar} />
      </Grid>
    </Grid>
  );
}

export default BitsField;
