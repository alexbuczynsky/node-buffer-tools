import { GetUInt8At } from "./uint8";
import { ByteToBitString } from "../../adapters";
import { DEFAULT_BIT_ORDER, BitOrder, DEFAULT_ENDIAN, Endian } from "../../constants";

/**
 * Gets a binary string representation of the target byte
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {('reversed' | 'normal')} [order='reversed']
 * @returns
 */
export function GetByteBinaryString(buffer: Buffer, pos: number, order: BitOrder = DEFAULT_BIT_ORDER, endian: Endian = DEFAULT_ENDIAN) {
  const byte = GetUInt8At(buffer, pos, endian);
  return ByteToBitString(byte, order);
}