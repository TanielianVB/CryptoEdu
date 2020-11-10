import React from "react";
import ExecutionExplanationText from "../ExecutionExplanationText/ExecutionExplanationText";
import Accent from "../ExecutionExplanationText/ExecutionExplanationAccentText";
import Relevant from "../ExecutionExplanationText/ExecutionExplanationRelevantText";

interface StepByStepXORExplanationProps {
  position: number;
  step: "start" | "input" | "output" | "finish";
  inputPosition: number;
  outputValue: number;
  fullOutput: number[];
  inputALabel: React.ReactNode;
  inputBLabel: React.ReactNode;
  outputLabel: React.ReactNode;
}

function StepByStepXORExplanation(props: StepByStepXORExplanationProps) {
  const {
    position,
    step,
    inputPosition,
    outputValue,
    fullOutput,
    inputALabel,
    inputBLabel,
    outputLabel,
  } = props;

  let executionExplanation = <></>;

  switch (step) {
    case "start":
      executionExplanation = (
        <>
          Inicie a execução da rotação nas setas às <Accent>direita</Accent>.
        </>
      );
      break;
    case "input":
      executionExplanation = (
        <>
          A posição <Accent>{inputPosition}</Accent> de{" "}
          <Relevant>{inputALabel}</Relevant> <Accent>XOR</Accent> A posição{" "}
          <Accent>{inputPosition}</Accent> de <Relevant>{inputBLabel}</Relevant>{" "}
          é o valor da posição <Accent>{inputPosition}</Accent> de{" "}
          <Relevant>{outputLabel}</Relevant>.
        </>
      );
      break;
    case "output":
      executionExplanation = (
        <>
          Posição <Accent>{position}</Accent> de{" "}
          <Relevant>{outputLabel}</Relevant> é então{" "}
          <Accent>{outputValue}</Accent>.
        </>
      );
      break;
    case "finish":
      executionExplanation = (
        <>
          <Relevant>{outputLabel}</Relevant> é então{" "}
          <Accent>{fullOutput.join("")}</Accent>.
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

export default StepByStepXORExplanation;
