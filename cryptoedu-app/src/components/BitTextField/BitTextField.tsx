import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

interface BitTextFieldProps {
  position: string;
  value: string;
  accent?: boolean;
  focus?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accent: {
      "& label.Mui-focused": {
        color: theme.palette.secondary.main,
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: theme.palette.secondary.main,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.secondary.main,
        },
      },
    },
    focus: {
      "& label": {
        color: theme.palette.secondary.main,
      },
      "& input": {
        color: theme.palette.secondary.main,
        fontWeight: "bold",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderWidth: "2px",
        },
      },
    },
  })
);

function BitTextField(props: BitTextFieldProps) {
  const { position, value, accent, focus } = props;

  const classes = useStyles();

  let className = accent ? classes.accent : "";
  className = focus ? className + " " + classes.focus : className;

  return (
    <TextField
      label={position}
      value={value}
      variant="outlined"
      size="small"
      className={className}
      style={{ width: value.length === 1 ? "37px" : "46px" }}
    />
  );
}

export default BitTextField;
