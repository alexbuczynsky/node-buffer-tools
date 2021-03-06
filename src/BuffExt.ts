import { Endian, BitIndex, BitOrder, DEFAULT_BIT_ORDER, DEFAULT_STRING_ENCODING, NibbleSignificance } from "./constants";

import {
  CloneBuffer,
  WordSwap,
} from "./utils";

import {
  GetBitAt,
  SetBitAt,
  ToggleBitAt,
  GetInt8At,
  SetInt8At,
  GetInt16At,
  SetInt16At,
  GetInt32At,
  SetInt32At,
  GetInt64_UNSAFE,
  SetInt64_UNSAFE,
  GetUInt8At,
  GetByteBinaryString,
  SetUInt8At,
  GetUInt16At,
  GetUInt16BinaryString,
  SetUInt16At,
  GetUInt32At,
  SetUInt32At,
  GetFloat32At,
  SetFloat32At,
  GetFloat64At,
  SetFloat64At,
  GetNibbleAt,
  SetNibbleAt,
  GetStringAt,
  GetBCDAt,
  SetBCDAt,
  GetS7DateTimeAt,
  SetS7DateTimeAt,
  IPV4Array,
  GetIPV4AddressAt,
  GetIPV4AddressAsStringAt,
  SetIPV4AddressAt,
} from "./methods";

import { BufferToBitStringArray } from "./adapters";

/**
 * Extended Buffer Class
 *
 * @export
 * @class BuffExt
 */
export class BuffExt {

  /**
   * Creates an instance of BuffExt and
   * allocates a new buffer of {size} octets.
   *
   * @static
   * @param {number} size
   * @param {Endian} [endian]
   * @returns
   * @memberof BuffExt
   */
  static alloc(size: number, fill?: string | number | Buffer, endian?: Endian) {
    return new BuffExt(Buffer.alloc(size, fill), endian);
  }

  /**
   * When passed a reference to the .buffer property of a TypedArray instance,
   * the newly created Buffer will share the same allocated memory as the TypedArray.
   * The optional {byteOffset} and {length} arguments specify a memory range
   * within the {arrayBuffer} that will be shared by the Buffer.
   *
   * @param arrayBuffer The .buffer property of any TypedArray or a new ArrayBuffer()
   */
  static fromArrayBuffer(arrayBuffer: ArrayBuffer | SharedArrayBuffer, byteOffset?: number, length?: number, endian?: Endian): BuffExt {
    return new BuffExt(Buffer.from(arrayBuffer, byteOffset, length), endian);
  };

  /**
   * Creates a new Buffer using the passed {data}
   * @param data data to create a new Buffer
   */
  static fromNumberArray(data: number[], endian?: Endian): BuffExt {
    return new BuffExt(Buffer.from(data), endian);
  };

  static fromUint8Array(data: Uint8Array, endian?: Endian): BuffExt {
    return new BuffExt(Buffer.from(data), endian);
  };

  /**
   * Creates a new Buffer containing the given JavaScript string {str}.
   * If provided, the {encoding} parameter identifies the character encoding.
   * If not provided, {encoding} defaults to 'utf8'.
   */
  static fromString(str: string, encoding?: BufferEncoding, endian?: Endian): BuffExt {
    return new BuffExt(Buffer.from(str, encoding))
  };

  /**
   * Creates an instance of BuffExt.
   * @param {Buffer} buffer
   * @param {Endian} [endian='LE'] little or big endian
   * @memberof BuffExt
   */
  constructor(public buffer: Buffer, public endian: Endian = 'LE') { }

  /**
   * Returns a new BuffExt class with
   * a completely new buffer that has
   * no reference to the original
   * buffer.
   *
   * @returns {BuffExt}
   * @memberof BuffExt
   */
  public clone(): BuffExt {
    const clonedBuffer = CloneBuffer(this.buffer);
    return new BuffExt(clonedBuffer, this.endian);
  }

  public swap64() {
    return this.buffer.swap64();
  }

  public swap16() {
    return this.buffer.swap16();
  }
  public swap32() {
    return this.buffer.swap32();
  }

  /**
   * Swaps the high and low WORDS (UINT16)
   * 
   * @example [1, 2, 3, 4] => [2, 1, 4, 3]
   *
   * @memberof BuffExt
   */
  public swapWords() {
    return this.buffer = WordSwap(this.buffer);
  }

