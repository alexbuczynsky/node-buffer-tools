import { DEFAULT_ENDIAN, Endian, NibbleSignificance } from "../../constants";
import { GetUInt8At, SetUInt8At } from "./uint8";
import { GetByteNibble } from "../nibble";

function checkValidBCDNibble(bcdNibble: number) {
  if (bcdNibble > 10) {
    throw new Error('Invalid BCD Buffer');
  }
}
/**
 * Binary-Coded Decimal to Byte
 *
 * @export
 * @param {number} bcd
 * @returns {number}
 */
export function BCDtoByte(bcd: number): number {
  const lsn = GetByteNibble(bcd, NibbleSignificance.least);
  const msn = GetByteNibble(bcd, NibbleSignificance.most);

  checkValidBCDNibble(lsn)
  checkValidBCDNibble(msn)
  return (msn * 10) + lsn;
}

/**
 * Byte to Binary-Coded Decimal
 *
 * @export
 * @param {number} byte
 * @returns {number}
 */
export function ByteToBCD(byte: number): number {
  return (((byte / 10) << 4) | (byte % 10));
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