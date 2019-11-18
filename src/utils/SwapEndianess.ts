/**
 * Swaps the endianess of the original buffer
 *
 * @export
 * @param {Buffer} buffer
 * @returns {Buffer}
 */
export function SwapEndieness(buffer: Buffer): Buffer {
  return buffer.swap16();
}