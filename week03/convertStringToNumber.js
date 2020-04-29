function convertStringToNumber(chars, x = 10) {
  if (!/^(0\.?|0?\.\d+|[1-9]\d*\.?\d*?)$/.test(chars)) {
    throw Error(`${chars} 并不是一个合法的数字`);
  }
  const zeroCodePoint = '0'.codePointAt(0);
  let integer = 0;
  let i = 0;
  for (; i < chars.length && chars[i] !== '.'; i++) {
    integer *= x;
    integer += chars[i].codePointAt(0) - zeroCodePoint;
  }

  let decimal = 0;
  for (let j = chars.length - 1; i < j; j--) {
    decimal += chars[j].codePointAt(0) - zeroCodePoint;
    decimal /= x;
  }
  return integer + decimal;
}