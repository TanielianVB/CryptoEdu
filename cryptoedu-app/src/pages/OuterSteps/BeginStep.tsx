import React, { useEffect, useState } from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  InputAdornment,
  Switch,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import ExplanationText from "../../components/ExplanationText/ExplanationText";
import StepContentAccordion from "../../components/StepContentAccordion/StepContentAccordion";
import BitsField from "../../components/BitsField/BitsField";
import Utils from "../../utils/Utils";

interface BeginStepProps {
  mode: "encrypt" | "decrypt";
  setMode: React.Dispatch<React.SetStateAction<"encrypt" | "decrypt">>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageBits: number[];
  setMessageBits: React.Dispatch<React.SetStateAction<number[]>>;
  secretKey: string;
  setSecretKey: React.Dispatch<React.SetStateAction<string>>;
  keyBits: number[];
  setKeyBits: React.Dispatch<React.SetStateAction<number[]>>;
  explanationsInitiallyOpen: boolean;
  setExplanationsInitiallyOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BeginStep(props: BeginStepProps) {
  const {
    mode,
    setMode,
    message,
    setMessage,
    messageBits,
    setMessageBits,
    secretKey,
    setSecretKey,
    keyBits,
    setKeyBits,
    explanationsInitiallyOpen,
    setExplanationsInitiallyOpen,
  } = props;

  const [selectedTab, setSelectedTab] = useState(mode === "encrypt" ? 0 : 1);

  useEffect(() => setMode(selectedTab === 0 ? "encrypt" : "decrypt"), [
    selectedTab,
    setMode,
  ]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var m = event.target.value;
    if (m.length <= 8) {
      setMessage(m);
      if (m.length === 1) {
        // Convert e letter to binary
        m = m.charCodeAt(0).toString(2).padStart(8, "0");
      }
      setMessageBits(Utils.getBits(m, 8));
    }
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var k = event.target.value;
    if (k.length <= 10) {
      setSecretKey(k);
      setKeyBits(Utils.getBits(k, 10));
    }
  };

  return (
    <>
      <StepContentAccordion title="S-DES - Simplified Data Encryption Standard">
        <ExplanationText>
          O S-DES é uma versão simplificada do algorítimo DES (Data Encryption
          Standard). Este se utiliza de uma chave de 10 bits que deve ser
          compartilhada entre o emissor e o receptor da mensagem para que a
          mensagem possa ser criptografada e descriptografada.
        </ExplanationText>
        <ExplanationText>
          Nesta execução (que possui objetivo educacional) podemos escolher se
          desejamos criptografar ou descriptografar a mensagem e informar uma
          mensagem e uma chave que irão ser utilizadas durante a execução do
          algoritmo para que assim consiguamos melhor visualizar como a ocorre o
          processo quando os valores colocados são utilizados.
        </ExplanationText>
      </StepContentAccordion>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        centered
        value={selectedTab}
        onChange={(event, newValue) => {
          setSelectedTab(newValue);
        }}
      >
        <Tab label="Criptografar" />
        <Tab label="Descriptografar" />
      </Tabs>
      <Box paddingTop={3}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            sm={12}
            md={6}
          >
            <Grid item>
              <TextField
                variant="outlined"
                required
                label={"Mensagem" + (selectedTab === 0 ? "" : " cifrada")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                placeholder={
                  "mensagem" + (selectedTab === 0 ? "" : " cifrada") + "..."
                }
                value={message}
                helperText="1 char ou 8 bits"
                size="medium"
                style={{ width: "146px" }}
                onChange={handleMessageChange}
              />
            </Grid>
            <BitsField
              gridItem
              label={
                <>Bits da mensagem{mode === "encrypt" ? "" : " cifrada"}</>
              }
              bits={messageBits}
              addChar
              labelAbove
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            sm={12}
            md={6}
          >
            <Grid item>
              <TextField
                variant="outlined"
                required
                label="Chave"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyRoundedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                placeholder="chave secreta..."
                value={secretKey}
                helperText="10 bits"
                size="medium"
                style={{ width: "160px" }}
                onChange={handleKeyChange}
              />
            </Grid>
            <BitsField
              gridItem
              label="Bits da chave"
              bits={keyBits}
              labelAbove
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={explanationsInitiallyOpen}
                  onChange={(event) => {
                    setExplanationsInitiallyOpen(event.target.checked);
                  }}
                />
              }
              label={
                <ExplanationText paragraph={false}>
                  Iniciar regiões de explicação abertas
                </ExplanationText>
              }
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default BeginStep;
