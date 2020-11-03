import React from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import BitsField from "../BitsField/BitsField";
import StepByStepPermutationExplanation from "./StepByStepPermutationExplanation";
import useExecution from "../../hooks/useExecution";

interface StepByStepPermutationProps {
  permutationLabel: string;
  permutation: number[];
  inputLabel: string;
  input: number[];
  outputLabel: string;
  output: number[];
  addChar?: boolean;
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

  const [executionState, executionDispatch] = useExecution(permutation.length);

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
