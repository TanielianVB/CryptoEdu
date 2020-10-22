import React from "react";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BitArrayField from "../BitArrayField/BitArrayField";
import BitsFieldLabel from "../BitsFieldLabel/BitsFieldLabel";

interface BitsFieldProps {
  label: React.ReactNode;
  bits: number[];
  addChar?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      marginBottom: theme.spacing(2),
    },
    label: {
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.up("md")]: {
        justifyContent: "flex-end",
      },
    },
    bits: {
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.up("md")]: {
        justifyContent: "flex-start",
      },
    },
  })
);

function BitsField(props: BitsFieldProps) {
  const { label, bits, addChar } = props;

  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
      className={classes.grid}
    >
      <Grid item container xs={12} md={3} className={classes.label}>
        <BitsFieldLabel>{label}</BitsFieldLabel>
      </Grid>
      <Grid item container xs={12} md={9} className={classes.bits}>
        <BitArrayField
          gridItem={true}
          bits={bits}
          className={classes.bits}
          addChar={addChar}
        />
      </Grid>
    </Grid>
  );
}

export default BitsField;
