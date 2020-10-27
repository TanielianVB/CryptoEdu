import React, { useReducer } from "react";
import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import BitsField from "../BitsField/BitsField";
import ExecutionExplanationText from "../ExecutionExplanationText/ExecutionExplanationText";
import ExecutionExplanationAccentTextText from "../ExecutionExplanationText/ExecutionExplanationAccentText";

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

  const inputAccentPosition = permutation[executionState.position - 1];
  const outputBits: number[] = new Array(output.length);

  for (let index = 0; index < executionState.position; index++) {
    if (
      index < executionState.position - 1 ||
      executionState.step === "output"
    ) {
      outputBits[index] = output[index];
    }
  }

  let executionExplanation = (
    <>
      Inicie a execução da permutação clicando na seta à
      <ExecutionExplanationAccentTextText>
        {" "}
        direita
      </ExecutionExplanationAccentTextText>
    </>
  );

  if (executionState.position > 0) {
    switch (executionState.step) {
      case "permutation":
        executionExplanation = (
          <>
            Posição
            <ExecutionExplanationAccentTextText>
              {" " + executionState.position + " "}
            </ExecutionExplanationAccentTextText>
            de{" " + permutationLabel + " "}indica que a posição que irá ser
            utilizada de
            {" " + inputLabel + " "} é a
            <ExecutionExplanationAccentTextText>
              {" " + inputAccentPosition + " "}
            </ExecutionExplanationAccentTextText>
          </>
        );
        break;
      case "input":
        executionExplanation = (
          <>
            A posição
            <ExecutionExplanationAccentTextText>
              {" " + inputAccentPosition + " "}
            </ExecutionExplanationAccentTextText>
            de {" " + inputLabel + " "} possui valor
            <ExecutionExplanationAccentTextText>
              {" " + output[executionState.position - 1] + " "}
            </ExecutionExplanationAccentTextText>
            que será o valor da posição
            <ExecutionExplanationAccentTextText>
              {" " + executionState.position + " "}
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
              {" " + executionState.position + " "}
            </ExecutionExplanationAccentTextText>
            de
            {" " + outputLabel + " "} é então
            <ExecutionExplanationAccentTextText>
              {" " + output[executionState.position - 1] + " "}
            </ExecutionExplanationAccentTextText>
          </>
        );
        break;
      default:
        throw new Error();
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
                  ? inputAccentPosition
                  : undefined
              }
              focus={
                executionState.step === "input"
                  ? inputAccentPosition
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
            <ExecutionExplanationText>
              {executionExplanation}
            </ExecutionExplanationText>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default StepByStepPermutation;
