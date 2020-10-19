import React from "react";
import { Grid, Typography } from "@material-ui/core";

interface EPStepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function EPStep(props: EPStepProps) {
  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom>
        f
        <sub>
          k<sub>1</sub>
        </sub>{" "}
        & E/P (Expansion / Permutation - Permutação de expansão)
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        A função f<sub>k</sub> é o componente mais complexo da execução do
        algoritmo e consiste de uma combinação de permutações e substituições e
        será chamada duas vezes durante o fluxo de execução, sendo uma vez para
        cada chave (K<sub>1</sub> e K<sub>2</sub>). A função f<sub>k</sub> é
        definida por:
      </Typography>
      <Grid container justify="center">
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression: P10(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{3}, k_{5}, k_{2}, k_{7}, k_{4}, k_{10}, k_{1}, k_{9}, k_{8}, k_{6}) */}
        <img src="sdes\fk.svg" alt="fk" />
      </Grid>
      <Typography variant="body2" component="p" gutterBottom>
        A função f<sub>k</sub> se utiliza da função F que por sua vez é definida
        por:
      </Typography>
      <Typography variant="h6" color="secondary">
        Em desenvolvimento...
      </Typography>
    </>
  );
}

export default EPStep;
