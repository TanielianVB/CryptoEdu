import React from "react";
import ExecutionExplanationText from "../ExecutionExplanationText/ExecutionExplanationText";
import Accent from "../ExecutionExplanationText/ExecutionExplanationAccentText";
import Relevant from "../ExecutionExplanationText/ExecutionExplanationRelevantText";

interface StepByStepSubstitutionExplanationProps {
  step:
    | "start"
    | "inputRow"
    | "inputCol"
    | "substitution"
    | "output"
    | "finish";
  inputValue: string;
  row: number;
  col: number;
  fullOutput: number[];
  inputLabel: React.ReactNode;
  substitutionLabel: React.ReactNode;
  outputLabel: React.ReactNode;
}

function StepByStepSubstitutionExplanation(
  props: StepByStepSubstitutionExplanationProps
) {
  const {
    step,
    inputValue,
    row,
    col,
    fullOutput,
    inputLabel,
    substitutionLabel,
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
    case "inputRow":
      executionExplanation = (
        <>
          As posições <Accent>{1}</Accent> e <Accent>{4}</Accent> de{" "}
          <Relevant>{inputLabel}</Relevant> possuem juntas o valor{" "}
          <Accent>{inputValue}</Accent>, o que indica que a linha de{" "}
          <Relevant>{substitutionLabel}</Relevant> que deve ser utilizada é a{" "}
          <Accent>{row}</Accent>
        </>
      );
      break;
    case "inputCol":
      executionExplanation = (
        <>
          As posições <Accent>{2}</Accent> e <Accent>{3}</Accent> de{" "}
          <Relevant>{inputLabel}</Relevant> possuem juntas o valor{" "}
          <Accent>{inputValue}</Accent>, o que indica que a coluna de{" "}
          <Relevant>{substitutionLabel}</Relevant> que deve ser utilizada é a{" "}
          <Accent>{col}</Accent>
        </>
      );
      break;
    case "substitution":
      executionExplanation = (
        <>
          A posição que será utilizada de{" "}
          <Relevant>{substitutionLabel}</Relevant> é então{" "}
          <Accent>{row.toString() + col.toString()}</Accent>
        </>
      );
      break;
    case "output":
      executionExplanation = (
        <>
          O valor da posição <Accent>{row.toString() + col.toString()}</Accent>{" "}
          em <Relevant>{substitutionLabel}</Relevant> será o valor de{" "}
          <Relevant>{outputLabel}</Relevant>
        </>
      );
      break;
    case "finish":
      executionExplanation = (
        <>
          <Relevant>{outputLabel}</Relevant> é então{" "}
          <Accent>{" " + fullOutput.join("")}</Accent>
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

export default StepByStepSubstitutionExplanation;
