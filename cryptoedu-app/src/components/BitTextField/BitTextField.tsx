import React from "react";
import { TextField } from "@material-ui/core";

interface BitTextFieldProps {
  position: string;
  value: string;
}

function BitTextField(props: BitTextFieldProps) {
  const { position, value } = props;

  return (
    <TextField
      label={position}
      value={value}
      variant="outlined"
      size="small"
      style={{ width: value.length === 1 ? "37px" : "46px" }}
    />
  );
}

export default BitTextField;
