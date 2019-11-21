import { DEFAULT_ENDIAN, Endian } from "../../constants";
import { CloneBuffer, SwapEndieness } from "../../utils";

/**
 * Get 8 bit unsigned value 0..255
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 */
export function GetUInt8At(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): number {
  const tempBuffer = CloneBuffer(buffer);

  if (endian === 'BE') {
    SwapEndieness(tempBuffer)
  }

  return tempBuffer[pos]
}

/**
 * Set 8 bit unsigned value 0..255
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 */
export function SetUInt8At(buffer: Buffer, pos: number, value: number, endian: Endian = DEFAULT_ENDIAN): void {

  if (endian === 'BE') {
    SwapEndieness(buffer);
    buffer[pos] = value;
    SwapEndieness(buffer);
  } else {
    buffer[pos] = value;
  }
}
