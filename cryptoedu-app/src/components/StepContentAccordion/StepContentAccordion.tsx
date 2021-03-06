import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
} from "@material-ui/core";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";
import ExplanationsInitiallyOpenContext from "../ExplanationsInitiallyOpenContext/ExplanationsInitiallyOpenContext";

interface StepContentAccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

function StepContentAccordion(props: StepContentAccordionProps) {
  const { title, children } = props;

  const explanationsInitiallyOpen = useContext(
    ExplanationsInitiallyOpenContext
  );

  const [expanded, setExpanded] = useState(explanationsInitiallyOpen);

  const expandIcon = expanded ? (
    <Tooltip title="Fechar explicação">
      <ExpandMoreRoundedIcon />
    </Tooltip>
  ) : (
    <Tooltip title="Abrir explicação">
      <HelpOutlineRoundedIcon />
    </Tooltip>
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
