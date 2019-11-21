import { Endian, DEFAULT_ENDIAN } from "../../constants";

/**
 * Get 32 bit unsigned value 0..4294967296
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 */
export function GetUInt32At(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): number {
  switch (endian) {
    case 'BE':
      return buffer.readUInt32BE(pos);
    case 'LE':
      return buffer.readUInt32LE(pos)
  }
}


/**
 * Set 32 bit unsigned value 0..4294967295
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 */
export function SetUInt32At(buffer: Buffer, pos: number, value: number, endian: Endian = DEFAULT_ENDIAN): void {
  switch (endian) {
    case 'BE':
      buffer.writeUInt32BE(value, pos);
      break;
    case 'LE':
      buffer.writeUInt32LE(value, pos);
      break;
  }
  return;
}