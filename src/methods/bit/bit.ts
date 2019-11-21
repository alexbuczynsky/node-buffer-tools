import { GenerateDefaultMask } from "../masks";
import { GetUInt8At, SetUInt8At } from "../byte";
import { DEFAULT_ENDIAN, Endian, BitIndex } from "../../constants";

/**
 * Get the bit at pos.bit
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {BitIndex} bit
 * @returns {boolean}
 */
export function GetBitAt(buffer: Buffer, pos: number, bit: BitIndex, endian: Endian = DEFAULT_ENDIAN): boolean {
  const Mask = GenerateDefaultMask();
  if (bit < 0) bit = 0;
  if (bit > 7) bit = 7;

  const byte = GetUInt8At(buffer, pos, endian);

  return (byte & Mask[bit]) != 0;
}

/**
 * Set the bit at pos.bit
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {BitIndex} bit
 * @param {boolean} value
 */
export function SetBitAt(buffer: Buffer, pos: number, bit: BitIndex, value: boolean, endian: Endian = DEFAULT_ENDIAN): void {
  const Mask = GenerateDefaultMask();
  if (bit < 0) bit = 0;
  if (bit > 7) bit = 7;

  let byte = GetUInt8At(buffer, pos, endian);

  if (value) {
    byte = (byte | Mask[bit]);
  }
  else {
    byte = (byte & ~Mask[bit]);
  }

  SetUInt8At(buffer, pos, byte, endian);
}

/**
 * Toggle the bit at pos.bit
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {BitIndex} bit
 */
export function ToggleBitAt(buffer: Buffer, pos: number, bit: BitIndex, endian: Endian = DEFAULT_ENDIAN): void {
  const currentValue = GetBitAt(buffer, pos, bit, endian);
  SetBitAt(buffer, pos, bit, !currentValue, endian);
}