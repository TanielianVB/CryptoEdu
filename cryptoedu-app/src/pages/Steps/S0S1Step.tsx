import React from "react";
import { Grid } from "@material-ui/core";
import SDES from "../../utils/SDES";
import MatrixField from "../../components/MatrixField/MatrixField";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsFieldLabel from "../../components/BitsFieldLabel/BitsFieldLabel";
import UnderDevelopmentTag from "../../components/UnderDevelopmentTag/UnderDevelopmentTag";
import BitsField from "../../components/BitsField/BitsField";

interface S0S1StepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function S0S1Step(props: S0S1StepProps) {
  return (
    <>
      <StepContentTitle>
        S0 & S1 & P4 - Substituições S0 e S1 e permutação de 4 bits
      </StepContentTitle>
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
      <BitsField label="P4:" bits={SDES.getP4Positions()} />
      <UnderDevelopmentTag />
    </>
  );
}

export default S0S1Step;
