import { FLOAT64_DEFAULT_PRECISION, Endian, DEFAULT_ENDIAN } from "../../constants";
import { toFixed } from "./toFixed";

/**
 * Get 64 bit double value
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {Endian} [endian='LE']
 * @returns {number}
 */
export function GetFloat64At(buffer: Buffer, pos: number, precision: number = FLOAT64_DEFAULT_PRECISION, endian: Endian = DEFAULT_ENDIAN): number {
  switch (endian) {
    case 'BE':
      return toFixed(buffer.readDoubleBE(pos), precision);
    case 'LE':
      return toFixed(buffer.readDoubleLE(pos), precision);
  }
}

/**
 * Set 64 bit double value
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 * @param {Endian} [endian='LE']
 * @returns {void}
 */
export function SetFloat64At(buffer: Buffer, pos: number, value: number, endian: Endian = DEFAULT_ENDIAN): void {
  switch (endian) {
    case 'BE':
      buffer.writeDoubleBE(value, pos);
      break;
    case 'LE':
      buffer.writeDoubleLE(value, pos);
      break;
  }
  return;
}