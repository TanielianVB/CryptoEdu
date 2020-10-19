import React from "react";
import { Grid } from "@material-ui/core";
import BitsField from "../BitsField/BitsField";
import SDES from "../../utils/SDES";
import StepContentTitle from "../StepContentTitle/StepContentTitle";
import ExplanationText from "../ExplanationText/ExplanationText";
import BitsFieldLabel from "../BitsFieldLabel/BitsFieldLabel";
import UnderDevelopmentTag from "../UnderDevelopmentTag/UnderDevelopmentTag";

interface EPStepProps {
  //   ls1Bits: number[];
  //   k1Bits: number[];
}

function EPStep(props: EPStepProps) {
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
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression: P10(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{3}, k_{5}, k_{2}, k_{7}, k_{4}, k_{10}, k_{1}, k_{9}, k_{8}, k_{6}) */}
        <img src="sdes\fk.svg" alt="fk" />
      </Grid>
      <ExplanationText>
        A função f<sub>k</sub> se utiliza da função F que por sua vez é definida
        por:
      </ExplanationText>
      <ExplanationText>
        Apesar de parecer complicado vamos executar da função mais interna até a
        mais externa e compreender cada parte assim como viemos fazendo até o
        momento.
      </ExplanationText>
      <ExplanationText>
        Iniciamos então pela aplicação da função E/P (permutação de expansão),
        assim chamada pois recebe 4 bits e retorna 8 bits. Esta é definida por:
      </ExplanationText>
      <ExplanationText>
        Como podemos ver na função F, a função E/P recebe R (right) que já foi
        obtida no passo anterior. É a metade direita do resultado da permutação
        inicial. Como já aprendemos a interpretar uma função de permutação,
        extraímos da função acima que os 4 bits de devem ser reordenados nas
        seguintes posições:
      </ExplanationText>
      <Grid container justify="center">
        <BitsFieldLabel>Função de permutação E/P:</BitsFieldLabel>
        <BitsField bits={SDES.getEPPositions()} justify="center" />
      </Grid>

      <UnderDevelopmentTag />
    </>
  );
}

export default EPStep;
