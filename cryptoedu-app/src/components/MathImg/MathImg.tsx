import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

interface MathImgProps {
  src: string;
  alt: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      marginBottom: theme.spacing(2),
    },
  })
);

function MathImg(props: MathImgProps) {
  const { src, alt } = props;
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <img className={classes.img} src={src} alt={alt} />
    </Grid>
  );
}

export default MathImg;
