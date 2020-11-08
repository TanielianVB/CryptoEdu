import React from "react";
import { Grid } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import Utils from "../../utils/Utils";

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
          bits={Utils.leftHalf(bits)}
          paragraphMargin={paragraphMargin}
          labelAbove
        />
      </Grid>
      <Grid item>
        <BitsField
          label={rightLabel}
          bits={Utils.rightHalf(bits)}
          paragraphMargin={paragraphMargin}
          labelAbove
        />
      </Grid>
    </Grid>
  );
}

export default SplitBitsField;
