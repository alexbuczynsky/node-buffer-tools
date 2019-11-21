import { Endian, DEFAULT_ENDIAN } from "../../constants";
import { ValidateBigIntSupported } from "../../validators";

/**
 * Get 64 bit signed value -9223372036854775808..9223372036854775807
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {bigint}
 */
export function GetLIntAt(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): bigint {
  ValidateBigIntSupported();

  switch (endian) {
    case 'BE':
      return buffer.readBigInt64BE(pos);
    case 'LE':
      return buffer.readBigInt64LE(pos)
  }

}

/**
 * Get 64 bit signed value -9223372036854775808..9223372036854775807
 * 
 * Node.js versions below 12.0.0 do not support `bigint` data type,
 * so the following code will attempt to calculate the Int64 value,
 * but at the outer ranges these values will have rounding errors.
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 */
export function GetLIntAt_UNSAFE(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): number {

  let Result: number;

  const workingBuffer = Buffer.allocUnsafe(8);
  buffer.copy(workingBuffer, 0, pos, pos + 8)

  switch (endian) {
    case 'BE':
      break;
    case 'LE':
      workingBuffer.swap64();
      break;
  }

  Result = workingBuffer[pos]; Result <<= 8;
  Result += workingBuffer[pos + 1]; Result <<= 8;
  Result += workingBuffer[pos + 2]; Result <<= 8;
  Result += workingBuffer[pos + 3]; Result <<= 8;
  Result += workingBuffer[pos + 4]; Result <<= 8;
  Result += workingBuffer[pos + 5]; Result <<= 8;
  Result += workingBuffer[pos + 6]; Result <<= 8;
  Result += workingBuffer[pos + 7];

  return Result;
}

/**
 * Get 64 bit signed value -9223372036854775808..9223372036854775807
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {bigint}
 * @alias GetLIntAt
 */
export function GetInt64(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): bigint {
  return GetLIntAt(buffer, pos, endian)
}

/**
 * Get 64 bit signed value -9223372036854775808..9223372036854775807
 *
 * Node.js versions below 12.0.0 do not support `bigint` data type,
 * so the following code will attempt to calculate the Int64 value,
 * but at the outer ranges these values will have rounding errors.
 * 
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 * @alias GetLIntAt_UNSAFE
 */
export function GetInt64_UNSAFE(buffer: Buffer, pos: number, endian: Endian = DEFAULT_ENDIAN): number {
  return GetLIntAt_UNSAFE(buffer, pos, endian)
}

/**
 * Set 64 bit signed value -9223372036854775808..9223372036854775807
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {bigint} value
 */
export function SetLIntAt(buffer: Buffer, pos: number, value: bigint, endian: Endian = DEFAULT_ENDIAN): void {
  ValidateBigIntSupported();

  switch (endian) {
    case 'BE':
      buffer.writeBigInt64BE(value, pos);
      break;
    case 'LE':
      buffer.writeBigInt64LE(value, pos);
      break;
  }
  return;
}

/**
 * Set 64 bit signed value -9223372036854775808..9223372036854775807
 * 
 * Node.js versions below 12.0.0 do not support `bigint` data type,
 * so the following code will attempt to calculate the Int64 value,
 * but at the outer ranges these values will have rounding errors.
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 */
export function SetLIntAt_UNSAFE(buffer: Buffer, pos: number, value: number, endian: Endian = DEFAULT_ENDIAN): void {

  const workingBuffer = Buffer.allocUnsafe(8);

  workingBuffer[pos + 7] = (value & 0xFF);
  workingBuffer[pos + 6] = ((value >> 8) & 0xFF);
  workingBuffer[pos + 5] = ((value >> 16) & 0xFF);
  workingBuffer[pos + 4] = ((value >> 24) & 0xFF);
  workingBuffer[pos + 3] = ((value >> 32) & 0xFF);
  workingBuffer[pos + 2] = ((value >> 40) & 0xFF);
  workingBuffer[pos + 1] = ((value >> 48) & 0xFF);
  workingBuffer[pos] = ((value >> 56) & 0xFF);

  switch (endian) {
    case 'BE':
      break;
    case 'LE':
      workingBuffer.swap64();
      break;
  }

  workingBuffer.copy(buffer, 0, pos, pos + 8)
  return;
}

/**
 * Set 64 bit signed value -9223372036854775808..9223372036854775807
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {bigint} value
 * @alias SetLIntAt
 */
export function SetInt64(buffer: Buffer, pos: number, value: bigint, endian: Endian = DEFAULT_ENDIAN): void {
  return SetLIntAt(buffer, pos, value, endian)
}

/**
 * Set 64 bit signed value -9223372036854775808..9223372036854775807
 * 
 * Node.js versions below 12.0.0 do not support `bigint` data type,
 * so the following code will attempt to calculate the Int64 value,
 * but at the outer ranges these values will have rounding errors.
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 * @alias SetLIntAt_UNSAFE
 */
export function SetInt64_UNSAFE(buffer: Buffer, pos: number, value: number, endian: Endian = DEFAULT_ENDIAN): void {
  return SetLIntAt_UNSAFE(buffer, pos, value, endian);
}
