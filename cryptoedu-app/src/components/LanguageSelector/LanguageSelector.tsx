import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

function LanguageSelector() {
  const languages = [
    { value: "c", text: "C", supported: true },
    { value: "cs", text: "C#", supported: true },
    { value: "java", text: "Java", supported: true },
    { value: "javascript", text: "Javacript", supported: true },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState<string>("cs");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string
  ) => {
    if (newLanguage) {
      setSelectedLanguage(newLanguage);
    }
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={selectedLanguage}
      onChange={handleChange}
    >
      {languages.map((language) => {
        let button = (
          <ToggleButton value={language.value} disabled={!language.supported}>
            <Typography
              color={
                language.value === selectedLanguage ? "secondary" : "inherit"
              }
            >
              {language.text}
            </Typography>
          </ToggleButton>
        );
        return button;
      })}
    </ToggleButtonGroup>
  );
}

export default LanguageSelector;
