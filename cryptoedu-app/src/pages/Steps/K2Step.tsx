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
import MathImg from "../../components/MathImg/MathImg";

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
          O próximo passo é a rotação circular para a esquerda de R
          <sub>LS-1</sub>, que ocorre separadamente em cada uma das metades de R
          <sub>LS-1</sub> que foi obtido anteriormente. Então o primeiro passo
          dessa etapa é dividir R<sub>LS-1</sub> em 2 metades:
        </ExplanationText>
        <BitsField
          label={
            <>
              R<sub>LS-1</sub>
            </>
          }
          bits={ls1Bits}
          labelAbove
        />
        <SplitBitsField
          leftLabel={
            <>
              Esquerda (L) de R<sub>LS-1</sub>
            </>
          }
          rightLabel={
            <>
              Direita (R) de R<sub>LS-1</sub>
            </>
          }
          bits={ls1Bits}
        />
        <ExplanationText>
          O próximo passo é a rotação das metades. A rotação nada mais é do que
          a movimentação de todos os bits. No caso do S-DES a segunda rotação
          será de 2 posições para esquerda, circular left shift 2 (LS-2). Os
          bits que estão no inicio, por não ter como se mover para a esquerda,
          irão então para as últimas posições.
        </ExplanationText>
        <ExplanationText>
          Aplicando a rotação LS-2 nas metades de R<sub>LS-1</sub> temos:
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
          O próximo passo é uma permutação a ser aplicada sobre R<sub>LS-2</sub>{" "}
          obtido no passo anterior. A permutação ocorrerá através da aplicação
          de uma função de permutação. A função de permutação P8 é definida por:
        </ExplanationText>
        {/* Generated using https://www.codecogs.com/latex/eqneditor.php with the following expression:
            P8(k_{1}, k_{2}, k_{3}, k_{4}, k_{5}, k_{6}, k_{7},k_{8}, k_{9}, k_{10}) = (k_{6}, k_{3}, k_{7}, k_{4}, k_{8}, k_{5}, k_{10}, k_{9}) */}
        <MathImg src="sdes\p8.svg" alt="P8" />
        <ExplanationText>
          A permutação nada mais é do que uma reorganiação dos bits passados por
          parâmetro para a função. A função acima deve ser interpretada da
          seguinte forma: P8 recebe por parâmetro 10 bits K ordenados das
          posições 1 à 10 e estes serão reordenados na seguinte ordem:
        </ExplanationText>
        <BitsField label="P8" bits={SDES.getP8Positions()} />
        <ExplanationText>
          Lê-se: Na 1ª posição ficará o bit que estava na 6ª posição, na 2ª
          posição ficará o bit que estava na 3ª posição, na 3ª posição ficará o
          bit que estava na 7ª posição, e assim consecutivamente...
        </ExplanationText>
        <ExplanationText>
          É interessante observar que, diferente da função de permutação P10,
          essa função de permutação P8 irá gerar somente 8 bits no seu
          resultado. Sendo assim, aplicando a função P8 sobre R<sub>LS-2</sub>{" "}
          temos:
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
