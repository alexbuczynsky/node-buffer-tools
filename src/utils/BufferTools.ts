import { StringDecoder } from 'string_decoder';
import { ValidateBigIntSupported } from "./ValidateBigIntSupported";

export type BitIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Little or Big Endian
 */
export type Endian = 'LE' | 'BE';

export type Bit = 0 | 1;

export type Crumb = Bit | 2 | 3;

export type Nibble = Crumb | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

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

function ReverseString(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Gets a binary string representation of the target byte
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {('reversed' | 'normal')} [order='reversed']
 * @returns
 */
export function GetByteBinaryString(buffer: Buffer, pos: number, order: 'reversed' | 'normal' = 'reversed') {
  const byte = GetUInt8At(buffer, pos);
  const string = byte.toString(2)
  const filledString = '00000000'.substr(string.length) + string;

  switch (order) {
    case 'normal':
      return filledString
    default:
      return ReverseString(filledString);
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
 * Gets a binary string representation of the target uint16
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {('reversed' | 'normal')} [order='reversed']
 * @returns
 */
export function GetUInt16BinaryString(buffer: Buffer, pos: number, order: 'reversed' | 'normal' = 'reversed') {
  const word = GetUInt16At(buffer, pos);
  const string = word.toString(2)
  const filledString = '0000000000000000'.substr(string.length) + string;

  switch (order) {
    case 'normal':
      return filledString
    default:
      return ReverseString(filledString);
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

/**
 * Swaps the high and low WORDS (UINT16)
 * 
 * @param {Uint16Array} iData
 * @param {number} regSize
 * @returns
 */
export function WordSwap(buffer: Buffer): Buffer {
  const bufferLength = buffer.length;
  const oldWordArray = new Uint16Array(new Uint8Array(buffer).buffer);
  const newWordArray = new Uint16Array(bufferLength / 2);

  for (let i = 0; i <= oldWordArray.length; i += 2) {
    newWordArray[i] = oldWordArray[i + 1];
    newWordArray[i + 1] = oldWordArray[i];
  }

  return Buffer.from(newWordArray.buffer);
}

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
export function GetBCDAt(buffer: Buffer, pos: number): number {
  return ByteToBCD(GetUInt8At(buffer, pos));
}

/**
 * Set Binary-Coded Decimal value at specific byte
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {number} bcdValue
 */
export function SetBCDAt(buffer: Buffer, pos: number, bcdValue: number): void {
  SetUInt8At(buffer, pos, BCDtoByte(bcdValue));
}

/**
 * Get S7 DateTime from buffer at a starting position
 *
 * @export
 * @param {Buffer} buffer buffer containing the date time
 * @param {number} pos starting position
 * @returns
 */
export function GetS7DateTimeAt(buffer: Buffer, pos: number): Date {

  let year: number = BCDtoByte(buffer[pos]);

  if (year < 90) {
    year += 2000;
  } else {
    year += 1900;
  }

  const month: number = BCDtoByte(buffer[pos + 1]) - 1;
  const day: number = BCDtoByte(buffer[pos + 2]);
  const hour: number = BCDtoByte(buffer[pos + 3]);
  const minute: number = BCDtoByte(buffer[pos + 4]);
  const second: number = BCDtoByte(buffer[pos + 5]);
  const millisecond: number = (BCDtoByte(buffer[pos + 6]) * 10) + (BCDtoByte(buffer[pos + 7]) / 10);

  try {
    return new Date(year, month, day, hour, minute, second, millisecond);
  } catch (error) {
    return new Date(0);
  }
}

/**
 * Set S7 DateTime from buffer at a starting position
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {Date} date
 */
export function SetS7DateTimeAt(buffer: Buffer, pos: number, date: Date): void {
  let year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDay();
  const hour: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();
  const dayOfWeek: number = date.getDay() + 1;
  // MSecH = First two digits of miliseconds 
  const MsecH: number = date.getMilliseconds() / 10;
  // MSecL = Last digit of miliseconds
  const MsecL: number = date.getMilliseconds() % 10;
  if (year > 1999) {
    year -= 2000;
  }

  buffer[pos] = ByteToBCD(year);
  buffer[pos + 1] = ByteToBCD(month);
  buffer[pos + 2] = ByteToBCD(day);
  buffer[pos + 3] = ByteToBCD(hour);
  buffer[pos + 4] = ByteToBCD(minutes);
  buffer[pos + 5] = ByteToBCD(seconds);
  buffer[pos + 6] = ByteToBCD(MsecH);
  buffer[pos + 7] = ByteToBCD(MsecL * 10 + dayOfWeek);
}

export type IPV4Array = [number, number, number, number];

/**
 * Gets an IPV4 IP Address from the buffer at a specific position,
 * and returns it as a number array of length 4.
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {[number, number, number, number]}
 */
export function GetIPV4AddressAt(buffer: Buffer, pos: number): IPV4Array {
  const ipv4Address = buffer.slice(pos, pos + 4);
  return [
    ipv4Address[0],
    ipv4Address[1],
    ipv4Address[2],
    ipv4Address[3],
  ];
}

export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: IPV4Array): void
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: number[]): void
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: Buffer): void
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: ArrayLike<number>): void
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: string): void
/**
 * Sets an IPV4 IP Address in the buffer at a specific position
 *
 * @export
 * @param {Buffer} buffer the buffer to write the ipv4 address to
 * @param {number} pos position to start the write operation
 * @param {(IPV4Array | number[] | Buffer | ArrayLike<number> | string)} ipv4Address ip address
 */
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: IPV4Array | number[] | Buffer | ArrayLike<number> | string): void {
  if (typeof ipv4Address === 'string') {
    ipv4Address = ipv4Address.split('.').map(value => Number(value));
  }

  buffer[pos + 0] = ipv4Address[0];
  buffer[pos + 1] = ipv4Address[1];
  buffer[pos + 2] = ipv4Address[2];
  buffer[pos + 3] = ipv4Address[3];
}

/**
 * Gets an IPV4 IP Address from the buffer at a specific position,
 * and converts it into the format: `${ip1}.${ip2}.${ip3}.${ip4}`
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {string}
 */
export function GetIPV4AddressAsStringAt(buffer: Buffer, pos: number): string {
  return GetIPV4AddressAt(buffer, pos).join('.');
}
