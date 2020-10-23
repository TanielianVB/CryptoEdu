import React from "react";
import { Grid } from "@material-ui/core";
import BitArrayField from "../../components/BitArrayField/BitArrayField";
import SDES from "../../utils/SDES";
import StepContentTitle from "../../components/StepContentTitle/StepContentTitle";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsFieldLabel from "../../components/BitsFieldLabel/BitsFieldLabel";
import BitsField from "../../components/BitsField/BitsField";

interface IPStepProps {
  messageBits: number[];
  ipBits: number[];
}

function IPStep(props: IPStepProps) {
  const { messageBits, ipBits } = props;

  return (
    <>
      <StepContentTitle>IP - Initial Permutation</StepContentTitle>
      <ExplanationText>
        Uma vez tendo-se obtidas as chaves que serão utilizadas na criptografia
        (K<sub>1</sub> & K<sub>2</sub>) iremos finalmente começar a criptografar
        a mensagem. A mensagem também é referida como P (plaintext).
      </ExplanationText>
      <ExplanationText>
        A primeira alteração a ser aplicada à mensagem (P) é a permutação
        inicial que é definida por:
      </ExplanationText>
      <BitsField label="IP:" bits={SDES.getIPPositions()} />
      <ExplanationText>
        Sendo assim, aplicando a função IP sobre a mensagem temos:
      </ExplanationText>
      <BitsField
        label="P:"
        bits={messageBits}
        addChar
        paragraphMargin={false}
      />
      <BitsField
        label="IP:"
        bits={SDES.getIPPositions()}
        paragraphMargin={false}
      />
      <BitsField label="P permutada:" bits={ipBits} addChar />
      <ExplanationText>
        A saída da função de permutação inicial IP é então divida na metade. São
        elas L (left) e R (right). Estas serão utilizadas como parâmetros que
        serão passados para a f <sub>k</sub>.
      </ExplanationText>
      <Grid container justify="center" spacing={5}>
        <Grid item justify="center">
          <BitsFieldLabel>L (left):</BitsFieldLabel>
          <BitArrayField bits={ipBits.slice(0, 4)} justify="center" />
        </Grid>
        <Grid item justify="center">
          <BitsFieldLabel>R (right):</BitsFieldLabel>
          <BitArrayField bits={ipBits.slice(4, 8)} justify="center" />
        </Grid>
      </Grid>
    </>
  );
}

export default IPStep;
