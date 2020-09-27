import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

interface ToggleButtonsProps {
  initialSelectedOption: string;
  options: {
    value: string;
    text: string;
    supported: boolean;
  }[];
}

function ToggleButtons(props: ToggleButtonsProps) {
  const { initialSelectedOption, options } = props;

  const [selectedOption, setSelectedOption] = useState<string>(initialSelectedOption);

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
          <ToggleButton value={option.value} disabled={!option.supported}>
            <Typography
              color={
                option.value === selectedOption ? "secondary" : "textPrimary"
              }
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
