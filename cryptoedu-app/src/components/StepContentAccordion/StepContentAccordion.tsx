import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";

interface StepContentAccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

function StepContentAccordion(props: StepContentAccordionProps) {
  const { title, children } = props;
  return (
    <Accordion square elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
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
