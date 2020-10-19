import React from "react";
import { Grid, Typography } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import SDES from "../../utils/SDES";
import StepContentTitle from "../StepContentTitle/StepContentTitle";

interface P10StepProps {
  keyBits: number[];
  p10Bits: number[];
}

function P10Step(props: P10StepProps) {
  const { keyBits, p10Bits } = props;

  return (
    <>
      <StepContentTitle>
        P10
      </StepContentTitle>
      <Typography variant="body2" component="p" gutterBottom>
        São geradas a partir da chave criptográfica de 10 bits provida no passo
        anterior duas chaves de 8 bits que serão utilizadas em momentos
        específicos durante o processo de criptografia e descriptografia.
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        O primeiro passo para a obtenção dessas chaves é a permutação da chave
        criptográfica de 10 bits recebida.
        <br />A permutação ocorrerá através da aplicação de uma função de
        permutação. A função de permutação P10 é definida por:
      </Typography>
      <Grid container justify="center">
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression: P10(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{3}, k_{5}, k_{2}, k_{7}, k_{4}, k_{10}, k_{1}, k_{9}, k_{8}, k_{6}) */}
        <img src="sdes\p10.svg" alt="P10" />
      </Grid>
      <Typography variant="body2" component="p" gutterBottom>
        Pode parecer complicado mas a permutação nada mais é do que uma
        reorganiação dos bits presentes na chave passada por parâmetro para a
        função. A função acima deve ser interpretada da seguinte forma: P10
        recebe por parâmetro 10 bits K ordenados das posições 1 à 10 e estes
        serão então reordenados na seguinte ordem:
      </Typography>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Função de permutação P10:
        </Typography>
        <BitsField bits={SDES.getP10Positions()} justify="center" />
      </Grid>
      <Typography variant="body2" component="p" gutterBottom>
        Lê-se: Na 1ª posição agora ficará o bit que estava na 3ª posição, na 2ª
        posição ficará o bit que estava na 5ª posição, na 3ª posição ficará o
        bit que estava na 2ª posição, e assim consecutivamente...
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        Sendo assim, aplicando a função P10 sobre a chave temos:
      </Typography>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Chave:
        </Typography>
        <BitsField bits={keyBits} justify="center" />
      </Grid>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Função de permutação P10 à ser aplicada sobre a chave:
        </Typography>
        <BitsField bits={SDES.getP10Positions()} justify="center" />
      </Grid>
      <Grid container justify="center">
        <Typography variant="subtitle2" color="primary" gutterBottom>
          P10 obtida através da aplicação da função de permutação P10:
        </Typography>
        <BitsField bits={p10Bits} justify="center" />
      </Grid>
    </>
  );
}

export default P10Step;
