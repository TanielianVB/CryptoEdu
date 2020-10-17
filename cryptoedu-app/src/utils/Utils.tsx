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
}

export default Utils;
