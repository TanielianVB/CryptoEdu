import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

interface ExecutionExplanationTextProps {
  children: React.ReactNode;
  minLineSizeMultiplier?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    explanation: {
      minHeight: (props: ExecutionExplanationTextProps) =>
        "calc(" +
        (props.minLineSizeMultiplier === undefined
          ? 2
          : props.minLineSizeMultiplier) +
        " * " +
        theme.typography.caption.lineHeight +
        " * " +
        theme.typography.caption.fontSize +
        ")",
    },
  })
);

function ExecutionExplanationText(props: ExecutionExplanationTextProps) {
  const classes = useStyles(props);
  return (
    <Typography
      variant="caption"
      display="block"
      align="center"
      className={classes.explanation}
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}

export default ExecutionExplanationText;
