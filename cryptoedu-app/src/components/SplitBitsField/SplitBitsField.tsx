import React from "react";
import { Grid } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";

interface SplitBitsFieldProps {
  leftLabel: React.ReactNode;
  rightLabel: React.ReactNode;
  bits: number[];
  paragraphMargin?: boolean;
}

function SplitBitsField(props: SplitBitsFieldProps) {
  const { leftLabel, rightLabel, bits, paragraphMargin } = props;

  return (
    <Grid container justify="center" alignItems="center" spacing={1}>
      <Grid item>
        <BitsField
          label={leftLabel}
          bits={bits.slice(0, bits.length / 2)}
          paragraphMargin={paragraphMargin}
          labelAbove
        />
      </Grid>
      <Grid item>
        <BitsField
          label={rightLabel}
          bits={bits.slice(bits.length / 2, bits.length)}
          paragraphMargin={paragraphMargin}
          labelAbove
        />
      </Grid>
    </Grid>
  );
}

export default SplitBitsField;
