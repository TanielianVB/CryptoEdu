import React, { useEffect, useState } from "react";
import P10Step from "../Steps/P10Step";
import LS1Step from "../Steps/LS1Step";
import K1Step from "../Steps/K1Step";
import K2Step from "../Steps/K2Step";
import SDES from "../../utils/SDES";

interface KeysStepProps {
  keyBits: number[];
  k1Bits: number[];
  k2Bits: number[];
}

function KeysStep(props: KeysStepProps) {
  const { keyBits, k1Bits, k2Bits } = props;

  const [p10Bits, setP10Bits] = useState<number[]>([]);
  const [ls1Bits, setLs1Bits] = useState<number[]>([]);
  const [ls2Bits, setLs2Bits] = useState<number[]>([]);

  useEffect(() => {
    const p10 = SDES.permutate10(keyBits);
    setP10Bits(p10);
    const ls1 = SDES.generateLS1(p10);
    setLs1Bits(ls1);
    setLs2Bits(SDES.generateLS2(ls1));
  }, [keyBits]);

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
