import React from "react";
import { Grid } from "@material-ui/core";
import SDES from "../../utils/SDES";
import MatrixField from "../MatrixField/MatrixField";
import BitsField from "../BitsField/BitsField";
import StepContentTitle from "../StepContentTitle/StepContentTitle";
import ExplanationText from "../ExplanationText/ExplanationText";
import BitsFieldLabel from "../BitsFieldLabel/BitsFieldLabel";
import UnderDevelopmentTag from "../UnderDevelopmentTag/UnderDevelopmentTag";

interface S0S1StepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function S0S1Step(props: S0S1StepProps) {
  return (
    <>
      <StepContentTitle>S0 & S1 & P4</StepContentTitle>
      <ExplanationText>
        A função de substituição S0 é na realidade uma matrix com pares de
        bits...
      </ExplanationText>
      <Grid container justify="center" spacing={5}>
        <Grid item justify="center">
          <BitsFieldLabel>Função de substituição S0:</BitsFieldLabel>
          <MatrixField
            bits={SDES.getSubstitution0Positions()}
            justify="center"
          />
        </Grid>
        <Grid item justify="center">
          <BitsFieldLabel>Função de substituição S1:</BitsFieldLabel>
          <MatrixField
            bits={SDES.getSubstitution1Positions()}
            justify="center"
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <BitsFieldLabel>Função de permutação P4:</BitsFieldLabel>
        <BitsField bits={SDES.getP4Positions()} justify="center" />
      </Grid>
      <UnderDevelopmentTag />
    </>
  );
}

export default S0S1Step;
