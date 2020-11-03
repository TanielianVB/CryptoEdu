import React from "react";
import SDES from "../../utils/SDES";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsField from "../../components/BitsField/BitsField";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";

interface IPStepProps {
  messageBits: number[];
  ipBits: number[];
}

function IPStep(props: IPStepProps) {
  const { messageBits, ipBits } = props;

  return (
    <>
      <StepContentAccordion title="IP - Initial Permutation">
        <ExplanationText>
          Uma vez tendo-se obtidas as chaves que serão utilizadas na
          criptografia (K<sub>1</sub> & K<sub>2</sub>) iremos finalmente começar
          a criptografar a mensagem. A mensagem também é referida como P
          (plaintext).
        </ExplanationText>
        <ExplanationText>
          A primeira alteração a ser aplicada à mensagem (P) é a permutação
          inicial que é definida por:
        </ExplanationText>
        <BitsField label="IP" bits={SDES.getIPPositions()} />
        <ExplanationText>
          Sendo assim, aplicando a função IP sobre a mensagem temos:
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel="IP"
        permutation={SDES.getIPPositions()}
        inputLabel="P"
        input={messageBits}
        outputLabel="P permutada"
        output={ipBits}
        addChar
      />
      <StepContentAccordion title="L (left) & R (right)">
        <ExplanationText>
          A saída da função de permutação inicial IP é então divida na metade.
          São elas L (left) e R (right). Estas serão utilizadas como parâmetros
          que serão passados para a f <sub>k</sub>.
        </ExplanationText>
      </StepContentAccordion>
      <SplitBitsField
        leftLabel="L (left)"
        rightLabel="R (right)"
        bits={ipBits}
      />
    </>
  );
}

export default IPStep;
