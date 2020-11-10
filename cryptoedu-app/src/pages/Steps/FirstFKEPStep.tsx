import React from "react";
import SDES from "../../utils/SDES";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import MathImg from "../../components/MathImg/MathImg";
import BitsField from "../../components/BitsField/BitsField";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import StepByStepXOR from "../../components/StepByStepXOR/StepByStepXOR";

interface FirstFKEPStepProps {
  mode: "encrypt" | "decrypt";
  ipRBits: number[];
  epBits: number[];
  keyNumber: number;
  keyBits: number[];
  epXorKeyBits: number[];
}

function FirstFKEPStep(props: FirstFKEPStepProps) {
  const { mode, ipRBits, epBits, keyNumber, keyBits, epXorKeyBits } = props;

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
          primeira execução da função f<sub>K</sub> deverá se utilizar da chave
          K<sub>{keyNumber}</sub>. A função f<sub>K</sub> é definida por:
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
          retorna 8 bits. A função de permutação E/P é definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
            EP(k_{1}, k_{2}, k_{3}, k_{4}) = (k_{4}, k_{1}, k_{2}, k_{3}, k_{2}, k_{3}, k_{4}, k_{1}) */}
        <MathImg src="sdes\ep.svg" alt="ep" />
        <ExplanationText>
          A permutação nada mais é do que uma reorganiação dos bits passados por
          parâmetro para a função. A função acima deve ser interpretada da
          seguinte forma: E/P recebe por parâmetro 4 bits K ordenados das
          posições 1 à 4 e estes serão reordenados na seguinte ordem:
        </ExplanationText>
        <BitsField label="E/P" bits={SDES.getEPPositions()} />
        <ExplanationText>
          Lê-se: Na 1ª posição ficará o bit que estava na 4ª posição, na 2ª
          posição ficará o bit que estava na 1ª posição, na 3ª posição ficará o
          bit que estava na 2ª posição, e assim consecutivamente...
        </ExplanationText>
        <ExplanationText>
          É interessante observar que, ao contrário da função F8, a função E/P
          retorna mais bits do que recebeu por parâmetro. A função E/P recebe R
          (right) que já foi obtida no passo anterior. É a metade direita do
          resultado da permutação inicial (R<sub>IP</sub>). Sendo assim,
          aplicando a função E/P sobre R temos:
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel="E/P"
        permutation={SDES.getEPPositions()}
        inputLabel={
          <>
            R (direita de R<sub>IP</sub>)
          </>
        }
        input={ipRBits}
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
      <StepContentAccordion title="XOR - OU exclusivo - &oplus;">
        <ExplanationText>
          Com a saída da função E/P por sua vez será feito um OU exclusivo com a
          chave K<sub>{keyNumber}</sub> já obtida. Como estamos{" "}
          {mode === "encrypt" ? "criptografando" : "descriptografando"}, a
          primeira execução da função f<sub>K</sub> deverá se utilizar da chave
          K<sub>{keyNumber}</sub>.
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepXOR
        inputALabel={
          <>
            R<sub>E/P</sub>
          </>
        }
        inputA={epBits}
        inputBLabel={
          <>
            Chave K<sub>{keyNumber}</sub>
          </>
        }
        inputB={keyBits}
        outputLabel={
          <>
            R<sub>&oplus;</sub> = R<sub>E/P</sub> &oplus; K
            <sub>{keyNumber}</sub>
          </>
        }
        output={epXorKeyBits}
      />
    </>
  );
}

export default FirstFKEPStep;
