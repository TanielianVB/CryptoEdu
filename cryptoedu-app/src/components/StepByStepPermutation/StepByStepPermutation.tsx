import React, { useReducer } from "react";
import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import BitsField from "../BitsField/BitsField";
import StepByStepPermutationExplanation from "./StepByStepPermutationExplanation";

interface StepByStepPermutationProps {
  permutationLabel: string;
  permutation: number[];
  inputLabel: string;
  input: number[];
  outputLabel: string;
  output: number[];
}

interface ExecutionState {
  position: number;
  step: "permutation" | "input" | "output";
}

function StepByStepPermutation(props: StepByStepPermutationProps) {
  const {
    permutationLabel,
    permutation,
    inputLabel,
    input,
    outputLabel,
    output,
  } = props;

  const executionReducer = (
    state: ExecutionState,
    action: "prevStep" | "nextStep"
  ): ExecutionState => {
    switch (action) {
      case "prevStep":
        if (state.position === 0) {
          return state;
        } else {
          switch (state.step) {
            case "permutation":
              return { position: state.position - 1, step: "output" };
            case "input":
              return { position: state.position, step: "permutation" };
            case "output":
              return { position: state.position, step: "input" };
            default:
              throw new Error();
          }
        }
      case "nextStep":
        if (state.position === 0) {
          return { position: 1, step: "permutation" };
        } else if (
          state.position >= permutation.length &&
          state.step === "output"
        ) {
          return { position: 0, step: "permutation" };
        } else {
          switch (state.step) {
            case "permutation":
              return { position: state.position, step: "input" };
            case "input":
              return { position: state.position, step: "output" };
            case "output":
              return { position: state.position + 1, step: "permutation" };
            default:
              throw new Error();
          }
        }
      default:
        throw new Error();
    }
  };

  const [executionState, executionDispatch] = useReducer(executionReducer, {
    position: 0,
    step: "permutation",
  });

  const inputPosition = permutation[executionState.position - 1];
  const outputValue = output[executionState.position - 1];
  const outputBits: number[] = new Array(output.length);

  for (let index = 0; index < executionState.position; index++) {
    if (
      index < executionState.position - 1 ||
      executionState.step === "output"
    ) {
      outputBits[index] = output[index];
    }
  }

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={1}>
          <Tooltip title="Passo anterior na permutação">
            <IconButton
              color="secondary"
              onClick={(event) => executionDispatch("prevStep")}
            >
              <NavigateBeforeRoundedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <div>
            <BitsField
              label={permutationLabel + ":"}
              bits={permutation}
              paragraphMargin={false}
              accent={executionState.position}
              focus={
                executionState.step === "permutation"
                  ? executionState.position
                  : undefined
              }
            />
            <BitsField
              label={inputLabel + ":"}
              bits={input}
              paragraphMargin={false}
              accent={
                executionState.step === "input" ||
                executionState.step === "output"
                  ? inputPosition
                  : undefined
              }
              focus={
                executionState.step === "input"
                  ? inputPosition
                  : undefined
              }
            />
            <BitsField
              label={outputLabel + ":"}
              bits={outputBits}
              paragraphMargin={false}
              accent={
                executionState.step === "output"
                  ? executionState.position
                  : undefined
              }
              focus={
                executionState.step === "output"
                  ? executionState.position
                  : undefined
              }
            />
          </div>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Próximo passo na permutação">
            <IconButton
              color="secondary"
              onClick={(event) => executionDispatch("nextStep")}
            >
              <NavigateNextRoundedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12} container justify="center" alignItems="center">
          <Grid item>
            <StepByStepPermutationExplanation
              position={executionState.position}
              step={executionState.step}
              inputPosition={inputPosition}
              outputValue={outputValue}
              permutationLabel={permutationLabel}
              inputLabel={inputLabel}
              outputLabel={outputLabel}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default StepByStepPermutation;
