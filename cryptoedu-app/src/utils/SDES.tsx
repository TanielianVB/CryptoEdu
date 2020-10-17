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

  static generateP8Key = (key: number[]): number[] => {
    var permutation8NewPositions = [6, 3, 7, 4, 8, 5, 10, 9];
    return SDES.permutate(key, permutation8NewPositions);
  };
}

export default SDES;