  /**
   * The length of bytes of the array
   *
   * @readonly
   * @memberof BuffExt
   */
  public get byteLength() {
    return this.buffer.byteLength
  }

  /**
   * Get the bit at pos.bit
   *
   * @param {number} pos
   * @param {BitIndex} bit
   * @returns {boolean}
   * @memberof BuffExt
   */
  public getBitAt(pos: number, bit: BitIndex): boolean {
    return GetBitAt(this.buffer, pos, bit, this.endian)
  }

  /**
   * Set the bit at pos.bit
   *
   * @param {number} pos
   * @param {BitIndex} bit
   * @param {boolean} value
   * @returns {void}
   * @memberof BuffExt
   */
  public setBitAt(pos: number, bit: BitIndex, value: boolean): void {
    return SetBitAt(this.buffer, pos, bit, value, this.endian)
  }

  /**
   * Toggles the bit at pos.bit
   *
   * @param {number} pos
   * @param {BitIndex} bit
   * @returns {void}
   * @memberof BuffExt
   */
  public toggleBitAt(pos: number, bit: BitIndex): void {
    return ToggleBitAt(this.buffer, pos, bit);
  }

  /**
   * Gets a nibble at a specific byte in the buffer
   *
   * @param {number} pos
   * @param {NibbleSignificance} significance
   * @returns {number}
   * @memberof BuffExt
   */
  public getNibbleAt(pos: number, significance: NibbleSignificance): number {
    return GetNibbleAt(this.buffer, pos, significance, this.endian)
  }

  /**
   * Sets a nibble at a specific byte in the buffer
   *
   * @param {number} pos
   * @param {NibbleSignificance} significance
   * @param {number} nibbleValue
   * @memberof BuffExt
   */
  public setNibbleAt(pos: number, significance: NibbleSignificance, nibbleValue: number): void {
    SetNibbleAt(this.buffer, pos, significance, nibbleValue, this.endian)
  }


  /**
   * Get 8 bit signed value -128..127
   *
   * @param {number} pos
   * @returns
   * @memberof BuffExt
   */
  public getSIntAt(pos: number, ) {
    return GetInt8At(this.buffer, pos)
  }

  /**
   * Set 8 bit signed value -128..127
   *
   * @param {number} pos
   * @param {number} value
   * @returns
   * @memberof BuffExt
   */
  public setInt8At(pos: number, value: number) {
    return SetInt8At(this.buffer, pos, value)
  }

  /**
   * Get 16 bit signed value -32768..32767
   *
   * @param {number} pos
   * @returns
   * @memberof BuffExt
   */
  public getInt16At(pos: number) {
    return GetInt16At(this.buffer, pos, this.endian)
  }

  /**
   * Set 16 bit signed value -32768..32767
   *
   * @param {number} pos
   * @param {number} value
   * @returns
   * @memberof BuffExt
   */
  public setInt16At(pos: number, value: number) {
    return SetInt16At(this.buffer, pos, value, this.endian)
  }

  /**
   * Get 32 bit signed value -2147483648..2147483647
   *
   * @param {number} pos
   * @returns
   * @memberof BuffExt
   */
  public getInt32At(pos: number) {
    return GetInt32At(this.buffer, pos, this.endian)
  }

  /**
   * Set 32 bit signed value -2147483648..2147483647
   *
   * @param {number} pos
   * @param {number} value
   * @returns
   * @memberof BuffExt
   */
  public setInt32At(pos: number, value: number) {
    return SetInt32At(this.buffer, pos, value, this.endian)
  }

  /**
   *
   *
   * @param {number} pos
   * @returns
   * @memberof BuffExt
   */
  public getInt64_UNSAFE(pos: number) {
    return GetInt64_UNSAFE(this.buffer, pos, this.endian)
  }

  /**
   *
   *
   * @param {number} pos
   * @param {number} value
   * @returns
   * @memberof BuffExt
   */
  public setInt64_UNSAFE(pos: number, value: number) {
    return SetInt64_UNSAFE(this.buffer, pos, value, this.endian)
  }

  /**
   * Get 8 bit unsigned value 0..255
   *
   * @param {number} pos
   * @returns
   * @memberof BuffExt
   */
  public getUInt8At(pos: number) {
    return GetUInt8At(this.buffer, pos, this.endian)
  }

