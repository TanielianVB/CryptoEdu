import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

interface ExecutionExplanationAccentTextProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accent: {
      fontWeight: "bold",
    },
  })
);

function ExecutionExplanationAccentText(
  props: ExecutionExplanationAccentTextProps
) {
  const classes = useStyles();
  return (
    <Typography
      variant="caption"
      color="secondary"
      display="inline"
      align="justify"
      className={classes.accent}
    >
      {props.children}
    </Typography>
  );
}

export default ExecutionExplanationAccentText;
