class Utils {
  static getBits = (text: string, size: number) => {
    var bits = new Array(size);

    for (let index = 0; index < bits.length; index++) {
      var letter = text[index];
      var number = 0;
      if (letter !== undefined) {
        number = Number(letter);
        if (isNaN(number) || number > 0) {
          number = 1;
        }
      }
      bits[index] = number || 0;
    }

    return bits;
  };
  static getChar = (binaryArray: number[]) => {
    return binaryArray.length === 8
      ? String.fromCharCode(parseInt(binaryArray.join(""), 2))
      : "";
  };
}

export default Utils;
