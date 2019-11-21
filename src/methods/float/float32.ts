import { FLOAT32_DEFAULT_PRECISION, Endian, DEFAULT_ENDIAN } from "../../constants";
import { toFixed } from "./toFixed";

/**
 * Get 32 bit float value
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} [precision=3]
 * @param {Endian} [endian='LE']
 * @returns {number}
 */
export function GetFloat32At(buffer: Buffer, pos: number, precision: number = FLOAT32_DEFAULT_PRECISION, endian: Endian = DEFAULT_ENDIAN): number {
  switch (endian) {
    case 'BE':
      return toFixed(buffer.readFloatBE(pos), precision)
    case 'LE':
      return toFixed(buffer.readFloatLE(pos), precision)
  }
}

/**
 * Set 32 bit float value
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 * @param {Endian} [endian='LE']
 * @returns {void}
 */
export function SetFloat32At(buffer: Buffer, pos: number, value: number, endian: Endian = DEFAULT_ENDIAN): void {
  switch (endian) {
    case 'BE':
      buffer.writeFloatBE(value, pos);
      break;
    case 'LE':
      buffer.writeFloatLE(value, pos);
      break;
  }
  return;
}