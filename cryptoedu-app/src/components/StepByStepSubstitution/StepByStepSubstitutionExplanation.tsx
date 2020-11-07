import React from "react";
import ExecutionExplanationText from "../ExecutionExplanationText/ExecutionExplanationText";
import Accent from "../ExecutionExplanationText/ExecutionExplanationAccentText";
import Relevant from "../ExecutionExplanationText/ExecutionExplanationRelevantText";

interface StepByStepSubstitutionExplanationProps {
  position: number;
  step: "start" | "substitution" | "input" | "output" | "finish";
  inputPosition: number;
  outputValue: number;
  fullOutput: number[];
  substitutionLabel: React.ReactNode;
  inputLabel: React.ReactNode;
  outputLabel: React.ReactNode;
}

function StepByStepSubstitutionExplanation(
  props: StepByStepSubstitutionExplanationProps
) {
  const {
    position,
    step,
    inputPosition,
    outputValue,
    fullOutput,
    substitutionLabel,
    inputLabel,
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
    case "substitution":
      executionExplanation = (
        <>
          Posição
          <Accent>{" " + position + " "}</Accent>
          de
          <Relevant>{" " + substitutionLabel + " "}</Relevant>
          indica que a posição que irá ser utilizada de
          <Relevant>{" " + inputLabel + " "}</Relevant> é a
          <Accent>{" " + inputPosition + " "}</Accent>
        </>
      );
      break;
    case "input":
      executionExplanation = (
        <>
          A posição
          <Accent>{" " + inputPosition + " "}</Accent>
          de <Relevant>{" " + inputLabel + " "}</Relevant> possui valor
          <Accent>{" " + outputValue + " "}</Accent>
          que será o valor da posição
          <Accent>{" " + position + " "}</Accent>
          de
          <Relevant>{" " + outputLabel + " "}</Relevant>
        </>
      );
      break;
    case "output":
      executionExplanation = (
        <>
          Posição
          <Accent>{" " + position + " "}</Accent>
          de
          <Relevant>{" " + outputLabel + " "}</Relevant> é então
          <Accent>{" " + outputValue + " "}</Accent>
        </>
      );
      break;
    case "finish":
      executionExplanation = (
        <>
          <Relevant>{outputLabel + " "}</Relevant> é então
          <Accent>{" " + fullOutput.join("")}</Accent>
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

export default StepByStepSubstitutionExplanation;