  /**
   * Gets a binary string representation of the target byte
   *
   * @param {number} pos
   * @param {(BitOrder)} [order=DEFAULT_BIT_ORDER]
   * @returns
   * @memberof BuffExt
   */
  public getByteBinaryStringAt(pos: number, order: BitOrder = DEFAULT_BIT_ORDER) {
    return GetByteBinaryString(this.buffer, pos, order);
  }

  /**
   * Set 8 bit unsigned value 0..255
   *
   * @param {number} pos
   * @param {number} value
   * @returns
   * @memberof BuffExt
   */
  public setUInt8At(pos: number, value: number) {
    return SetUInt8At(this.buffer, pos, value, this.endian)
  }

  /**
   * Get 16 bit unsigned value 0..65535
   *
   * @param {number} pos
   * @returns
   * @memberof BuffExt
   */
  public getUInt16At(pos: number) {
    return GetUInt16At(this.buffer, pos, this.endian)
  }

  /**
   * Gets a binary string representation of the target byte
   *
   * @param {number} pos
   * @param {(BitOrder)} [order=DEFAULT_BIT_ORDER]
   * @returns
   * @memberof BuffExt
   */
  public getUInt16BinaryStringAt(pos: number, order: BitOrder = DEFAULT_BIT_ORDER) {
    return GetUInt16BinaryString(this.buffer, pos, order);
  }

  /**
   * Set 16 bit unsigned value 0..65535
   *
   * @param {number} pos
   * @param {number} value
   * @returns
   * @memberof BuffExt
   */
  public setUInt16At(pos: number, value: number) {
    return SetUInt16At(this.buffer, pos, value, this.endian)
  }

  /**
   * Get 32 bit unsigned value 0..4294967296
   *
   * @param {number} pos
   * @returns
   * @memberof BuffExt
   */
  public getUInt32At(pos: number) {
    return GetUInt32At(this.buffer, pos, this.endian)
  }

  /**
   * Set 32 bit unsigned value 0..4294967295
   *
   * @param {number} pos
   * @param {number} value
   * @returns
   * @memberof BuffExt
   */
  public setUInt32At(pos: number, value: number) {
    return SetUInt32At(this.buffer, pos, value, this.endian)
  }
  /**
   * Get 32 bit float value
   *
   * @param {number} pos
   * @param {number} [precision=3]
   * @returns
   * @memberof BuffExt
   */
  public getFloat32At(pos: number, precision: number = 3) {
    return GetFloat32At(this.buffer, pos, precision, this.endian)
  }

  /**
   * Set 32 bit float value
   *
   * @param {number} pos
   * @param {number} value
   * @returns
   * @memberof BuffExt
   */
  public setFloat32At(pos: number, value: number) {
    return SetFloat32At(this.buffer, pos, value, this.endian)
  }

  /**
   * Get 32 bit float value
   *
   * @param {number} pos
   * @param {number} [precision=3]
   * @returns
   * @memberof BuffExt
   */
  public getFloat64At(pos: number, precision: number = 3) {
    return GetFloat64At(this.buffer, pos, precision, this.endian)
  }

  /**
   * Set 32 bit float value
   *
   * @param {number} pos
   * @param {number} value
   * @returns
   * @memberof BuffExt
   */
  public setFloat64At(pos: number, value: number) {
    return SetFloat64At(this.buffer, pos, value, this.endian)
  }

  /**
   * Get String of specific length from the current buffer
   *
   * @param {number} pos starting position
   * @param {number} length number of characters in the string
   * @param {BufferEncoding} [format=DEFAULT_STRING_ENCODING]
   * @memberof BuffExt
   */
  public getStringAt(pos: number, length: number, format: BufferEncoding = DEFAULT_STRING_ENCODING) {
    return GetStringAt(this.buffer, pos, length, format)
  }

  /**
   * Get Binary-Coded Decimal value at specific byte
   *
   * @param {number} pos
   * @returns {number}
   * @memberof BuffExt
   */
  public getBCDAt(pos: number): number {
    return GetBCDAt(this.buffer, pos);
  }

  /**
   * Set Binary-Coded Decimal value at specific byte
   *
   * @param {number} pos
   * @returns {number}
   * @memberof BuffExt
   */
  public setBCDAt(pos: number, bcdValue: number): void {
    return SetBCDAt(this.buffer, pos, bcdValue);
  }

