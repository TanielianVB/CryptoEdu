import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Step,
  StepButton,
  Stepper,
} from "@material-ui/core";
import StepperNavigation from "../../components/StepperNavigation/StepperNavigation";
import Utils from "../../utils/Utils";
import SDES from "../../utils/SDES";
import IPStep from "../Steps/IPStep";
import BeginStep from "../OuterSteps/BeginStep";
import KeysStep from "../OuterSteps/KeysStep";
import FirstFKStep from "../OuterSteps/FirstFKStep";
import SWStep from "../Steps/SWStep";
import SecondFKStep from "../OuterSteps/SecondFKStep";
import InverseIPStep from "../Steps/InverseIPStep";
import EndStep from "../OuterSteps/EndStep";
import ExplanationsInitiallyOpenContext from "../../components/ExplanationsInitiallyOpenContext/ExplanationsInitiallyOpenContext";

interface SDESStepperProps {
  mainClassName: string;
  cardClassName: string;
  footerClassName: string;
  stepperClassName: string;
}

const getOuterSteps = (mode: "encrypt" | "decrypt"): React.ReactNode[] => [
  "Inicio",
  "Keys",
  "IP",
  <>
    f
    <sub>
      K<sub>{mode === "encrypt" ? 1 : 2}</sub>
    </sub>
  </>,
  "SW",
  <>
    f
    <sub>
      K<sub>{mode === "encrypt" ? 2 : 1}</sub>
    </sub>
  </>,
  <>
    IP<sup>-1</sup>
  </>,
  "Fim",
];

