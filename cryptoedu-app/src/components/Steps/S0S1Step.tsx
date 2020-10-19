import React from "react";
import { Grid, Typography } from "@material-ui/core";
import SDES from "../../utils/SDES";
import MatrixField from "../MatrixField/MatrixField";
import BitsField from "../BitsField/BitsField";
import StepContentTitle from "../StepContentTitle/StepContentTitle";
import ExplanationText from "../ExplanationText/ExplanationText";

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
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Função de substituição S0:
          </Typography>
          <MatrixField
            bits={SDES.getSubstitution0Positions()}
            justify="center"
          />
        </Grid>
        <Grid item justify="center">
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Função de substituição S1:
          </Typography>
          <MatrixField
            bits={SDES.getSubstitution1Positions()}
            justify="center"
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Função de permutação P4:
        </Typography>
        <BitsField bits={SDES.getP4Positions()} justify="center" />
      </Grid>
      <Typography variant="h6" color="secondary">
        Em desenvolvimento...
      </Typography>
    </>
  );
}

export default S0S1Step;
