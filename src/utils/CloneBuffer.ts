/**
 * Clones a buffer
 *
 * @export
 * @param {Buffer} buffer
 * @returns {Buffer}
 */
export function CloneBuffer(buffer: Buffer): Buffer {
  const numBytes = buffer.byteLength;

  const clonedBuffer = Buffer.alloc(numBytes);

  buffer.copy(clonedBuffer);
  return clonedBuffer;
}