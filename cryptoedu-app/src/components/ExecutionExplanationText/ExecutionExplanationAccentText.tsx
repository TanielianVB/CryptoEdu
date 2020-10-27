import React from "react";
import { Typography } from "@material-ui/core";

interface ExecutionExplanationAccentTextTextProps {
  children: React.ReactNode;
}

function ExecutionExplanationAccentTextText(
  props: ExecutionExplanationAccentTextTextProps
) {
  return (
    <Typography
      variant="caption"
      color="secondary"
      display="inline"
      align="justify"
    >
      {props.children}
    </Typography>
  );
}

export default ExecutionExplanationAccentTextText;
