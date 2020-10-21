import React from "react";
import { Typography } from "@material-ui/core";

interface ExplanationTextProps {
  children: React.ReactNode;
}

function ExplanationText(props: ExplanationTextProps) {
  return (
    <Typography variant="body2" component="p" paragraph align="justify">
      {props.children}
    </Typography>
  );
}

export default ExplanationText;
