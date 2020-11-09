import React from "react";
import { Typography } from "@material-ui/core";

interface ExplanationTextProps {
  color?:
    | "inherit"
    | "initial"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error"
    | undefined;
  paragraph?: boolean;
  children: React.ReactNode;
}

function ExplanationText(props: ExplanationTextProps) {
  const { color, paragraph, children } = props;

  return (
    <Typography
      variant="body2"
      component="p"
      color={color}
      paragraph={paragraph === undefined ? true : paragraph}
      align="justify"
    >
      {children}
    </Typography>
  );
}

export default ExplanationText;
