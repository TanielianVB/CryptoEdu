import React from "react";
import { Typography } from "@material-ui/core";

interface ExecutionExplanationTextProps {
  children: React.ReactNode;
}

function ExecutionExplanationText(props: ExecutionExplanationTextProps) {
  return (
    <Typography variant="caption" display="block" align="justify" gutterBottom>
      {props.children}
    </Typography>
  );
}

export default ExecutionExplanationText;
