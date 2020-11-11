import React from "react";
import { Grid } from "@material-ui/core";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import BitsField from "../../components/BitsField/BitsField";
import SplitBitsField from "../../components/SplitBitsField/SplitBitsField";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import StepByStepCircularLeftShift from "../../components/StepByStepCircularLeftShift/StepByStepCircularLeftShift";
import Utils from "../../utils/Utils";

interface LS1StepProps {
  p10Bits: number[];
  ls1Bits: number[];
}

function LS1Step(props: LS1StepProps) {
  const { p10Bits, ls1Bits } = props;

  return (
    <>
      <StepContentAccordion title="LS-1 - Circular Left Shift de 1 posição">
        <ExplanationText>
          O próximo passo é a rotação circular para a esquerda de R
          <sub>P10</sub>, que ocorre separadamente em cada uma das metades de R
          <sub>P10</sub> que foi obtido no passo anterior. Então o primeiro
          passo dessa etapa é dividir R<sub>P10</sub> em 2 metades:
        </ExplanationText>
        <BitsField
          label={
            <>
              R<sub>P10</sub>
            </>
          }
          bits={p10Bits}
          labelAbove
        />
        <SplitBitsField
          leftLabel={
            <>
              Esquerda (L) de R<sub>P10</sub>
            </>
          }
          rightLabel={
            <>
              Direita (R) de R<sub>P10</sub>
            </>
          }
          bits={p10Bits}
        />
        <ExplanationText>
          O próximo passo é a rotação das metades. A rotação nada mais é do que
          a movimentação de todos os bits. No caso do S-DES essa rotação inicial
          será de 1 posição para esquerda, circular left shift 1 (LS-1). O bit
          que está na primeira posição, por não ter como se mover para a
          esquerda, irá então para a última posição.
        </ExplanationText>
        <ExplanationText>
          Aplicando a rotação LS-1 nas metades de R<sub>P10</sub> temos:
        </ExplanationText>
      </StepContentAccordion>
      <Grid container direction="row" justify="center" spacing={3}>
        <Grid item md={6}>
          <StepByStepCircularLeftShift
            shift={1}
            inputLabel={
              <>
                Esquerda (L) de R<sub>P10</sub>
              </>
            }
            input={Utils.leftHalf(p10Bits)}
            outputLabel={
              <>
                R
                <sub>
                  LS-1<sub>L</sub>
                </sub>{" "}
                = Resultado de LS-1 sobre a esquerda
              </>
            }
            outputShortLabel={
              <>
                R
                <sub>
                  LS-1<sub>L</sub>
                </sub>
              </>
            }
            output={Utils.leftHalf(ls1Bits)}
          />
        </Grid>
        <Grid item md={6}>
          <StepByStepCircularLeftShift
            shift={1}
            inputLabel={
              <>
                Direita (R) de R<sub>P10</sub>
              </>
            }
            input={Utils.rightHalf(p10Bits)}
            outputLabel={
              <>
                R
                <sub>
                  LS-1<sub>R</sub>
                </sub>{" "}
                = Resultado de LS-1 sobre a direita
              </>
            }
            outputShortLabel={
              <>
                R
                <sub>
                  LS-1<sub>R</sub>
                </sub>
              </>
            }
            output={Utils.rightHalf(ls1Bits)}
          />
        </Grid>
      </Grid>
      <BitsField
        label={
          <>
            R<sub>LS-1</sub> = Resultado de LS-1 = R
            <sub>
              LS-1<sub>L</sub>
            </sub>{" "}
            + R
            <sub>
              LS-1<sub>R</sub>
            </sub>
          </>
        }
        bits={ls1Bits}
        labelAbove
      />
    </>
  );
}

export default LS1Step;
