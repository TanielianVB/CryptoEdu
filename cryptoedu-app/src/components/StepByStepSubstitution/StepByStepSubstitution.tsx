import React, { useReducer } from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import BitsField from "../BitsField/BitsField";
import BitMatrixField from "../BitMatrixField/BitMatrixField";
import StepByStepSubstitutionExplanation from "./StepByStepSubstitutionExplanation";

interface StepByStepSubstitutionProps {
  substitutionLabel: React.ReactNode;
  substitution: number[][][];
  inputLabel: React.ReactNode;
  input: number[];
  outputLabel: React.ReactNode;
  output: number[];
}

interface ExecutionState {
  step:
    | "start"
    | "inputRow"
    | "inputCol"
    | "substitution"
    | "output"
    | "finish";
}

type ExecutionAction = "prev" | "next" | "first" | "last";

function StepByStepSubstitution(props: StepByStepSubstitutionProps) {
  const {
    substitutionLabel,
    substitution,
    inputLabel,
    input,
    outputLabel,
    output,
  } = props;

  const executionReducer = (
    state: ExecutionState,
    action: ExecutionAction
  ): ExecutionState => {
    switch (action) {
      case "first":
        return { step: "start" };
      case "prev":
        switch (state.step) {
          case "start":
            return { step: "start" };
          case "inputRow":
            return { step: "start" };
          case "inputCol":
            return { step: "inputRow" };
          case "substitution":
            return { step: "inputCol" };
          case "output":
            return { step: "substitution" };
          case "finish":
            return { step: "output" };
          default:
            throw new Error();
        }
      case "next":
        switch (state.step) {
          case "start":
            return { step: "inputRow" };
          case "inputRow":
            return { step: "inputCol" };
          case "inputCol":
            return { step: "substitution" };
          case "substitution":
            return { step: "output" };
          case "output":
            return { step: "finish" };
          case "finish":
            return { step: "start" };
          default:
            throw new Error();
        }
      case "last":
        return { step: "finish" };
      default:
        throw new Error();
    }
  };

  const [executionState, executionDispatch] = useReducer(executionReducer, {
    step: "start",
  });

  const inputPosition = executionState.step === "inputRow" ? [1, 4] : [2, 3];
  const inputValue =
    executionState.step === "inputRow"
      ? input[0].toString() + input[3].toString()
      : input[1].toString() + input[2].toString();
  const row = parseInt(input[0].toString() + input[3].toString(), 2);
  const col = parseInt(input[1].toString() + input[2].toString(), 2);
  const substitutionLine = executionState.step === "inputRow" ? row : col;
  // const outputValue = output[executionState.position - 1];
  const outputBits: number[] =
    executionState.step === "output" || executionState.step === "finish"
      ? output
      : new Array(2);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={1}>
        <Tooltip title="Passo anterior na permutação">
          <IconButton
            color="secondary"
            onClick={() => executionDispatch("prev")}
          >
            <NavigateBeforeRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Primeiro passo na permutação">
          <IconButton
            color="secondary"
            onClick={() => executionDispatch("first")}
          >
            <FirstPageRoundedIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={10}>
        <div>
          <BitsField
            label={inputLabel}
            bits={input}
            paragraphMargin={false}
            accent={
              executionState.step === "inputRow" ||
              executionState.step === "inputCol"
                ? inputPosition
                : undefined
            }
            focus={
              executionState.step === "inputRow" ||
              executionState.step === "inputCol"
                ? inputPosition
                : undefined
            }
            labelAbove
          />
          <BitMatrixField
            label={substitutionLabel}
            bits={substitution}
            accentFullRow={
              executionState.step === "inputRow" ? substitutionLine : undefined
            }
            accentFullCol={
              executionState.step === "inputCol" ? substitutionLine : undefined
            }
            accentRow={
              executionState.step === "substitution" ||
              executionState.step === "output"
                ? row
                : undefined
            }
            accentCol={
              executionState.step === "substitution" ||
              executionState.step === "output"
                ? col
                : undefined
            }
            focusRow={executionState.step === "substitution" ? row : undefined}
            focusCol={executionState.step === "substitution" ? col : undefined}
          />
          <BitsField
            label={outputLabel}
            bits={outputBits}
            paragraphMargin={false}
            accent={executionState.step === "output" ? [1, 2] : undefined}
            focus={executionState.step === "output" ? [1, 2] : undefined}
            accentNumbers={executionState.step === "finish"}
            labelAbove
          />
        </div>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Próximo passo na permutação">
          <IconButton
            color="secondary"
            onClick={() => executionDispatch("next")}
          >
            <NavigateNextRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Último passo na permutação">
          <IconButton
            color="secondary"
            onClick={() => executionDispatch("last")}
          >
            <LastPageRoundedIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12} container justify="center" alignItems="center">
        <Grid item>
          <StepByStepSubstitutionExplanation
            step={executionState.step}
            inputValue={inputValue}
            row={row}
            col={col}
            fullOutput={output}
            inputLabel={inputLabel}
            substitutionLabel={substitutionLabel}
            outputLabel={outputLabel}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StepByStepSubstitution;
