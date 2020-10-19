import React from "react";
import { Grid, Typography } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import SDES from "../../utils/SDES";

interface P8StepProps {
  ls1Bits: number[];
  k1Bits: number[];
}

function P8Step(props: P8StepProps) {
  const { ls1Bits, k1Bits } = props;

  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom>
        P8 & K<sub>1</sub>
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        O próximo passo é uma nova permutação a ser aplicada dessa vez sobre
        LS-1 obtida no passo anterior.
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        A permutação ocorrerá através da aplicação de uma função de permutação.
        A função de permutação P8 é definida por:
      </Typography>
      <Grid container justify="center">
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression: P8(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{6}, k_{3}, k_{7}, k_{4}, k_{8}, k_{5}, k_{10}, k_{9}) */}
        <img src="sdes\p8.svg" alt="P8" />
      </Grid>
      <Typography variant="body2" component="p" gutterBottom>
        Como já aprendemos a interpretar uma função de permutação, extraímos da
        função acima que os 10 bits da chave devem ser reordenados nas seguintes
        posições:
      </Typography>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Função de permutação P8:
        </Typography>
        <BitsField bits={SDES.getP8Positions()} justify="center" />
      </Grid>
      <Typography variant="body2" component="p" gutterBottom>
        É interessante observar que, diferente da função de permutação P10, essa
        função de permutação P8 irá gerar somente 8 bits no seu resultado.
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        O resultado dessa função será a nossa primeira chave K<sub>1</sub>.
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        Sendo assim, aplicando a função P8 sobre LS-1 temos:
      </Typography>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          LS-1:
        </Typography>
        <BitsField bits={ls1Bits} justify="center" />
      </Grid>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Função de permutação P8 à ser aplicada sobre LS-1:
        </Typography>
        <BitsField bits={SDES.getP8Positions()} justify="center" />
      </Grid>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          K<sub>1</sub> obtida através da aplicação da função de permutação P8
          sobre LS-1:
        </Typography>
        <BitsField bits={k1Bits} justify="center" />
      </Grid>
    </>
  );
}

export default P8Step;
