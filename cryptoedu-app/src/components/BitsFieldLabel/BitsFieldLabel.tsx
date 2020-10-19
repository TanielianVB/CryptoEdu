import React from "react";
import { Typography } from "@material-ui/core";

interface BitsFieldLabelProps {
  children: React.ReactNode;
}

function BitsFieldLabel(props: BitsFieldLabelProps) {
  return (
    <Typography variant="subtitle2" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

export default BitsFieldLabel;
