import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";

interface StepContentAccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

function StepContentAccordion(props: StepContentAccordionProps) {
  const { title, children } = props;

  const [expanded, setExpanded] = useState(false);

  const expandIcon = expanded ? (
    <ExpandMoreRoundedIcon />
  ) : (
    <HelpOutlineRoundedIcon />
  );

  return (
    <Accordion
      square
      elevation={0}
      expanded={expanded}
      onChange={(event, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary
        expandIcon={expandIcon}
        IconButtonProps={{ color: "secondary" }}
        style={{ paddingLeft: "0" }}
      >
        <StepContentTitle>{title}</StepContentTitle>
      </AccordionSummary>
      <AccordionDetails style={{ display: "block", padding: "0" }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

export default StepContentAccordion;
