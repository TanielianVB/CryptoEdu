import React from "react";
import SDES from "../../utils/SDES";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import MathImg from "../../components/MathImg/MathImg";
import BitsField from "../../components/BitsField/BitsField";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import StepByStepXOR from "../../components/StepByStepXOR/StepByStepXOR";

interface SecondFKEPStepProps {
  mode: "encrypt" | "decrypt";
  swRBits: number[];
  epBits: number[];
  keyNumber: number;
  keyBits: number[];
  epXorKeyBits: number[];
}

function SecondFKEPStep(props: SecondFKEPStepProps) {
  const { mode, swRBits, epBits, keyNumber, keyBits, epXorKeyBits } = props;

  return (
    <>
      <StepContentAccordion
        title={
          <>
            f
            <sub>
              K<sub>{keyNumber}</sub>
            </sub>{" "}
            - Função que usa a chave K<sub>{keyNumber}</sub>
          </>
        }
      >
        <ExplanationText>
          A função f<sub>K</sub> é o componente mais complexo da execução do
          algoritmo e consiste de uma combinação de permutações e substituições
          e será chamada duas vezes durante o fluxo de execução, sendo uma vez
          para cada chave (K<sub>1</sub> e K<sub>2</sub>). Como estamos{" "}
          {mode === "encrypt" ? "criptografando" : "descriptografando"}, a
          segunda execução da função f<sub>K</sub> deverá se utilizar da chave K
          <sub>{keyNumber}</sub>. A função f<sub>K</sub> é definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
            f_{K}(L, R) = (L \oplus F(R, SK), R) */}
        <MathImg src="sdes\fk.svg" alt="fk" />
        <ExplanationText>
          A função f<sub>K</sub> se utiliza da função F que por sua vez é
          definida por uma sequencia de passos. Apesar de parecer complicado
          vamos executar da função mais interna até a mais externa e compreender
          cada parte assim como viemos fazendo até o momento.
        </ExplanationText>
      </StepContentAccordion>
      <StepContentAccordion title="E/P - Permutação de Expansão">
        <ExplanationText>
          Iniciamos então pelo primeiro passo de F, que é a aplicação da função
          E/P (permutação de expansão), que é assim chamada pois recebe 4 bits e
          retorna 8 bits. Esta é definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
            EP(k_{2}, k_{2}, k_{3}, k_{4}) = (k_{4}, k_{2}, k_{2}, k_{3}, k_{2}, k_{3}, k_{4}, k_{2}) */}
        <MathImg src="sdes\ep.svg" alt="ep" />
        <ExplanationText>
          Pode-se observar que, ao contrário da função F8, esta função retorna
          mais bits do que esta recebeu por parâmetro.
        </ExplanationText>
        <ExplanationText>
          A função E/P recebe R (right) que já foi obtida no passo anterior. É a
          metade direita do resultado da permutação inicial. Como já aprendemos
          a interpretar uma função de permutação, extraímos da função acima que
          os 4 bits de R devem ser reordenados nas seguintes posições:
        </ExplanationText>
        <BitsField label="E/P" bits={SDES.getEPPositions()} />
        <ExplanationText>
          Sendo assim, aplicando a função E/P sobre R temos:
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel="E/P"
        permutation={SDES.getEPPositions()}
        inputLabel={
          <>
            R (direita) de R<sub>SW</sub>
          </>
        }
        input={swRBits}
        outputShortLabel={
          <>
            R<sub>E/P</sub>
          </>
        }
        outputLabel={
          <>
            R<sub>E/P</sub> = Resultado de E/P
          </>
        }
        output={epBits}
      />
      <StepContentAccordion title="XOR - OU exclusivo">
        <ExplanationText>
          Com a saída da função E/P por sua vez será feito um OU exclusivo com a
          chave K<sub>{keyNumber}</sub> já obtida. Como estamos{" "}
          {mode === "encrypt" ? "criptografando" : "descriptografando"}, a
          segunda execução da função f<sub>K</sub> deverá se utilizar da chave K
          <sub>{keyNumber}</sub>.
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepXOR
        inputALabel="R permutada"
        inputA={epBits}
        inputBLabel={
          <>
            Chave K<sub>{keyNumber}</sub>
          </>
        }
        inputB={keyBits}
        outputLabel={
          <>
            R permutada &oplus; K<sub>{keyNumber}</sub>
          </>
        }
        output={epXorKeyBits}
      />
    </>
  );
}

export default SecondFKEPStep;
