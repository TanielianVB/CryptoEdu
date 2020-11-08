import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@material-ui/core";
import StepperNavigation from "../../components/StepperNavigation/StepperNavigation";
import Utils from "../../utils/Utils";
import SDES from "../../utils/SDES";
import IPStep from "../Steps/IPStep";
import BeginStep from "../OuterSteps/BeginStep";
import KeysStep from "../OuterSteps/KeysStep";
import FK1Step from "../OuterSteps/FK1Step";
import SWStep from "../Steps/SWStep";

interface SDESStepperProps {
  mainClassName: string;
  cardClassName: string;
  footerClassName: string;
  stepperClassName: string;
}

const outerSteps: React.ReactNode[] = [
  "Inicio",
  <>
    K<sub>1</sub> & K<sub>2</sub>
  </>,
  "IP",
  <>
    f
    <sub>
      K<sub>1</sub>
    </sub>
  </>,
  "SW",
  <>
    f
    <sub>
      K<sub>2</sub>
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

  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [message, setMessage] = useState("01110010");
  const [messageBits, setMessageBits] = useState([0, 1, 1, 1, 0, 0, 1, 0]);
  const [key, setKey] = useState("1010000010");
  const [keyBits, setKeyBits] = useState([1, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
  console.info(mode);
  // Keys
  const [k1Bits, setK1Bits] = useState<number[]>([]);
  const [k2Bits, setK2Bits] = useState<number[]>([]);
  // IP
  const [ipBits, setIpBits] = useState<number[]>([]);
  const [ipLBits, setIpLBits] = useState<number[]>([]);
  const [ipRBits, setIpRBits] = useState<number[]>([]);
  // fK1
  const [fK1EpBits, setFK1EpBits] = useState<number[]>([]);
  const [fK1EpXorK1Bits, setFK1EpXorK1Bits] = useState<number[]>([]);
  const [fK1SubBits, setFK1SubBits] = useState<number[]>([]);
  const [fK1P4Bits, setFK1P4Bits] = useState<number[]>([]);
  const [fK1P4XorIpLBits, setFK1P4XorIpLBits] = useState<number[]>([]);
  // SW
  const [swInputBits, setSwInputBits] = useState<number[]>([]);
  const [swBits, setSwBits] = useState<number[]>([]);
  // const [swLBits, setSwLBits] = useState<number[]>([]);
  // const [swRBits, setSwRBits] = useState<number[]>([]);
  // fK2

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
    // fK1
    const fK1Ep = SDES.permutateEP(ipR);
    setFK1EpBits(fK1Ep);
    const fK1EpXorK1 = SDES.xor(fK1Ep, k1Bits);
    setFK1EpXorK1Bits(fK1EpXorK1);
    const fK1SubL = SDES.substituteS0(Utils.leftHalf(fK1EpXorK1));
    const fK1SubR = SDES.substituteS1(Utils.rightHalf(fK1EpXorK1));
    const fK1Sub = fK1SubL.concat(fK1SubR);
    setFK1SubBits(fK1Sub);
    const fK1P4 = SDES.permutateP4(fK1Sub);
    setFK1P4Bits(fK1P4);
    const fK1P4XorIpL = SDES.xor(fK1P4, ipL);
    setFK1P4XorIpLBits(fK1P4XorIpL);
    // SW
    const swInput = fK1P4XorIpL.concat(ipR);
    setSwInputBits(swInput);
    const sw = SDES.switch(swInput);
    setSwBits(sw);
    // const swL = Utils.leftHalf(sw);
    // setSwLBits(swL);
    // const swR = Utils.rightHalf(sw);
    // setSwRBits(swR);
    // fK2
  }, [messageBits, k1Bits]);

  //   const getStepContent = (stepIndex: number) => {
  //     switch (stepIndex) {
  //       case 0:
  //       case 1:
  //       case 2:
  //       case 3:
  //       case 4:
  //       case 5:
  //       case 6:
  //       case 7:
  //         return (
  //           <Card className={cardClassName}>
  //             <CardContent>
  //               <SWStep />
  //             </CardContent>
  //             <CardActions>
  //               <StepperNavigation
  //                 setActiveStep={setActiveStep}
  //                 previousStep={stepIndex - 1}
  //                 nextStep={stepIndex + 1}
  //               />
  //             </CardActions>
  //           </Card>
  //         );
  //       case 8:
  //         return (
  //           <Card className={cardClassName}>
  //             <CardContent>
  //               <InverseIPStep />
  //             </CardContent>
  //             <CardActions>
  //               <StepperNavigation
  //                 setActiveStep={setActiveStep}
  //                 previousStep={stepIndex - 1}
  //                 nextStep={stepIndex + 1}
  //               />
  //             </CardActions>
  //           </Card>
  //         );
  //     }
  //   };

  const getOuterStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <BeginStep
            setMode={setMode}
            message={message}
            setMessage={setMessage}
            messageBits={messageBits}
            setMessageBits={setMessageBits}
            secretKey={key}
            setSecretKey={setKey}
            keyBits={keyBits}
            setKeyBits={setKeyBits}
          />
        );
      case 1:
        return <KeysStep keyBits={keyBits} k1Bits={k1Bits} k2Bits={k2Bits} />;
      case 2:
        return <IPStep messageBits={messageBits} ipBits={ipBits} />;
      case 3:
        return (
          <FK1Step
            ipRBits={ipRBits}
            epBits={fK1EpBits}
            k1Bits={k1Bits}
            epXorK1Bits={fK1EpXorK1Bits}
            subBits={fK1SubBits}
            p4Bits={fK1P4Bits}
            ipLBits={ipLBits}
            p4XorIpLBits={fK1P4XorIpLBits}
          />
        );
      case 4:
        return <SWStep swInputBits={swInputBits} swBits={swBits} />;
      default:
        return (
          <Typography variant="h5" color="secondary">
            Em desenvolvimento...
          </Typography>
        );
    }
  };

  return (
    <>
      <main className={mainClassName}>
        <Card className={cardClassName}>
          <CardContent>{getOuterStepContent(activeOuterStep)}</CardContent>
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
