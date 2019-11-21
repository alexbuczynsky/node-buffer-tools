/**
 * Get 8 bit signed value -128..127
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 */
export function GetInt8At(buffer: Buffer, pos: number): number {
  const value = buffer.readInt8(pos);
  if (value < 128)
    return value;
  else
    return (value - 256);
}

/**
 * Set 8 bit signed value -128..127
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 */
export function SetInt8At(buffer: Buffer, pos: number, value: number): void {
  if (value < -128) {
    value = -128;
  }
  if (value > 127) {
    value = 127;
  }
  buffer.writeInt8(value, pos)
}