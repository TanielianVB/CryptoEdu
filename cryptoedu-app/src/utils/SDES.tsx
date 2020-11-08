import Utils from "./Utils";

class SDES {
  static xor = (a: number[], b: number[]): number[] => {
    let result: number[] = new Array(a.length);
    for (let index = 0; index < a.length; index++) {
      result[index] = a[index] ^ b[index];
    }
    return result;
  };

  static permutate = (array: number[], newPositions: number[]): number[] => {
    const permutatedArray: number[] = [];
    newPositions.forEach((position) => {
      permutatedArray.push(array[position - 1]);
    });

    return permutatedArray;
  };

  static substitute = (xor: number[], matrix: number[][][]): number[] => {
    const row = parseInt(xor[0].toString() + xor[3].toString(), 2);
    const col = parseInt(xor[1].toString() + xor[2].toString(), 2);
    return matrix[row][col];
  };

  static getP10Positions = (): number[] => [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];

  static permutate10 = (key: number[]): number[] =>
    SDES.permutate(key, SDES.getP10Positions());

  static circularLeftShift = (array: number[]): number[] => {
    var shiftedArray: number[] = [];
    var lastElement: number = 0;
    array.forEach((element, index) => {
      if (index === 0) {
        lastElement = element;
      } else {
        shiftedArray.push(element);
      }
    });
    shiftedArray.push(lastElement);
    return shiftedArray;
  };

  static circularLeftShiftNTimes = (
    array: number[],
    numberOfTimes: number
  ): number[] => {
    for (let i = 0; i < numberOfTimes; i++) {
      array = SDES.circularLeftShift(array);
    }
    return array;
  };

  static generateLS1 = (p10: number[]): number[] => {
    const leftHalf = p10.slice(0, 5);
    const rightHalf = p10.slice(5, 10);
    return SDES.circularLeftShiftNTimes(leftHalf, 1).concat(
      SDES.circularLeftShiftNTimes(rightHalf, 1)
    );
  };

  static getP8Positions = (): number[] => [6, 3, 7, 4, 8, 5, 10, 9];

  static permutateP8 = (ls: number[]): number[] =>
    SDES.permutate(ls, SDES.getP8Positions());

  static generateKey1 = (ls1: number[]): number[] => SDES.permutateP8(ls1);

  static generateLS2 = (ls1: number[]): number[] => {
    const leftHalf = ls1.slice(0, 5);
    const rightHalf = ls1.slice(5, 10);
    return SDES.circularLeftShiftNTimes(leftHalf, 2).concat(
      SDES.circularLeftShiftNTimes(rightHalf, 2)
    );
  };

  static generateKey2 = (ls2: number[]): number[] => SDES.permutateP8(ls2);

  static getIPPositions = (): number[] => [2, 6, 3, 1, 4, 8, 5, 7];

  static permutateIP = (message: number[]): number[] =>
    SDES.permutate(message, SDES.getIPPositions());

  static getEPPositions = (): number[] => [4, 1, 2, 3, 2, 3, 4, 1];

  static permutateEP = (message: number[]): number[] =>
    SDES.permutate(message, SDES.getEPPositions());

  static getSubstitution0Matrix = (): number[][][] => [
    [
      [0, 1],
      [0, 0],
      [1, 1],
      [1, 0],
    ],
    [
      [1, 1],
      [1, 0],
      [0, 1],
      [0, 0],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
    ],
  ];

  static substituteS0 = (leftXor: number[]): number[] =>
    SDES.substitute(leftXor, SDES.getSubstitution0Matrix());

  static getSubstitution1Matrix = (): number[][][] => [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 0],
      [0, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [0, 0],
      [0, 1],
      [0, 0],
    ],
    [
      [1, 0],
      [0, 1],
      [0, 0],
      [1, 1],
    ],
  ];

  static substituteS1 = (rightXor: number[]): number[] =>
    SDES.substitute(rightXor, SDES.getSubstitution1Matrix());

  static getP4Positions = (): number[] => [2, 4, 3, 1];

  static permutateP4 = (message: number[]): number[] =>
    SDES.permutate(message, SDES.getP4Positions());

  static switch = (array: number[]): number[] =>
    Utils.rightHalf(array).concat(Utils.leftHalf(array));

  static getInverseIPPositions = (): number[] => [4, 1, 3, 5, 7, 2, 8, 6];

  static permutateInverseIP = (message: number[]): number[] =>
    SDES.permutate(message, SDES.getInverseIPPositions());
}

export default SDES;
