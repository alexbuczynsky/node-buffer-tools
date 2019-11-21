import { DEFAULT_ENDIAN, Endian, DEFAULT_BIT_ORDER, BitOrder } from "../../constants";
import { ReverseString } from "../string";


/**
 * Get 16 bit unsigned value 0..65535
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 */
export function GetUInt16At(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): number {
  switch (endian) {
    case 'BE':
      return buffer.readUInt16BE(pos);
    case 'LE':
      return buffer.readUInt16LE(pos)
  }
}

/**
 * Set 16 bit unsigned value 0..65535
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 */
export function SetUInt16At(buffer: Buffer, pos: number, value: number, endian: Endian = DEFAULT_ENDIAN): void {
  switch (endian) {
    case 'BE':
      buffer.writeUInt16BE(value, pos);
      break;
    case 'LE':
      buffer.writeUInt16LE(value, pos);
      break;
  }
  return;
}

/**
 * Gets a binary string representation of the target uint16
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {('reversed' | 'normal')} [order='reversed']
 * @returns
 */
export function GetUInt16BinaryString(buffer: Buffer, pos: number, order: BitOrder = DEFAULT_BIT_ORDER) {
  const word = GetUInt16At(buffer, pos);
  const string = word.toString(2)
  const filledString = '0000000000000000'.substr(string.length) + string;

  switch (order) {
    case 'normal':
      return filledString
    default:
      return ReverseString(filledString);
  }

}