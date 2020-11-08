import React from "react";
import P10Step from "../Steps/P10Step";
import LS1Step from "../Steps/LS1Step";
import K1Step from "../Steps/K1Step";
import K2Step from "../Steps/K2Step";

interface KeysStepProps {
  keyBits: number[];
  p10Bits: number[];
  ls1Bits: number[];
  k1Bits: number[];
  ls2Bits: number[];
  k2Bits: number[];
}

function KeysStep(props: KeysStepProps) {
  const { keyBits, p10Bits, ls1Bits, k1Bits, ls2Bits, k2Bits } = props;

  return (
    <>
      <P10Step keyBits={keyBits} p10Bits={p10Bits} />
      <LS1Step p10Bits={p10Bits} ls1Bits={ls1Bits} />
      <K1Step ls1Bits={ls1Bits} k1Bits={k1Bits} />
      <K2Step ls1Bits={ls1Bits} ls2Bits={ls2Bits} k2Bits={k2Bits} />
    </>
  );
}

export default KeysStep;
