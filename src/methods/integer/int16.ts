import { DEFAULT_ENDIAN, Endian } from "../../constants";

/**
 * Get 16 bit signed value -32768..32767
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {Endian} [endian='LE'] the endian to use, defaults to little endian
 * @returns {number}
 */
export function GetInt16At(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): number {
  switch (endian) {
    case 'BE':
      return buffer.readInt16BE(pos);
    case 'LE':
      return buffer.readInt16LE(pos)
  }
}

/**
 * Set 16 bit signed value -32768..32767
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 * @param {Endian} [endian='LE'] the endian to use, defaults to little endian
 */
export function SetInt16At(buffer: Buffer, pos: number, value: number, endian: Endian = DEFAULT_ENDIAN): void {
  switch (endian) {
    case 'BE':
      buffer.writeInt16BE(value, pos)
      break;
    case 'LE':
      buffer.writeInt16LE(value, pos)
      break;
  }
  return;
}