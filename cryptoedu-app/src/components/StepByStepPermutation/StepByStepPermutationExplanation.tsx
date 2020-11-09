import React from "react";
import ExecutionExplanationText from "../ExecutionExplanationText/ExecutionExplanationText";
import Accent from "../ExecutionExplanationText/ExecutionExplanationAccentText";
import Relevant from "../ExecutionExplanationText/ExecutionExplanationRelevantText";

interface StepByStepPermutationExplanationProps {
  position: number;
  step: "start" | "permutation" | "input" | "output" | "finish";
  inputPosition: number;
  outputValue: number;
  fullOutput: number[];
  permutationLabel: React.ReactNode;
  inputLabel: React.ReactNode;
  outputShortLabel: React.ReactNode;
  outputLabel: React.ReactNode;
}

function StepByStepPermutationExplanation(
  props: StepByStepPermutationExplanationProps
) {
  const {
    position,
    step,
    inputPosition,
    outputValue,
    fullOutput,
    permutationLabel,
    inputLabel,
    outputShortLabel,
    outputLabel,
  } = props;

  let executionExplanation = <> </>;

  switch (step) {
    case "start":
      executionExplanation = (
        <>
          Inicie a execução da permutação clicando na seta à
          <Accent> direita</Accent>
        </>
      );
      break;
    case "permutation":
      executionExplanation = (
        <>
          Posição <Accent>{position}</Accent> de{" "}
          <Relevant>{permutationLabel}</Relevant> indica que a posição que será{" "}
          utilizada de <Relevant>{inputLabel}</Relevant> é a{" "}
          <Accent>{inputPosition}</Accent>
        </>
      );
      break;
    case "input":
      executionExplanation = (
        <>
          A posição <Accent>{inputPosition}</Accent> de{" "}
          <Relevant>{inputLabel}</Relevant> possui valor{" "}
          <Accent>{outputValue}</Accent> que será o valor da posição{" "}
          <Accent>{position}</Accent> de <Relevant>{outputShortLabel}</Relevant>
        </>
      );
      break;
    case "output":
      executionExplanation = (
        <>
          Posição <Accent>{position}</Accent> de{" "}
          <Relevant>{outputShortLabel}</Relevant> é então{" "}
          <Accent>{outputValue}</Accent>
        </>
      );
      break;
    case "finish":
      executionExplanation = (
        <>
          <Relevant>{outputLabel}</Relevant> é então{" "}
          <Accent>{fullOutput.join("")}</Accent>
        </>
      );
      break;
    default:
      throw new Error();
  }

  return (
    <ExecutionExplanationText>{executionExplanation}</ExecutionExplanationText>
  );
}

export default StepByStepPermutationExplanation;
