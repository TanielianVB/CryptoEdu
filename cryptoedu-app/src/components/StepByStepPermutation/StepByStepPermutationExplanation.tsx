import React from "react";
import ExecutionExplanationText from "../ExecutionExplanationText/ExecutionExplanationText";
import ExecutionExplanationAccentTextText from "../ExecutionExplanationText/ExecutionExplanationAccentText";

interface StepByStepPermutationExplanationProps {
  position: number;
  step: "permutation" | "input" | "output";
  inputPosition: number;
  outputValue: number;
  permutationLabel: string;
  inputLabel: string;
  outputLabel: string;
}

function StepByStepPermutationExplanation(
  props: StepByStepPermutationExplanationProps
) {
  const {
    position,
    step,
    inputPosition,
    outputValue,
    permutationLabel,
    inputLabel,
    outputLabel,
  } = props;

  let executionExplanation = (
    <>
      Inicie a execução da permutação clicando na seta à
      <ExecutionExplanationAccentTextText>
        {" "}
        direita
      </ExecutionExplanationAccentTextText>
    </>
  );

  if (position > 0) {
    switch (step) {
      case "permutation":
        executionExplanation = (
          <>
            Posição
            <ExecutionExplanationAccentTextText>
              {" " + position + " "}
            </ExecutionExplanationAccentTextText>
            de{" " + permutationLabel + " "}indica que a posição que irá ser
            utilizada de
            {" " + inputLabel + " "} é a
            <ExecutionExplanationAccentTextText>
              {" " + inputPosition + " "}
            </ExecutionExplanationAccentTextText>
          </>
        );
        break;
      case "input":
        executionExplanation = (
          <>
            A posição
            <ExecutionExplanationAccentTextText>
              {" " + inputPosition + " "}
            </ExecutionExplanationAccentTextText>
            de {" " + inputLabel + " "} possui valor
            <ExecutionExplanationAccentTextText>
              {" " + outputValue + " "}
            </ExecutionExplanationAccentTextText>
            que será o valor da posição
            <ExecutionExplanationAccentTextText>
              {" " + position + " "}
            </ExecutionExplanationAccentTextText>
            de
            {" " + outputLabel + " "}
          </>
        );
        break;
      case "output":
        executionExplanation = (
          <>
            Posição
            <ExecutionExplanationAccentTextText>
              {" " + position + " "}
            </ExecutionExplanationAccentTextText>
            de
            {" " + outputLabel + " "} é então
            <ExecutionExplanationAccentTextText>
              {" " + outputValue + " "}
            </ExecutionExplanationAccentTextText>
          </>
        );
        break;
      default:
        throw new Error();
    }
  }

  return (
    <ExecutionExplanationText>{executionExplanation}</ExecutionExplanationText>
  );
}

export default StepByStepPermutationExplanation;
