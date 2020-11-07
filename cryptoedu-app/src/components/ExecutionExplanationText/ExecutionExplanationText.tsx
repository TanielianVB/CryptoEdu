import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

interface ExecutionExplanationTextProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    explanation: {
      minHeight:
        "calc(2 * " +
        theme.typography.caption.lineHeight +
        " * " +
        theme.typography.caption.fontSize +
        ")",
    },
  })
);

function ExecutionExplanationText(props: ExecutionExplanationTextProps) {
  const classes = useStyles();
  return (
    <Typography
      variant="caption"
      display="block"
      align="justify"
      className={classes.explanation}
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}

export default ExecutionExplanationText;
