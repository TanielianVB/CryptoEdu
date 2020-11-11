import React from "react";
import { Tooltip, Button, Grid } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import BitsField from "../../components/BitsField/BitsField";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";

interface EndStepProps {
  mode: "encrypt" | "decrypt";
  messageBits: number[];
  keyBits: number[];
  resultBits: number[];
}

function EndStep(props: EndStepProps) {
  const { mode, messageBits, keyBits, resultBits } = props;

  const operation = mode === "encrypt" ? "criptografia" : "descriptografia";

  return (
    <>
      <StepContentAccordion title={<>Resultado da {operation} S-DES</>}>
        <ExplanationText>
          Com o resultado do passo IP<sup>-1</sup> (R
          <sub>
            IP<sup>-1</sup>
          </sub>
          ) obtemos finalmente o objetivo da execução da {operation}.
        </ExplanationText>
      </StepContentAccordion>
      <BitsField
        label={<>Bits da mensagem{mode === "encrypt" ? "" : " cifrada"}</>}
        bits={messageBits}
        addChar
      />
      <BitsField label="Bits da chave" bits={keyBits} />
      <BitsField
        label={<>Mensagem {mode === "encrypt" ? "cifrada" : "descifrada"}</>}
        bits={resultBits}
        addChar
      />
      <StepContentAccordion title="CryptoEdu">
        <Grid container direction="column" justify="center" alignItems="center">
          <ExplanationText>
            O Código fonte desse simulador está disponível no GitHub:
          </ExplanationText>
          <ExplanationText>
            <Tooltip title="CryptoEdu GitHub">
              <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                color="primary"
                href="https://github.com/TanielianVB/CryptoEdu"
                target="CryptoEduGitHub"
              >
                GitHub Repository
              </Button>
            </Tooltip>
          </ExplanationText>
        </Grid>
      </StepContentAccordion>
      <Grid container direction="column" justify="center" alignItems="center">
        <ExplanationText>
          Peço, encarecidamente, que responda à um questionário relativo à
          utilização do simulador:
        </ExplanationText>
        <ExplanationText>
          <Tooltip title="Pesquisa de utilização do simulador">
            <Button
              variant="contained"
              startIcon={<ListRoundedIcon />}
              color="secondary"
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4WZFS6CSGD95991vkVQdrcDK-c01BnqNNBQV5Z86E2yMbvw/viewform?usp=sf_link"
              target="CryptoEduGoogleForms"
            >
              Feedback Form
            </Button>
          </Tooltip>
        </ExplanationText>
        <ExplanationText>
          São somente 6 perguntas de múltipla escolha e demora, em média, 1
          minuto para ser respondido.
        </ExplanationText>
        <ExplanationText>
          Este simulador foi desenvolvido com o objetivo de auxiliar o ensino da
          criptografia. E responder ao formulário auxilia a evolução deste.
        </ExplanationText>
      </Grid>
    </>
  );
}

export default EndStep;
