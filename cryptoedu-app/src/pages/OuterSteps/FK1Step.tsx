import React from "react";
import FK1EPStep from "../Steps/FK1EPStep";
import FK1S0S1Step from "../Steps/FK1S0S1Step";

interface FK1StepProps {
  ipRBits: number[];
  epBits: number[];
  k1Bits: number[];
  epXorK1Bits: number[];
  subBits: number[];
  p4Bits: number[];
  ipLBits: number[];
  p4XorIpLBits: number[];
}

function FK1Step(props: FK1StepProps) {
  const {
    ipRBits,
    epBits,
    k1Bits,
    epXorK1Bits,
    subBits,
    p4Bits,
    ipLBits,
    p4XorIpLBits,
  } = props;

  return (
    <>
      <FK1EPStep
        ipRBits={ipRBits}
        epBits={epBits}
        k1Bits={k1Bits}
        epXorK1Bits={epXorK1Bits}
      />
      <FK1S0S1Step
        epXorK1Bits={epXorK1Bits}
        subBits={subBits}
        p4Bits={p4Bits}
        ipLBits={ipLBits}
        p4XorIpLBits={p4XorIpLBits}
      />
    </>
  );
}

export default FK1Step;
