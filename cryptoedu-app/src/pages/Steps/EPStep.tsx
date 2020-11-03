import React from "react";
import SDES from "../../utils/SDES";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import UnderDevelopmentTag from "../../components/UnderDevelopmentTag/UnderDevelopmentTag";
import MathImg from "../../components/MathImg/MathImg";
import BitsField from "../../components/BitsField/BitsField";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";

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
        & E/P - Função que usa a chave e permutação de expansão (Expansion /
        Permutation)
      </StepContentTitle>
      <ExplanationText>
        A função f<sub>k</sub> é o componente mais complexo da execução do
        algoritmo e consiste de uma combinação de permutações e substituições e
        será chamada duas vezes durante o fluxo de execução, sendo uma vez para
        cada chave (K<sub>1</sub> e K<sub>2</sub>). A função f<sub>k</sub> é
        definida por:
      </ExplanationText>
      {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
          f_{K}(L, R) = (L \oplus F(R, SK), R) */}
      <MathImg src="sdes\fk.svg" alt="fk" />
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
      {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
          EP(k_{1}, k_{2}, k_{3}, k_{4}) = (k_{4}, k_{1}, k_{2}, k_{3}, k_{2}, k_{3}, k_{4}, k_{1}) */}
      <MathImg src="sdes\ep.svg" alt="ep" />
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
      <BitsField label="E/P" bits={SDES.getEPPositions()} />
      <ExplanationText>
        Sendo assim, aplicando a função E/P sobre R temos:
      </ExplanationText>
      <StepByStepPermutation
        permutationLabel="E/P"
        permutation={SDES.getEPPositions()}
        inputLabel="R (right)"
        input={ipBits.slice(4, 8)}
        outputLabel="R permutada"
        output={ep1Bits}
      />
      <ExplanationText>
        Com a saída da função E/P por sua vez será feito um OU exclusivo com a
        chave K<sub>1</sub> já obtida.
      </ExplanationText>
      <BitsField label="R permutada" bits={ep1Bits} paragraphMargin={false} />
      <BitsField
        label={
          <>
            Chave K<sub>1</sub>
          </>
        }
        bits={k1Bits}
        paragraphMargin={false}
      />
      <BitsField
        label={
          <>
            R permutada XOR K<sub>1</sub>
          </>
        }
        bits={SDES.xor(ep1Bits, k1Bits)}
      />

      <UnderDevelopmentTag />
    </>
  );
}

export default EPStep;