  /**
   * Get S7 DateTime from buffer at a starting position
   *
   * @param {number} pos starting byte in buffer
   * @returns {Date}
   * @memberof BuffExt
   */
  public getS7DateTimeAt(pos: number): Date {
    return GetS7DateTimeAt(this.buffer, pos);
  }

  /**
   * Set S7 DateTime from buffer at a starting position
   *
   * @param {number} pos starting byte in buffer
   * @param {Date} date date to write into the buffer
   * @returns {void}
   * @memberof BuffExt
   */
  public setS7DateTimeAt(pos: number, date: Date): void {
    return SetS7DateTimeAt(this.buffer, pos, date);
  }

  /**
   * Gets an IPV4 IP Address from the buffer at a specific position,
   * and returns it as a number array of length 4.
   * @param {number} pos
   * @returns {IPV4Array}
   * @memberof BuffExt
   */
  public getIPV4AddressAt(pos: number): IPV4Array {
    return GetIPV4AddressAt(this.buffer, pos);
  }

  /**
   *Gets an IPV4 IP Address from the buffer at a specific position,
   * and converts it into the format: `${ip1}.${ip2}.${ip3}.${ip4}`
   * @param {number} pos
   * @returns {string}
   * @memberof BuffExt
   */
  public getIPV4AddressAsStringAt(pos: number): string {
    return GetIPV4AddressAsStringAt(this.buffer, pos);
  }


  public setIPV4AddressAt(pos: number, ipv4Address: IPV4Array): void
  public setIPV4AddressAt(pos: number, ipv4Address: number[]): void
  public setIPV4AddressAt(pos: number, ipv4Address: Buffer): void
  public setIPV4AddressAt(pos: number, ipv4Address: ArrayLike<number>): void
  public setIPV4AddressAt(pos: number, ipv4Address: string): void
  /**
   * Sets an IPV4 IP Address in the buffer at a specific position
   *
   * @param {number} pos
   * @param {(IPV4Array | number[] | Buffer | ArrayLike<number> | string)} ipv4Address
   * @returns {void}
   * @memberof BuffExt
   */
  public setIPV4AddressAt(pos: number, ipv4Address: IPV4Array | number[] | Buffer | ArrayLike<number> | string): void {
    return SetIPV4AddressAt(this.buffer, pos, ipv4Address as any);
  }

  /**
   *
   *
   * @returns
   * @memberof BuffExt
   */
  public toInt8Array() {
    return new Int8Array(this.buffer);
  }

  /**
   *
   *
   * @returns
   * @memberof BuffExt
   */
  public toUint8Array() {
    return new Uint8Array(this.buffer);
  }

  /**
   *
   *
   * @returns
   * @memberof BuffExt
   */
  public toUint8ClampedArray() {
    return new Uint8ClampedArray(this.buffer);
  }

  /**
   *
   *
   * @returns
   * @memberof BuffExt
   */
  public toInt16Array() {
    return new Int16Array(this.buffer);
  }

  /**
   *
   *
   * @returns
   * @memberof BuffExt
   */
  public toUint16Array() {
    return new Uint16Array(this.buffer);
  }

  /**
   *
   *
   * @returns
   * @memberof BuffExt
   */
  public toInt32Array() {
    return new Int32Array(this.buffer);
  }

  /**
   *
   *
   * @returns
   * @memberof BuffExt
   */
  public toUint32Array() {
    return new Uint32Array(this.buffer);
  }

  /**
   *
   *
   * @returns
   * @memberof BuffExt
   */
  public toFloat32Array() {
    return new Float32Array(this.buffer);
  }

  /**
   *
   *
   * @returns
   * @memberof BuffExt
   */
  public toFloat64Array() {
    return new Float64Array(this.buffer);
  }

  /**
   * Converts a buffer to a string array
   * where each string is 8 characters of
   * either a 1 or a 0.
   *
   * @param {BitOrder} [order=DEFAULT_BIT_ORDER]
   * @returns
   * @memberof BuffExt
   */
  public toBitStringArray(order: BitOrder = DEFAULT_BIT_ORDER) {
    return BufferToBitStringArray(this.buffer, this.endian, order)
  }

}