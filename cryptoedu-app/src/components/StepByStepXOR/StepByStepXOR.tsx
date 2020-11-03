import React, { useReducer } from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import BitsField from "../BitsField/BitsField";
import StepByStepXORExplanation from "./StepByStepXORExplanation";

interface StepByStepXORProps {
  inputALabel: React.ReactNode;
  inputA: number[];
  inputBLabel: React.ReactNode;
  inputB: number[];
  outputLabel: React.ReactNode;
  output: number[];
}

interface ExecutionState {
  position: number;
  step: "start" | "input" | "output" | "finish";
}

type ExecutionAction = "prev" | "next" | "first" | "last";

function StepByStepXOR(props: StepByStepXORProps) {
  const {
    inputALabel,
    inputA,
    inputBLabel,
    inputB,
    outputLabel,
    output,
  } = props;

  const executionReducer = (
    state: ExecutionState,
    action: ExecutionAction
  ): ExecutionState => {
    switch (action) {
      case "first":
        return { position: 0, step: "start" };
      case "prev":
        switch (state.step) {
          case "start":
            return { position: 0, step: "start" };
          case "input":
            const position = state.position - 1;
            if (position === 0) {
              return { position: 0, step: "start" };
            } else {
              return { position: position, step: "output" };
            }
          case "output":
            return { position: state.position, step: "input" };
          case "finish":
            return { position: inputA.length, step: "output" };
          default:
            throw new Error();
        }
      case "next":
        switch (state.step) {
          case "start":
            return { position: 1, step: "input" };
          case "input":
            return { position: state.position, step: "output" };
          case "output":
            if (state.position === inputA.length) {
              return { position: 0, step: "finish" };
            } else {
              return { position: state.position + 1, step: "input" };
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

  const inputPosition = executionState.position;
  const outputPosition = executionState.position;
  const outputValue = output[outputPosition - 1];
  const outputBits: number[] =
    executionState.step === "finish" ? output : new Array(output.length);

  if (executionState.step === "input" || executionState.step === "output") {
    const positionLimit =
      executionState.step === "input"
        ? executionState.position - 1
        : executionState.position;

    for (let index = 0; index < positionLimit; index++) {
      outputBits[index] = output[index];
    }
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={1}>
        <Tooltip title="Passo anterior na operação">
          <IconButton
            color="secondary"
            onClick={() => executionDispatch("prev")}
          >
            <NavigateBeforeRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Primeiro passo na operação">
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
            label={inputALabel}
            bits={inputA}
            paragraphMargin={false}
            accent={
              executionState.step === "input" ||
              executionState.step === "output"
                ? inputPosition
                : undefined
            }
            focus={executionState.step === "input" ? inputPosition : undefined}
          />
          <BitsField
            label={inputBLabel}
            bits={inputB}
            paragraphMargin={false}
            accent={
              executionState.step === "input" ||
              executionState.step === "output"
                ? inputPosition
                : undefined
            }
            focus={executionState.step === "input" ? inputPosition : undefined}
          />
          <BitsField
            label={outputLabel}
            bits={outputBits}
            paragraphMargin={false}
            accent={
              executionState.step === "output" ? outputPosition : undefined
            }
            focus={
              executionState.step === "output" ? outputPosition : undefined
            }
            accentNumbers={executionState.step === "finish"}
          />
        </div>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Próximo passo na operação">
          <IconButton
            color="secondary"
            onClick={() => executionDispatch("next")}
          >
            <NavigateNextRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Último passo na operação">
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
          <StepByStepXORExplanation
            position={outputPosition}
            step={executionState.step}
            inputPosition={inputPosition}
            outputValue={outputValue}
            fullOutput={output}
            inputALabel={inputALabel}
            inputBLabel={inputBLabel}
            outputLabel={outputLabel}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StepByStepXOR;
