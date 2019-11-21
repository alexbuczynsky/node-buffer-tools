import { GetUInt8At, SetUInt8At } from "./uint8";
import { DEFAULT_ENDIAN, Endian } from "../../constants";

/**
 * Binary-Coded Decimal to Byte
 *
 * @export
 * @param {number} byte
 * @returns {number}
 */
export function BCDtoByte(byte: number): number {
  return ((byte >> 4) * 10) + (byte & 0x0F);
}

/**
 * Byte to Binary-Coded Decimal
 *
 * @export
 * @param {number} value
 * @returns {number}
 */
export function ByteToBCD(value: number): number {
  return (((value / 10) << 4) | (value % 10));
}

/**
 * Get Binary-Coded Decimal value at specific byte
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 */
export function GetBCDAt(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): number {
  return ByteToBCD(GetUInt8At(buffer, pos, endian));
}

/**
 * Set Binary-Coded Decimal value at specific byte
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} bcdValue
 */
export function SetBCDAt(buffer: Buffer, pos: number, bcdValue: number, endian: Endian = DEFAULT_ENDIAN): void {
  SetUInt8At(buffer, pos, BCDtoByte(bcdValue), endian);
}