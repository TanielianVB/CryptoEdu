import React from "react";
import ExecutionExplanationText from "../ExecutionExplanationText/ExecutionExplanationText";
import Accent from "../ExecutionExplanationText/ExecutionExplanationAccentText";
import Relevant from "../ExecutionExplanationText/ExecutionExplanationRelevantText";

interface StepByStepCircularLeftShiftExplanationProps {
  shift: number;
  position: number;
  step: "start" | "input" | "output" | "finish";
  inputPosition: number;
  outputValue: number;
  fullOutput: number[];
  inputLabel: React.ReactNode;
  outputLabel: React.ReactNode;
  outputShortLabel: React.ReactNode;
}

function StepByStepCircularLeftShiftExplanation(
  props: StepByStepCircularLeftShiftExplanationProps
) {
  const {
    shift,
    position,
    step,
    inputPosition,
    outputValue,
    fullOutput,
    inputLabel,
    outputLabel,
    outputShortLabel,
  } = props;

  let executionExplanation = <></>;

  switch (step) {
    case "start":
      executionExplanation = (
        <>
          Inicie a execução da rotação clicando na seta à{" "}
          <Accent> direita</Accent>
        </>
      );
      break;
    case "input":
      executionExplanation = (
        <>
          A posição <Accent>{inputPosition}</Accent> de{" "}
          <Relevant>{inputLabel}</Relevant> possui valor{" "}
          <Accent>{outputValue}</Accent> que será movido para a esquerda{" "}
          <Accent>{shift}x</Accent> indo para a posição{" "}
          <Accent>{position}</Accent> de <Relevant>{outputShortLabel}</Relevant>
        </>
      );
      break;
    case "output":
      executionExplanation = (
        <>
          Posição <Accent>{position}</Accent> de{" "}
          <Relevant>{outputLabel}</Relevant> é então{" "}
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
    <ExecutionExplanationText minLineSizeMultiplier={3}>
      {executionExplanation}
    </ExecutionExplanationText>
  );
}

export default StepByStepCircularLeftShiftExplanation;
