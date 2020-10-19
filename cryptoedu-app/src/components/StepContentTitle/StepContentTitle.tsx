import React from "react";
import { Typography } from "@material-ui/core";

interface StepContentTitleProps {
  children: React.ReactNode;
}

function StepContentTitle(props: StepContentTitleProps) {
  return (
    <Typography variant="h5" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

export default StepContentTitle;
