import React from "react";
import { Grid } from "@material-ui/core";
import SDES from "../../utils/SDES";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import MathImg from "../../components/MathImg/MathImg";
import BitsField from "../../components/BitsField/BitsField";

interface P8StepProps {
  ls1Bits: number[];
  k1Bits: number[];
}

function P8Step(props: P8StepProps) {
  const { ls1Bits, k1Bits } = props;

  return (
    <>
      <StepContentTitle>
        P8 & K<sub>1</sub> - Permutação de 8 bits e geração da primeira chave K
        <sub>1</sub>
      </StepContentTitle>
      <ExplanationText>
        O próximo passo é uma nova permutação a ser aplicada dessa vez sobre
        LS-1 obtida no passo anterior.
      </ExplanationText>
      <ExplanationText>
        A permutação ocorrerá através da aplicação de uma função de permutação.
        A função de permutação P8 é definida por:
      </ExplanationText>
      <Grid container justify="center">
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
         P8(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{6}, k_{3}, k_{7}, k_{4}, k_{8}, k_{5}, k_{10}, k_{9}) */}
        <MathImg src="sdes\p8.svg" alt="P8" />
      </Grid>
      <ExplanationText>
        Como já aprendemos a interpretar uma função de permutação, extraímos da
        função acima que os 10 bits da chave devem ser reordenados nas seguintes
        posições:
      </ExplanationText>
      <BitsField label="P8:" bits={SDES.getP8Positions()} />
      <ExplanationText>
        É interessante observar que, diferente da função de permutação P10, essa
        função de permutação P8 irá gerar somente 8 bits no seu resultado.
      </ExplanationText>
      <ExplanationText>
        O resultado dessa função será a nossa primeira chave K<sub>1</sub>.
      </ExplanationText>
      <ExplanationText>
        Sendo assim, aplicando a função P8 sobre LS-1 temos:
      </ExplanationText>
      <BitsField label="LS-1:" bits={ls1Bits} paragraphMargin={false} />
      <BitsField
        label="P8:"
        bits={SDES.getP8Positions()}
        paragraphMargin={false}
      />
      <BitsField label="LS-1 permutada:" bits={k1Bits} />
    </>
  );
}

export default P8Step;