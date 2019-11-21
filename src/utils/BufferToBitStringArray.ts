import { ByteToBitString, BitOrder, DEFAULT_BIT_ORDER } from "./ByteToBitString";
import { Endian, DEFAULT_ENDIAN, CloneBuffer } from ".";

/**
 * Converts a buffer to a string array
 * where each string is 8 characters of
 * either a 1 or a 0.
 *
 * @export
 * @param {Buffer} buffer
 * @param {BitOrder} [order=DEFAULT_BIT_ORDER]
 * @returns {string[]}
 */
export function BufferToBitStringArray(buffer: Buffer, endian: Endian = DEFAULT_ENDIAN, order: BitOrder = DEFAULT_BIT_ORDER): string[] {

  const clonedBuffer = CloneBuffer(buffer);


  if (endian === 'BE') {
    clonedBuffer.swap16();
  }

  const bytes = Array.from(clonedBuffer);

  return bytes.map(byte => ByteToBitString(byte, order))
}