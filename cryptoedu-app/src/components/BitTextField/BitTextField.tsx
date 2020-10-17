import React from "react";
import { TextField } from "@material-ui/core";

interface BitTextFieldProps {
  position: number;
  value: number;
}

function BitTextField(props: BitTextFieldProps) {
  const { position, value } = props;

  return (
    <TextField
      label={position.toString()}
      value={value.toString()}
      variant="outlined"
      size="small"
      style={{ width: value.toString().length === 1 ? "37px" : "46px" }}
    />
  );
}

export default BitTextField;