function SDESStepper(props: SDESStepperProps) {
  const {
    mainClassName,
    cardClassName,
    footerClassName,
    stepperClassName,
  } = props;

  const [activeOuterStep, setActiveOuterStep] = useState(0);
  const [explanationsInitiallyOpen, setExplanationsInitiallyOpen] = useState(
    false
  );

  // Inputs
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [message, setMessage] = useState("01110010");
  const [messageBits, setMessageBits] = useState([0, 1, 1, 1, 0, 0, 1, 0]);
  const [key, setKey] = useState("1010000010");
  const [keyBits, setKeyBits] = useState([1, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
  // Keys
  const [k1Bits, setK1Bits] = useState<number[]>([]);
  const [k2Bits, setK2Bits] = useState<number[]>([]);
  // IP
  const [ipBits, setIpBits] = useState<number[]>([]);
  const [ipLBits, setIpLBits] = useState<number[]>([]);
  const [ipRBits, setIpRBits] = useState<number[]>([]);
  // first FK
  const [firstFKEpBits, setFirstFKEpBits] = useState<number[]>([]);
  const [firstFKEpXorK1Bits, setFirstFKEpXorK1Bits] = useState<number[]>([]);
  const [firstFKSubBits, setFirstFKSubBits] = useState<number[]>([]);
  const [firstFKP4Bits, setFirstFKP4Bits] = useState<number[]>([]);
  const [firstFKP4XorIpLBits, setFirstFKP4XorIpLBits] = useState<number[]>([]);
  const [firstFKBits, setFirstFKBits] = useState<number[]>([]);
  // SW
  const [swBits, setSwBits] = useState<number[]>([]);
  const [swLBits, setSwLBits] = useState<number[]>([]);
  const [swRBits, setSwRBits] = useState<number[]>([]);
  // second FK
  const [secondFKEpBits, setSecondFKEpBits] = useState<number[]>([]);
  const [secondFKEpXorK2Bits, setSecondFKEpXorK2Bits] = useState<number[]>([]);
  const [secondFKSubBits, setSecondFKSubBits] = useState<number[]>([]);
  const [secondFKP4Bits, setSecondFKP4Bits] = useState<number[]>([]);
  const [secondFKP4XorSwLBits, setSecondFKP4XorSwLBits] = useState<number[]>(
    []
  );
  const [secondFKBits, setSecondFKBits] = useState<number[]>([]);
  // Inverse IP
  const [iipBits, setIipBits] = useState<number[]>([]);

  useEffect(() => {
    // Keys
    const ls1 = SDES.generateLS1(SDES.permutate10(keyBits));
    const k1 = SDES.generateKey1(ls1);
    setK1Bits(k1);
    const k2 = SDES.generateKey2(SDES.generateLS2(ls1));
    setK2Bits(k2);
  }, [keyBits]);

  useEffect(() => {
    // IP
    const ip = SDES.permutateIP(messageBits);
    setIpBits(ip);
    const ipL = Utils.leftHalf(ip);
    setIpLBits(ipL);
    const ipR = Utils.rightHalf(ip);
    setIpRBits(ipR);
    // first fK
    const firstKey = mode === "encrypt" ? k1Bits : k2Bits;
    const firstFKEp = SDES.permutateEP(ipR);
    setFirstFKEpBits(firstFKEp);
    const firstFKEpXorK1 = SDES.xor(firstFKEp, firstKey);
    setFirstFKEpXorK1Bits(firstFKEpXorK1);
    const firstFKSubL = SDES.substituteS0(Utils.leftHalf(firstFKEpXorK1));
    const firstFKSubR = SDES.substituteS1(Utils.rightHalf(firstFKEpXorK1));
    const firstFKSub = firstFKSubL.concat(firstFKSubR);
    setFirstFKSubBits(firstFKSub);
    const firstFKP4 = SDES.permutateP4(firstFKSub);
    setFirstFKP4Bits(firstFKP4);
    const firstFKP4XorIpL = SDES.xor(firstFKP4, ipL);
    setFirstFKP4XorIpLBits(firstFKP4XorIpL);
    const firstFK = firstFKP4XorIpL.concat(ipR);
    setFirstFKBits(firstFK);
    // SW
    const sw = SDES.switch(firstFK);
    setSwBits(sw);
    const swL = Utils.leftHalf(sw);
    setSwLBits(swL);
    const swR = Utils.rightHalf(sw);
    setSwRBits(swR);
    // second FK
    const secondKey = mode === "encrypt" ? k2Bits : k1Bits;
    const secondFKEp = SDES.permutateEP(swR);
    setSecondFKEpBits(secondFKEp);
    const secondFKEpXorK2 = SDES.xor(secondFKEp, secondKey);
    setSecondFKEpXorK2Bits(secondFKEpXorK2);
    const secondFKSubL = SDES.substituteS0(Utils.leftHalf(secondFKEpXorK2));
    const secondFKSubR = SDES.substituteS1(Utils.rightHalf(secondFKEpXorK2));
    const secondFKSub = secondFKSubL.concat(secondFKSubR);
    setSecondFKSubBits(secondFKSub);
    const secondFKP4 = SDES.permutateP4(secondFKSub);
    setSecondFKP4Bits(secondFKP4);
    const secondFKP4XorSwL = SDES.xor(secondFKP4, swL);
    setSecondFKP4XorSwLBits(secondFKP4XorSwL);
    const secondFK = secondFKP4XorSwL.concat(swR);
    setSecondFKBits(secondFK);
    // Inverse IP
    const iip = SDES.permutateInverseIP(secondFK);
    setIipBits(iip);
  }, [messageBits, k1Bits, k2Bits, mode]);

  const getOuterStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <BeginStep
            mode={mode}
            setMode={setMode}
            message={message}
            setMessage={setMessage}
            messageBits={messageBits}
            setMessageBits={setMessageBits}
            secretKey={key}
            setSecretKey={setKey}
            keyBits={keyBits}
            setKeyBits={setKeyBits}
            explanationsInitiallyOpen={explanationsInitiallyOpen}
            setExplanationsInitiallyOpen={setExplanationsInitiallyOpen}
          />
        );
      case 1:
        return <KeysStep keyBits={keyBits} k1Bits={k1Bits} k2Bits={k2Bits} />;
      case 2:
        return <IPStep mode={mode} messageBits={messageBits} ipBits={ipBits} />;
      case 3:
        return (
          <FirstFKStep
            mode={mode}
            ipRBits={ipRBits}
            epBits={firstFKEpBits}
            keyNumber={mode === "encrypt" ? 1 : 2}
            keyBits={mode === "encrypt" ? k1Bits : k2Bits}
            epXorKeyBits={firstFKEpXorK1Bits}
            subBits={firstFKSubBits}
            p4Bits={firstFKP4Bits}
            ipLBits={ipLBits}
            p4XorIpLBits={firstFKP4XorIpLBits}
            firstFKBits={firstFKBits}
          />
        );
      case 4:
        return <SWStep firstFKBits={firstFKBits} swBits={swBits} />;
      case 5:
        return (
          <SecondFKStep
            mode={mode}
            swRBits={swRBits}
            epBits={secondFKEpBits}
            keyNumber={mode === "encrypt" ? 2 : 1}
            keyBits={mode === "encrypt" ? k2Bits : k1Bits}
            epXorKeyBits={secondFKEpXorK2Bits}
            subBits={secondFKSubBits}
            p4Bits={secondFKP4Bits}
            swLBits={swLBits}
            p4XorSwLBits={secondFKP4XorSwLBits}
            secondFKBits={secondFKBits}
          />
        );
      case 6:
        return (
          <InverseIPStep
            mode={mode}
            secondFKBits={secondFKBits}
            iipBits={iipBits}
          />
        );
      case 7:
        return (
          <EndStep
            mode={mode}
            messageBits={messageBits}
            keyBits={keyBits}
            resultBits={iipBits}
          />
        );
      default:
        throw new Error("You should not see this!");
    }
  };

  const outerSteps = getOuterSteps(mode);

  return (
    <>
      <main className={mainClassName}>
        <Card className={cardClassName}>
          <ExplanationsInitiallyOpenContext.Provider
            value={explanationsInitiallyOpen}
          >
            <CardContent>{getOuterStepContent(activeOuterStep)}</CardContent>
          </ExplanationsInitiallyOpenContext.Provider>
          <CardActions>
            <StepperNavigation
              setActiveStep={setActiveOuterStep}
              previousStep={
                activeOuterStep === 0 ? undefined : activeOuterStep - 1
              }
              nextStep={
                activeOuterStep === outerSteps.length - 1
                  ? undefined
                  : activeOuterStep + 1
              }
            />
          </CardActions>
        </Card>
      </main>
      <footer className={footerClassName}>
        <Stepper
          activeStep={activeOuterStep}
          alternativeLabel
          className={stepperClassName}
          nonLinear
        >
          {outerSteps.map((label, index) => (
            <Step key={index}>
              <StepButton
                completed={index < activeOuterStep}
                onClick={() => setActiveOuterStep(index)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </footer>
    </>
  );
}

export default SDESStepper;
