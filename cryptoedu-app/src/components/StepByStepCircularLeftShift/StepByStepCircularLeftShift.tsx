import React from "react";

interface StepByStepCircularLeftShiftProps {
  inputLabel: string;
  input: number[];
  outputLabel: string;
  output: number[];
}

interface ExecutionState {
  position: number;
  step: "start" | "permutation" | "input" | "output" | "finish";
}

function StepByStepCircularLeftShift(props: StepByStepCircularLeftShiftProps) {
  const { inputLabel, input, outputLabel, output } = props;

  return <div></div>;
}

export default StepByStepCircularLeftShift;
