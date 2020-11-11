import React from "react";
import SDES from "../../utils/SDES";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsField from "../../components/BitsField/BitsField";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import MathImg from "../../components/MathImg/MathImg";

interface IPStepProps {
  mode: "encrypt" | "decrypt";
  messageBits: number[];
  ipBits: number[];
}

function IPStep(props: IPStepProps) {
  const { mode, messageBits, ipBits } = props;

  const operation = mode === "encrypt" ? "criptografar" : "descriptografar";
  const message = mode === "encrypt" ? "mensagem" : "mensagem cifrada";

  return (
    <>
      <StepContentAccordion title="IP - Permutação Inicial">
        <ExplanationText>
          Tendo-se obtidas as chaves que serão utilizadas na criptografia (K
          <sub>1</sub> & K<sub>2</sub>) iremos finalmente começar a {operation}{" "}
          a {message}. A {message} também é referida como P (plaintext).
        </ExplanationText>
        <ExplanationText>
          O primeiro passo para {operation} a {message} é a permutação inicial
          que é definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
            IP(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}) = (k_{2}, k_{6}, k_{3}, k_{1}, k_{4}, k_{8}, k_{5}, k_{7}) */}
        <MathImg src="sdes\ip.svg" alt="IP" />
        <ExplanationText>
          A permutação nada mais é do que uma reorganiação dos bits passados por
          parâmetro para a função. A função acima deve ser interpretada da
          seguinte forma: IP recebe por parâmetro 8 bits K ordenados das
          posições 1 à 8 e estes serão reordenados na seguinte ordem:
        </ExplanationText>
        <BitsField label="IP" bits={SDES.getIPPositions()} />
        <ExplanationText>
          Lê-se: Na 1ª posição ficará o bit que estava na 2ª posição, na 2ª
          posição ficará o bit que estava na 6ª posição, na 3ª posição ficará o
          bit que estava na 3ª posição, e assim consecutivamente...
        </ExplanationText>
        <ExplanationText>
          Sendo assim, aplicando a função IP sobre a {message} temos:
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel="IP"
        permutation={SDES.getIPPositions()}
        inputLabel="P"
        input={messageBits}
        outputShortLabel={
          <>
            R<sub>IP</sub>
          </>
        }
        outputLabel={
          <>
            R<sub>IP</sub> = Resultado de IP
          </>
        }
        output={ipBits}
        addChar
      />
      <StepContentAccordion title="L (esquerda) & R (direita)">
        <ExplanationText>
          O resultado obtido da função de permutação inicial IP (R<sub>IP</sub>)
          é então divido na metade. São elas L (left - esquerda) e R (right -
          direita). Estas serão utilizadas como parâmetros que serão passados
          para a f<sub>K</sub>.
        </ExplanationText>
      </StepContentAccordion>
      <SplitBitsField
        leftLabel="L (esquerda)"
        rightLabel="R (direita)"
        bits={ipBits}
      />
    </>
  );
}

export default IPStep;
