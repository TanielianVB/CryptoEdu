import React from "react";
import { Grid } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import SDES from "../../utils/SDES";
import StepContentTitle from "../StepContentTitle/StepContentTitle";
import ExplanationText from "../ExplanationText/ExplanationText";
import BitsFieldLabel from "../BitsFieldLabel/BitsFieldLabel";
import UnderDevelopmentTag from "../UnderDevelopmentTag/UnderDevelopmentTag";

interface EPStepProps {
  ipBits: number[];
  ep1Bits: number[];
  k1Bits: number[];
}

function EPStep(props: EPStepProps) {
  const { ipBits, ep1Bits, k1Bits } = props;

  return (
    <>
      <StepContentTitle>
        f
        <sub>
          k<sub>1</sub>
        </sub>{" "}
        & E/P (Expansion / Permutation - Permutação de expansão)
      </StepContentTitle>
      <ExplanationText>
        A função f<sub>k</sub> é o componente mais complexo da execução do
        algoritmo e consiste de uma combinação de permutações e substituições e
        será chamada duas vezes durante o fluxo de execução, sendo uma vez para
        cada chave (K<sub>1</sub> e K<sub>2</sub>). A função f<sub>k</sub> é
        definida por:
      </ExplanationText>
      <Grid container justify="center">
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
         f_{K}(L, R) = (L \oplus F(R, SK), R) */}
        <img src="sdes\fk.svg" alt="fk" />
      </Grid>
      <ExplanationText>
        A função f<sub>k</sub> se utiliza da função F que por sua vez é definida
        por uma sequencia de passos. Apesar de parecer complicado vamos executar
        da função mais interna até a mais externa e compreender cada parte assim
        como viemos fazendo até o momento.
      </ExplanationText>
      <ExplanationText>
        Iniciamos então pelo primeiro passo de F, que é a aplicação da função
        E/P (permutação de expansão), que é assim chamada pois recebe 4 bits e
        retorna 8 bits. Esta é definida por:
      </ExplanationText>
      <Grid container justify="center">
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
         EP(k_{1}, k_{2}, k_{3}, k_{4}) = (k_{4}, k_{1}, k_{2}, k_{3}, k_{2}, k_{3}, k_{4}, k_{1}) */}
        <img src="sdes\ep.svg" alt="ep" />
      </Grid>
      <ExplanationText>
        Pode-se observar que, ao contrário da função F8, esta função retorna
        mais bits do que esta recebeu por parâmetro.
      </ExplanationText>
      <ExplanationText>
        A função E/P recebe R (right) que já foi obtida no passo anterior. É a
        metade direita do resultado da permutação inicial. Como já aprendemos a
        interpretar uma função de permutação, extraímos da função acima que os 4
        bits de R devem ser reordenados nas seguintes posições:
      </ExplanationText>
      <Grid container justify="center">
        <BitsFieldLabel>Função de permutação E/P:</BitsFieldLabel>
        <BitsField bits={SDES.getEPPositions()} justify="center" />
      </Grid>
      <ExplanationText>
        Sendo assim, aplicando a função E/P sobre R temos:
      </ExplanationText>
      <Grid container justify="center">
        <BitsFieldLabel>R (right):</BitsFieldLabel>
        <BitsField bits={ipBits.slice(4, 8)} justify="center" />
      </Grid>
      <Grid container justify="center">
        <BitsFieldLabel>
          Função de permutação E/P à ser aplicada sobre R:
        </BitsFieldLabel>
        <BitsField bits={SDES.getEPPositions()} justify="center" />
      </Grid>
      <Grid container justify="center">
        <BitsFieldLabel>
          E/P obtida através da aplicação da função de permutação E/P sobre R:
        </BitsFieldLabel>
        <BitsField bits={ep1Bits} justify="center" />
      </Grid>
      <ExplanationText>
        Com a saída da função E/P por sua vez será feito um OU exclusivo com a
        chave K<sub>1</sub> já obtida.
      </ExplanationText>
      <Grid container justify="center">
        <BitsFieldLabel>
          E/P obtida através da aplicação da função de permutação E/P sobre R:
        </BitsFieldLabel>
        <BitsField bits={ep1Bits} justify="center" />
      </Grid>
      <Grid container justify="center">
        <BitsFieldLabel>
          Chave K<sub>1</sub>:
        </BitsFieldLabel>
        <BitsField bits={k1Bits} justify="center" />
      </Grid>
      <Grid container justify="center">
        <BitsFieldLabel>XOR (OU exclusivo) entre E/P e K1:</BitsFieldLabel>
        <BitsField bits={SDES.xor(ep1Bits, k1Bits)} justify="center" />
      </Grid>

      <UnderDevelopmentTag />
    </>
  );
}

export default EPStep;
