import React from "react";
import { Grid } from "@material-ui/core";
import SDES from "../../utils/SDES";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsField from "../../components/BitsField/BitsField";
import StepByStepPermutation from "../../components/StepByStepPermutation/StepByStepPermutation";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepByStepCircularLeftShift from "../../components/StepByStepCircularLeftShift/StepByStepCircularLeftShift";
import Utils from "../../utils/Utils";

interface K2StepProps {
  ls1Bits: number[];
  ls2Bits: number[];
  k2Bits: number[];
}

function K2Step(props: K2StepProps) {
  const { ls1Bits, ls2Bits, k2Bits } = props;

  return (
    <>
      <StepContentAccordion title="LS-2 - Circular Left Shift de 2 posições">
        <ExplanationText>
          Munidos do conhecimento obtido até o momento podemos enfim obter a
          segunda chave (K<sub>2</sub>) que será utilizada, juntamente com K
          <sub>1</sub>, durante o processo de criptografia e descriptografia.
        </ExplanationText>
        <ExplanationText>
          A segunda chave (K<sub>2</sub>) será obtida através da repetição de
          alguns passos agora já conhecidos por nós. Primeiramente, divide-se
          LS-1 em duas metades:
        </ExplanationText>
        <BitsField label="LS-1" bits={ls1Bits} labelAbove />
        <SplitBitsField
          leftLabel="Esquerda de LS-1"
          rightLabel="Direita de LS-1"
          bits={ls1Bits}
        />
        <ExplanationText>
          Aplica-se então a rotação de 2 posições para esquerda, circular left
          shift (LS-2), nas metades de LS-1:
        </ExplanationText>
      </StepContentAccordion>
      <Grid container direction="row" justify="center" spacing={3}>
        <Grid item md={6}>
          <StepByStepCircularLeftShift
            shift={2}
            inputLabel={
              <>
                Esquerda (L) de R<sub>LS-1</sub>
              </>
            }
            input={Utils.leftHalf(ls1Bits)}
            outputLabel={
              <>
                R
                <sub>
                  LS-2<sub>L</sub>
                </sub>{" "}
                = Resultado de LS-2 sobre a esquerda
              </>
            }
            outputShortLabel={
              <>
                R
                <sub>
                  LS-2<sub>L</sub>
                </sub>
              </>
            }
            output={Utils.leftHalf(ls2Bits)}
          />
        </Grid>
        <Grid item md={6}>
          <StepByStepCircularLeftShift
            shift={2}
            inputLabel={
              <>
                Direita (R) de R<sub>LS-1</sub>
              </>
            }
            input={Utils.rightHalf(ls1Bits)}
            outputLabel={
              <>
                R
                <sub>
                  LS-2<sub>R</sub>
                </sub>{" "}
                = Resultado de LS-2 sobre a direita
              </>
            }
            outputShortLabel={
              <>
                R
                <sub>
                  LS-2<sub>R</sub>
                </sub>
              </>
            }
            output={Utils.rightHalf(ls2Bits)}
          />
        </Grid>
      </Grid>
      <BitsField
        label={
          <>
            R<sub>LS-2</sub> = Resultado de LS-2 = R
            <sub>
              LS-2<sub>L</sub>
            </sub>{" "}
            + R
            <sub>
              LS-2<sub>R</sub>
            </sub>
          </>
        }
        //"Juntando as metades após a rotação temos a Chave rotacionada LS-2"
        bits={ls2Bits}
        labelAbove
      />
      <StepContentAccordion title="P8 - Permutação de 8 bits">
        <ExplanationText>
          Finalmente, se aplica P8 sobre a junção das metades alteradas pela
          rotação LS-2.
        </ExplanationText>
      </StepContentAccordion>
      <StepByStepPermutation
        permutationLabel="P8"
        permutation={SDES.getP8Positions()}
        inputLabel={
          <>
            R<sub>LS-2</sub>
          </>
        }
        input={ls2Bits}
        outputShortLabel={
          <>
            R
            <sub>
              P8<sub>LS-2</sub>
            </sub>
          </>
        }
        outputLabel={
          <>
            R
            <sub>
              P8<sub>LS-2</sub>
            </sub>{" "}
            = Resultado de P8
          </>
        }
        output={k2Bits}
      />
      <StepContentAccordion
        title={
          <>
            K<sub>2</sub> - Segunda chave
          </>
        }
      >
        <ExplanationText>
          O resultado da aplicação da função de permutação P8 será a nossa
          segunda chave K<sub>2</sub>.
        </ExplanationText>
      </StepContentAccordion>
      <BitsField
        label={
          <>
            K<sub>2</sub> = R
            <sub>
              P8<sub>LS-2</sub>
            </sub>
          </>
        }
        bits={k2Bits}
        labelAbove
      />
    </>
  );
}

export default K2Step;
