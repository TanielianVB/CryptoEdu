class SDES {
  static permutate = (array: number[], newPositions: number[]): number[] => {
    const permutatedArray: number[] = [];
    newPositions.forEach((position) => {
      permutatedArray.push(array[position - 1]);
    });

    return permutatedArray;
  };

  static permutate10 = (key: number[]): number[] => {
    const permutation10NewPositions = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
    return SDES.permutate(key, permutation10NewPositions);
  };

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

  static permutateP8 = (ls: number[]): number[] => {
    const permutation8NewPositions = [6, 3, 7, 4, 8, 5, 10, 9];
    return SDES.permutate(ls, permutation8NewPositions);
  };

  static generateKey1 = (ls1: number[]): number[] => SDES.permutateP8(ls1);

  static generateLS2 = (ls1: number[]): number[] => {
    const leftHalf = ls1.slice(0, 5);
    const rightHalf = ls1.slice(5, 10);
    return SDES.circularLeftShiftNTimes(leftHalf, 2).concat(
      SDES.circularLeftShiftNTimes(rightHalf, 2)
    );
  };

  static generateKey2 = (ls2: number[]): number[] => SDES.permutateP8(ls2);

  static permutateIP = (message: number[]): number[] => {
    const initialPermutationNewPositions = [2, 6, 3, 1, 4, 8, 5, 7];
    return SDES.permutate(message, initialPermutationNewPositions);
  };
}

export default SDES;
