import { Endian, DEFAULT_ENDIAN } from "../../constants";

/**
 * Get 32 bit signed value -2147483648..2147483647
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {Endian} [endian='LE'] the endian to use, defaults to little endian
 * @returns {number}
 */
export function GetInt32At(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): number {
  switch (endian) {
    case 'BE':
      return buffer.readInt32BE(pos);
    case 'LE':
      return buffer.readInt32LE(pos)
  }
}

/**
 * Set 32 bit signed value -2147483648..2147483647
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 * @param {Endian} [endian='LE'] the endian to use, defaults to little endian
 */
export function SetInt32At(buffer: Buffer, pos: number, value: number, endian: Endian = DEFAULT_ENDIAN): void {
  switch (endian) {
    case 'BE':
      buffer.writeInt32BE(value, pos);
      break;
    case 'LE':
      buffer.writeInt32LE(value, pos);
      break;
  }
  return;
}