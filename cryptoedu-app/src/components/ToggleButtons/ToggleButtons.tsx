import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

interface ToggleButtonsProps {
  options: {
    id: string;
    text: string;
    supported: boolean;
  }[];
  selectedOption: string;
  setSelectedOption: (value: React.SetStateAction<string>) => void;
}

function ToggleButtons(props: ToggleButtonsProps) {
  const { options, selectedOption, setSelectedOption } = props;

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string
  ) => {
    if (newOption) {
      setSelectedOption(newOption);
    }
  };

  return (
    <ToggleButtonGroup exclusive value={selectedOption} onChange={handleChange}>
      {options.map((option) => {
        let button = (
          <ToggleButton value={option.id} disabled={!option.supported}>
            <Typography
              color={option.id === selectedOption ? "secondary" : "textPrimary"}
            >
              {option.text}
            </Typography>
          </ToggleButton>
        );
        return button;
      })}
    </ToggleButtonGroup>
  );
}

export default ToggleButtons;
