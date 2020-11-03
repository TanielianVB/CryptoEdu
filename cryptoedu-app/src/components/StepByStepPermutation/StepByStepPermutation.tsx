import React, { useReducer } from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import BitsField from "../BitsField/BitsField";
import StepByStepPermutationExplanation from "./StepByStepPermutationExplanation";

interface StepByStepPermutationProps {
  permutationLabel: string;
  permutation: number[];
  inputLabel: string;
  input: number[];
  outputLabel: string;
  output: number[];
  addChar?: boolean;
}

interface ExecutionState {
  position: number;
  step: "start" | "permutation" | "input" | "output" | "finish";
}

function StepByStepPermutation(props: StepByStepPermutationProps) {
  const {
    permutationLabel,
    permutation,
    inputLabel,
    input,
    outputLabel,
    output,
    addChar,
  } = props;

  const executionReducer = (
    state: ExecutionState,
    action: "prev" | "next" | "first" | "last"
  ): ExecutionState => {
    switch (action) {
      case "first":
        return { position: 0, step: "start" };
      case "prev":
        switch (state.step) {
          case "start":
            return { position: 0, step: "start" };
          case "permutation":
            const position = state.position - 1;
            if (position === 0) {
              return { position: 0, step: "start" };
            } else {
              return { position: position, step: "output" };
            }
          case "input":
            return { position: state.position, step: "permutation" };
          case "output":
            return { position: state.position, step: "input" };
          case "finish":
            return { position: permutation.length, step: "output" };
          default:
            throw new Error();
        }
      case "next":
        switch (state.step) {
          case "start":
            return { position: 1, step: "permutation" };
          case "permutation":
            return { position: state.position, step: "input" };
          case "input":
            return { position: state.position, step: "output" };
          case "output":
            if (state.position === permutation.length) {
              return { position: 0, step: "finish" };
            } else {
              return { position: state.position + 1, step: "permutation" };
            }
          case "finish":
            return { position: 0, step: "start" };
          default:
            throw new Error();
        }
      case "last":
        return { position: 0, step: "finish" };
      default:
        throw new Error();
    }
  };

  const [executionState, executionDispatch] = useReducer(executionReducer, {
    position: 0,
    step: "start",
  });

  const inputPosition = permutation[executionState.position - 1];
  const outputValue = output[executionState.position - 1];
  const outputBits: number[] =
    executionState.step === "finish" ? output : new Array(output.length);

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
              onClick={(event) => executionDispatch("prev")}
            >
              <NavigateBeforeRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Primeiro passo na permutação">
            <IconButton
              color="secondary"
              onClick={(event) => executionDispatch("first")}
            >
              <FirstPageRoundedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <div>
            <BitsField
              label={permutationLabel}
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
              label={inputLabel}
              bits={input}
              paragraphMargin={false}
              accent={
                executionState.step === "input" ||
                executionState.step === "output"
                  ? inputPosition
                  : undefined
              }
              focus={
                executionState.step === "input" ? inputPosition : undefined
              }
              addChar={addChar}
            />
            <BitsField
              label={outputLabel}
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
              accentNumbers={executionState.step === "finish"}
              addChar={addChar}
            />
          </div>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Próximo passo na permutação">
            <IconButton
              color="secondary"
              onClick={(event) => executionDispatch("next")}
            >
              <NavigateNextRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Último passo na permutação">
            <IconButton
              color="secondary"
              onClick={(event) => executionDispatch("last")}
            >
              <LastPageRoundedIcon />
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
              fullOutput={output}
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
