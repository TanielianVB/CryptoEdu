import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

interface ExecutionExplanationRelevantTextProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    relevant: {
      fontWeight: "bold",
    },
  })
);

function ExecutionExplanationRelevantText(
  props: ExecutionExplanationRelevantTextProps
) {
  const classes = useStyles();
  return (
    <Typography
      variant="caption"
      color="primary"
      display="inline"
      align="justify"
      className={classes.relevant}
    >
      {props.children}
    </Typography>
  );
}

export default ExecutionExplanationRelevantText;
