import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
  return <img className={classes.img} src={src} alt={alt} />;
}

export default MathImg;
