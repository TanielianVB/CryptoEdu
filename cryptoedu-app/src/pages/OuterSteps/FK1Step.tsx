import React from "react";
import EPStep from "../Steps/EPStep";
import S0S1Step from "../Steps/S0S1Step";

interface FK1StepProps {
  ipBits: number[];
  ep1Bits: number[];
  k1Bits: number[];
  ep1XorK1Bits: number[];
  sub1Bits: number[];
  p41Bits: number[];
  ipLBits: number[];
  p4XorIplBits: number[];
}

function FK1Step(props: FK1StepProps) {
  const {
    ipBits,
    ep1Bits,
    k1Bits,
    ep1XorK1Bits,
    sub1Bits,
    p41Bits,
    ipLBits,
    p4XorIplBits,
  } = props;

  return (
    <>
      <EPStep
        ipBits={ipBits}
        ep1Bits={ep1Bits}
        k1Bits={k1Bits}
        ep1XorK1Bits={ep1XorK1Bits}
      />
      <S0S1Step
        ep1XorK1Bits={ep1XorK1Bits}
        sub1Bits={sub1Bits}
        p41Bits={p41Bits}
        ipLBits={ipLBits}
        p4XorIplBits={p4XorIplBits}
      />
    </>
  );
}

export default FK1Step;
