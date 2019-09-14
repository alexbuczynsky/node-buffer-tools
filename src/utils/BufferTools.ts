import { StringDecoder } from 'string_decoder';
import { ValidateBigIntSupported } from "./ValidateBigIntSupported";

export type BitIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Little or Big Endian
 */
export type Endian = 'LE' | 'BE';

function GenerateDefaultMask() {
  return Buffer.from([0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80]);
}



/**
 * Get the bit at pos.bit
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {BitIndex} bit
 * @returns {boolean}
 */
export function GetBitAt(buffer: Buffer, pos: number, bit: BitIndex): boolean {
  const Mask = GenerateDefaultMask();
  if (bit < 0) bit = 0;
  if (bit > 7) bit = 7;

  return (buffer[pos] & Mask[bit]) != 0;
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
export function SetBitAt(buffer: Buffer, pos: number, bit: BitIndex, value: boolean): void {
  const Mask = GenerateDefaultMask();
  if (bit < 0) bit = 0;
  if (bit > 7) bit = 7;

  if (value) {
    buffer[pos] = (buffer[pos] | Mask[bit]);
  }
  else {
    buffer[pos] = (buffer[pos] & ~Mask[bit]);
  }
}

/**
 * Toggle the bit at pos.bit
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {BitIndex} bit
 */
export function ToggleBitAt(buffer: Buffer, pos: number, bit: BitIndex): void {
  const currentValue = GetBitAt(buffer, pos, bit);
  SetBitAt(buffer, pos, bit, !currentValue);
}

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

/**
 * Get 16 bit signed value -32768..32767
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {Endian} [endian='LE'] the endian to use, defaults to little endian
 * @returns {number}
 */
export function GetInt16At(buffer: Buffer, pos: number, endian: Endian = 'LE'): number {
  switch (endian) {
    case 'BE':
      return buffer.readInt16BE(pos);
    case 'LE':
      return buffer.readInt16LE(pos)
  }
}

/**
 * Set 16 bit signed value -32768..32767
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 * @param {Endian} [endian='LE'] the endian to use, defaults to little endian
 */
export function SetInt16At(buffer: Buffer, pos: number, value: number, endian: Endian = 'LE'): void {
  switch (endian) {
    case 'BE':
      buffer.writeInt16BE(value, pos)
      break;
    case 'LE':
      buffer.writeInt16LE(value, pos)
      break;
  }
  return;
}


/**
 * Get 32 bit signed value -2147483648..2147483647
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {Endian} [endian='LE'] the endian to use, defaults to little endian
 * @returns {number}
 */
export function GetInt32At(buffer: Buffer, pos: number, endian: Endian = 'LE'): number {
  switch (endian) {
    case 'BE':
      return buffer.readInt32BE(pos);
    case 'LE':
      return buffer.readInt32LE(pos)
  }
}

/**
 * Set 32 bit signed value -2147483648..2147483647
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 * @param {Endian} [endian='LE'] the endian to use, defaults to little endian
 */
export function SetInt32At(buffer: Buffer, pos: number, value: number, endian: Endian = 'LE'): void {
  switch (endian) {
    case 'BE':
      buffer.writeInt32BE(value, pos);
      break;
    case 'LE':
      buffer.writeInt32LE(value, pos);
      break;
  }
  return;
}

/**
 * Get 64 bit signed value -9223372036854775808..9223372036854775807
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {bigint}
 */
export function GetLIntAt(buffer: Buffer, pos: number, endian: Endian = 'LE'): bigint {
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
export function GetLIntAt_UNSAFE(buffer: Buffer, pos: number, endian: Endian = 'LE'): number {

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
export function GetInt64(buffer: Buffer, pos: number, endian: Endian = 'LE'): bigint {
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
export function GetInt64_UNSAFE(buffer: Buffer, pos: number, endian: Endian = 'LE'): number {
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
export function SetLIntAt(buffer: Buffer, pos: number, value: bigint, endian: Endian = 'LE'): void {
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
export function SetLIntAt_UNSAFE(buffer: Buffer, pos: number, value: number, endian: Endian = 'LE'): void {

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
export function SetInt64(buffer: Buffer, pos: number, value: bigint, endian: Endian = 'LE'): void {
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
export function SetInt64_UNSAFE(buffer: Buffer, pos: number, value: number, endian: Endian = 'LE'): void {
  return SetLIntAt_UNSAFE(buffer, pos, value, endian);
}

/**
 * Get 8 bit unsigned value 0..255
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 */
export function GetUInt8At(buffer: Buffer, pos: number): number {
  return buffer[pos];
}

/**
 * Set 8 bit unsigned value 0..255
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 */
export function SetUInt8At(buffer: Buffer, pos: number, value: number): void {
  buffer[pos] = value;
}

/**
 * Get 16 bit unsigned value 0..65535
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 */
export function GetUInt16At(buffer: Buffer, pos: number, endian: Endian = 'LE'): number {
  switch (endian) {
    case 'BE':
      return buffer.readUInt16BE(pos);
    case 'LE':
      return buffer.readUInt16LE(pos)
  }
}


/**
 * Set 16 bit unsigned value 0..65535
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 */
export function SetUInt16At(buffer: Buffer, pos: number, value: number, endian: Endian = 'LE'): void {
  switch (endian) {
    case 'BE':
      buffer.writeUInt16BE(value, pos);
      break;
    case 'LE':
      buffer.writeUInt16LE(value, pos);
      break;
  }
  return;
}


/**
 * Get 32 bit unsigned value 0..4294967296
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {number}
 */
export function GetUInt32At(buffer: Buffer, pos: number, endian: Endian = 'LE'): number {
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
export function SetUInt32At(buffer: Buffer, pos: number, value: number, endian: Endian = 'LE'): void {
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

/**
 * Get 64 bit double value
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {Endian} [endian='LE']
 * @returns {number}
 */
export function GetFloat64At(buffer: Buffer, pos: number, precision: number = 15, endian: Endian = 'LE'): number {
  switch (endian) {
    case 'BE':
      return toFixed(buffer.readDoubleBE(pos), precision);
    case 'LE':
      return buffer.readDoubleLE(pos)
  }
}

/**
 * Set 64 bit double value
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 * @param {Endian} [endian='LE']
 * @returns {void}
 */
export function SetFloat64At(buffer: Buffer, pos: number, value: number, endian: Endian = 'LE'): void {
  switch (endian) {
    case 'BE':
      buffer.writeDoubleBE(value, pos);
      break;
    case 'LE':
      buffer.writeDoubleLE(value, pos);
      break;
  }
  return;
}

function toFixed(x: number, precision: number): number {
  return Number(Number.parseFloat(x + '').toFixed(precision));
}
/**
 * Get 32 bit float value
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} [precision=3]
 * @param {Endian} [endian='LE']
 * @returns {number}
 */
export function GetFloat32At(buffer: Buffer, pos: number, precision: number = 3, endian: Endian = 'LE'): number {
  switch (endian) {
    case 'BE':
      return toFixed(buffer.readFloatBE(pos), precision)
    case 'LE':
      return toFixed(buffer.readFloatLE(pos), precision)
  }
}

/**
 * Set 32 bit float value
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} value
 * @param {Endian} [endian='LE']
 * @returns {void}
 */
export function SetFloat32At(buffer: Buffer, pos: number, value: number, endian: Endian = 'LE'): void {
  switch (endian) {
    case 'BE':
      buffer.writeFloatBE(value, pos);
      break;
    case 'LE':
      buffer.writeFloatLE(value, pos);
      break;
  }
  return;
}

// /**
//  * Get 64 bit unsigned value 0..18446744073709551616
//  *
//  * @export
//  * @param {Buffer} buffer
//  * @param {number} pos
//  * @returns {number}
//  */
// export function GetULIntAt(buffer: Buffer, pos: number): number {
//   let Result: number;
//   Result = buffer[pos]; Result <<= 8;
//   Result |= buffer[pos + 1]; Result <<= 8;
//   Result |= buffer[pos + 2]; Result <<= 8;
//   Result |= buffer[pos + 3];
//   return Result;
// }


// /**
//  * Set 64 bit unsigned value 0..18446744073709551616
//  *
//  * @export
//  * @param {Buffer} buffer
//  * @param {number} pos
//  * @param {number} value
//  * @deprecated
//  */
// export function SetULintAt(buffer: Buffer, pos: number, value: number): void {
//   buffer[pos + 3] = (value & 0xFF);
//   buffer[pos + 2] = ((value >> 8) & 0xFF);
//   buffer[pos + 1] = ((value >> 16) & 0xFF);
//   buffer[pos] = ((value >> 24) & 0xFF);
// }

export function StringParser(buffer: Buffer, format: BufferEncoding = 'utf8'): string {
  let text = new StringDecoder(format).write(buffer);
  // text = text.replace('\0', '').replace(/[^a-z0-9 ,.?!]/ig, '');
  return text;
}