import React from "react";
import { TextField } from "@material-ui/core";

interface BitTextFieldProps {
  index: number;
  value: number;
}

function BitTextField(props: BitTextFieldProps) {
  const { index, value } = props;

  return (
    <TextField
      label={index.toString()}
      value={value.toString()}
      variant="outlined"
      size="small"
      style={{ width: "37px" }}
    />
  );
}

export default BitTextField;
