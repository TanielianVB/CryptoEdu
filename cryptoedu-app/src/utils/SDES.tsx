class SDES {
  static permutate = (array: number[], newPositions: number[]): number[] => {
    var permutatedArray: number[] = [];
    newPositions.forEach((position) => {
      permutatedArray.push(array[position - 1]);
    });

    return permutatedArray;
  };

  static generateP10Key = (key: number[]): number[] => {
    var permutation10NewPositions = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
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

  static generateLS1 = (key: number[]): number[] => {
    const p10 = SDES.generateP10Key(key);
    var leftHalf = p10.slice(0, 5);
    var rightHalf = p10.slice(5, 10);
    return SDES.circularLeftShiftNTimes(leftHalf, 1).concat(
      SDES.circularLeftShiftNTimes(rightHalf, 1)
    );
  };

  static generateP8Key = (key: number[]): number[] => {
    var permutation8NewPositions = [6, 3, 7, 4, 8, 5, 10, 9];
    return SDES.permutate(key, permutation8NewPositions);
  };
}

export default SDES;
