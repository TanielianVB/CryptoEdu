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

  const [k1Bits, setK1Bits] = useState<number[]>([]);
  const [k2Bits, setK2Bits] = useState<number[]>([]);

  const [ipBits, setIpBits] = useState<number[]>([]);
  const [ipLBits, setIpLBits] = useState<number[]>([]);
  const [ep1Bits, setEp1Bits] = useState<number[]>([]);
  const [ep1XorK1Bits, setEp1XorK1Bits] = useState<number[]>([]);
  const [sub1Bits, setSub1Bits] = useState<number[]>([]);
  const [p41Bits, setP41Bits] = useState<number[]>([]);
  const [p4XorIplBits, setP4XorIplBits] = useState<number[]>([]);

  // const [swBits, setSwBits] = useState<number[]>([]);

  useEffect(() => {
    const ls1 = SDES.generateLS1(SDES.permutate10(keyBits));
    const k1 = SDES.generateKey1(ls1);
    setK1Bits(k1);
    const k2 = SDES.generateKey2(SDES.generateLS2(ls1));
    setK2Bits(k2);
  }, [keyBits]);

  useEffect(() => {
    const ip = SDES.permutateIP(messageBits);
    setIpBits(ip);
    const ipL = Utils.leftHalf(ip);
    const ipR = Utils.rightHalf(ip);
    setIpLBits(ipL);
    const ep1 = SDES.permutateEP(ipR);
    setEp1Bits(ep1);
    const xor1 = SDES.xor(ep1, k1Bits);
    setEp1XorK1Bits(xor1);
    const sub1L = SDES.substituteS0(Utils.leftHalf(xor1));
    const sub1R = SDES.substituteS1(Utils.rightHalf(xor1));
    const sub1 = sub1L.concat(sub1R);
    setSub1Bits(sub1);
    const p41 = SDES.permutateP4(sub1);
    setP41Bits(p41);
    const p4XorIpl = SDES.xor(p41, ipL);
    setP4XorIplBits(p4XorIpl);

    // const swInput = p4XorIpl.concat(ipR);
    // const sw = SDES.switch(swInput);
    // const swL = SDES.leftHalf(sw);
    // const swR = SDES.rightHalf(sw);
    // setSwBits(sw);
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
            ipBits={ipBits}
            ep1Bits={ep1Bits}
            k1Bits={k1Bits}
            ep1XorK1Bits={ep1XorK1Bits}
            sub1Bits={sub1Bits}
            p41Bits={p41Bits}
            ipLBits={ipLBits}
            p4XorIplBits={p4XorIplBits}
          />
        );
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
