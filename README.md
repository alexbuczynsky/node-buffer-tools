# Node Buffer Tools

[![Build Status](https://travis-ci.org/alexbuczynsky/node-buffer-tools.png)](https://travis-ci.org/alexbuczynsky/node-buffer-tools)
[![npm version](https://badge.fury.io/js/ts-buffer-tools.svg)](https://badge.fury.io/js/ts-buffer-tools)

A set of tools to assist with handling nodejs buffers.

## Buffer Extended Class
```ts
/**
 * Extended Buffer Class
 *
 * @export
 * @class BuffExt
 */
export declare class BuffExt {
    buffer: Buffer;
    endian: Endian;
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
    static alloc(size: number, fill?: string | number | Buffer, endian?: Endian): BuffExt;
    /**
     * When passed a reference to the .buffer property of a TypedArray instance,
     * the newly created Buffer will share the same allocated memory as the TypedArray.
     * The optional {byteOffset} and {length} arguments specify a memory range
     * within the {arrayBuffer} that will be shared by the Buffer.
     *
     * @param arrayBuffer The .buffer property of any TypedArray or a new ArrayBuffer()
     */
    static fromArrayBuffer(arrayBuffer: ArrayBuffer | SharedArrayBuffer, byteOffset?: number, length?: number, endian?: Endian): BuffExt;
    /**
     * Creates a new Buffer using the passed {data}
     * @param data data to create a new Buffer
     */
    static fromNumberArray(data: number[], endian?: Endian): BuffExt;
    static fromUint8Array(data: Uint8Array, endian?: Endian): BuffExt;
    /**
     * Creates a new Buffer containing the given JavaScript string {str}.
     * If provided, the {encoding} parameter identifies the character encoding.
     * If not provided, {encoding} defaults to 'utf8'.
     */
    static fromString(str: string, encoding?: BufferEncoding, endian?: Endian): BuffExt;
    /**
     * Creates an instance of BuffExt.
     * @param {Buffer} buffer
     * @param {Endian} [endian='LE'] little or big endian
     * @memberof BuffExt
     */
    constructor(buffer: Buffer, endian?: Endian);
    /**
     * Returns a new BuffExt class with
     * a completely new buffer that has
     * no reference to the original
     * buffer.
     *
     * @returns {BuffExt}
     * @memberof BuffExt
     */
    clone(): BuffExt;
    swap64(): Buffer;
    swap16(): Buffer;
    swap32(): Buffer;
    /**
     * Swaps the high and low WORDS (UINT16)
     *
     * @example [1, 2, 3, 4] => [2, 1, 4, 3]
     *
     * @memberof BuffExt
     */
    swapWords(): Buffer;
    /**
     * The length of bytes of the array
     *
     * @readonly
     * @memberof BuffExt
     */
    get byteLength(): number;
    /**
     * Get the bit at pos.bit
     *
     * @param {number} pos
     * @param {BitIndex} bit
     * @returns {boolean}
     * @memberof BuffExt
     */
    getBitAt(pos: number, bit: BitIndex): boolean;
    /**
     * Set the bit at pos.bit
     *
     * @param {number} pos
     * @param {BitIndex} bit
     * @param {boolean} value
     * @returns {void}
     * @memberof BuffExt
     */
    setBitAt(pos: number, bit: BitIndex, value: boolean): void;
    /**
     * Toggles the bit at pos.bit
     *
     * @param {number} pos
     * @param {BitIndex} bit
     * @returns {void}
     * @memberof BuffExt
     */
    toggleBitAt(pos: number, bit: BitIndex): void;
    /**
     * Gets a nibble at a specific byte in the buffer
     *
     * @param {number} pos
     * @param {NibbleSignificance} significance
     * @returns {number}
     * @memberof BuffExt
     */
    getNibbleAt(pos: number, significance: NibbleSignificance): number;
    /**
     * Sets a nibble at a specific byte in the buffer
     *
     * @param {number} pos
     * @param {NibbleSignificance} significance
     * @param {number} nibbleValue
     * @memberof BuffExt
     */
    setNibbleAt(pos: number, significance: NibbleSignificance, nibbleValue: number): void;
    /**
     * Get 8 bit signed value -128..127
     *
     * @param {number} pos
     * @returns
     * @memberof BuffExt
     */
    getSIntAt(pos: number): number;
    /**
     * Set 8 bit signed value -128..127
     *
     * @param {number} pos
     * @param {number} value
     * @returns
     * @memberof BuffExt
     */
    setInt8At(pos: number, value: number): void;
    /**
     * Get 16 bit signed value -32768..32767
     *
     * @param {number} pos
     * @returns
     * @memberof BuffExt
     */
    getInt16At(pos: number): number;
    /**
     * Set 16 bit signed value -32768..32767
     *
     * @param {number} pos
     * @param {number} value
     * @returns
     * @memberof BuffExt
     */
    setInt16At(pos: number, value: number): void;
    /**
     * Get 32 bit signed value -2147483648..2147483647
     *
     * @param {number} pos
     * @returns
     * @memberof BuffExt
     */
    getInt32At(pos: number): number;
    /**
     * Set 32 bit signed value -2147483648..2147483647
     *
     * @param {number} pos
     * @param {number} value
     * @returns
     * @memberof BuffExt
     */
    setInt32At(pos: number, value: number): void;
    /**
     *
     *
     * @param {number} pos
     * @returns
     * @memberof BuffExt
     */
    getInt64_UNSAFE(pos: number): number;
    /**
     *
     *
     * @param {number} pos
     * @param {number} value
     * @returns
     * @memberof BuffExt
     */
    setInt64_UNSAFE(pos: number, value: number): void;
    /**
     * Get 8 bit unsigned value 0..255
     *
     * @param {number} pos
     * @returns
     * @memberof BuffExt
     */
    getUInt8At(pos: number): number;
    /**
     * Gets a binary string representation of the target byte
     *
     * @param {number} pos
     * @param {(BitOrder)} [order=DEFAULT_BIT_ORDER]
     * @returns
     * @memberof BuffExt
     */
    getByteBinaryStringAt(pos: number, order?: BitOrder): string;
    /**
     * Set 8 bit unsigned value 0..255
     *
     * @param {number} pos
     * @param {number} value
     * @returns
     * @memberof BuffExt
     */
    setUInt8At(pos: number, value: number): void;
    /**
     * Get 16 bit unsigned value 0..65535
     *
     * @param {number} pos
     * @returns
     * @memberof BuffExt
     */
    getUInt16At(pos: number): number;
    /**
     * Gets a binary string representation of the target byte
     *
     * @param {number} pos
     * @param {(BitOrder)} [order=DEFAULT_BIT_ORDER]
     * @returns
     * @memberof BuffExt
     */
    getUInt16BinaryStringAt(pos: number, order?: BitOrder): string;
    /**
     * Set 16 bit unsigned value 0..65535
     *
     * @param {number} pos
     * @param {number} value
     * @returns
     * @memberof BuffExt
     */
    setUInt16At(pos: number, value: number): void;
    /**
     * Get 32 bit unsigned value 0..4294967296
     *
     * @param {number} pos
     * @returns
     * @memberof BuffExt
     */
    getUInt32At(pos: number): number;
    /**
     * Set 32 bit unsigned value 0..4294967295
     *
     * @param {number} pos
     * @param {number} value
     * @returns
     * @memberof BuffExt
     */
    setUInt32At(pos: number, value: number): void;
    /**
     * Get 32 bit float value
     *
     * @param {number} pos
     * @param {number} [precision=3]
     * @returns
     * @memberof BuffExt
     */
    getFloat32At(pos: number, precision?: number): number;
    /**
     * Set 32 bit float value
     *
     * @param {number} pos
     * @param {number} value
     * @returns
     * @memberof BuffExt
     */
    setFloat32At(pos: number, value: number): void;
    /**
     * Get 32 bit float value
     *
     * @param {number} pos
     * @param {number} [precision=3]
     * @returns
     * @memberof BuffExt
     */
    getFloat64At(pos: number, precision?: number): number;
    /**
     * Set 32 bit float value
     *
     * @param {number} pos
     * @param {number} value
     * @returns
     * @memberof BuffExt
     */
    setFloat64At(pos: number, value: number): void;
    /**
     * Get String of specific length from the current buffer
     *
     * @param {number} pos starting position
     * @param {number} length number of characters in the string
     * @param {BufferEncoding} [format=DEFAULT_STRING_ENCODING]
     * @memberof BuffExt
     */
    getStringAt(pos: number, length: number, format?: BufferEncoding): string;
    /**
     * Get Binary-Coded Decimal value at specific byte
     *
     * @param {number} pos
     * @returns {number}
     * @memberof BuffExt
     */
    getBCDAt(pos: number): number;
    /**
     * Set Binary-Coded Decimal value at specific byte
     *
     * @param {number} pos
     * @returns {number}
     * @memberof BuffExt
     */
    setBCDAt(pos: number, bcdValue: number): void;
    /**
     * Get S7 DateTime from buffer at a starting position
     *
     * @param {number} pos starting byte in buffer
     * @returns {Date}
     * @memberof BuffExt
     */
    getS7DateTimeAt(pos: number): Date;
    /**
     * Set S7 DateTime from buffer at a starting position
     *
     * @param {number} pos starting byte in buffer
     * @param {Date} date date to write into the buffer
     * @returns {void}
     * @memberof BuffExt
     */
    setS7DateTimeAt(pos: number, date: Date): void;
    /**
     * Gets an IPV4 IP Address from the buffer at a specific position,
     * and returns it as a number array of length 4.
     * @param {number} pos
     * @returns {IPV4Array}
     * @memberof BuffExt
     */
    getIPV4AddressAt(pos: number): IPV4Array;
    /**
     *Gets an IPV4 IP Address from the buffer at a specific position,
     * and converts it into the format: `${ip1}.${ip2}.${ip3}.${ip4}`
     * @param {number} pos
     * @returns {string}
     * @memberof BuffExt
     */
    getIPV4AddressAsStringAt(pos: number): string;
    setIPV4AddressAt(pos: number, ipv4Address: IPV4Array): void;
    setIPV4AddressAt(pos: number, ipv4Address: number[]): void;
    setIPV4AddressAt(pos: number, ipv4Address: Buffer): void;
    setIPV4AddressAt(pos: number, ipv4Address: ArrayLike<number>): void;
    setIPV4AddressAt(pos: number, ipv4Address: string): void;
    /**
     *
     *
     * @returns
     * @memberof BuffExt
     */
    toInt8Array(): Int8Array;
    /**
     *
     *
     * @returns
     * @memberof BuffExt
     */
    toUint8Array(): Uint8Array;
    /**
     *
     *
     * @returns
     * @memberof BuffExt
     */
    toUint8ClampedArray(): Uint8ClampedArray;
    /**
     *
     *
     * @returns
     * @memberof BuffExt
     */
    toInt16Array(): Int16Array;
    /**
     *
     *
     * @returns
     * @memberof BuffExt
     */
    toUint16Array(): Uint16Array;
    /**
     *
     *
     * @returns
     * @memberof BuffExt
     */
    toInt32Array(): Int32Array;
    /**
     *
     *
     * @returns
     * @memberof BuffExt
     */
    toUint32Array(): Uint32Array;
    /**
     *
     *
     * @returns
     * @memberof BuffExt
     */
    toFloat32Array(): Float32Array;
    /**
     *
     *
     * @returns
     * @memberof BuffExt
     */
    toFloat64Array(): Float64Array;
    /**
     * Converts a buffer to a string array
     * where each string is 8 characters of
     * either a 1 or a 0.
     *
     * @param {BitOrder} [order=DEFAULT_BIT_ORDER]
     * @returns
     * @memberof BuffExt
     */
    toBitStringArray(order?: BitOrder): string[];
}
```


Example:
```ts
import { BuffExt } from 'ts-buffer-tools'

const endian = 'LE'

const basicBuffer = Buffer.alloc(4)

const smartBuffer = new BuffExt(basicBuffer, endian)

console.log(smartBuffer.getIPV4AddressAt(0)) // [0,0,0,0]

smartBuffer.setIPV4AddressAt(0, [192, 168, 1, 145]);

console.log(smartBuffer.getIPV4AddressAt(0)) // [192, 168, 1, 145]

console.log(smartBuffer.getIPV4AddressAsStringAt(0)) // '192.168.1.145'

```

## Supported Functions
- **Bit**
  - GetBitAt
  - SetBitAt
  - ToggleBitAt
- **Nibble**
  - GetNibbleAt
  - SetNibbleAt
- **Int8**
  - GetInt8At
  - SetInt8At
- **UInt8**
  - GetUInt8At
  - SetUInt8At
  - GetByteBinaryString
- **Int16**
  - GetInt16At
  - SetInt16At
- **UInt16**
  - GetUInt16At
  - GetUInt16BinaryString
  - SetUInt16At
- **Int32**
  - GetInt32At
  - SetInt32At
- **UInt32**
  - GetUInt32At
  - SetUInt32At
- **UInt64** (full support requires node v12+)
  - GetInt64_UNSAFE
  - SetInt64_UNSAFE
- **Float32**
  - GetFloat32At
  - SetFloat32At
- **Float64**
  - GetFloat64At
  - SetFloat64At
- **Binary Encoded Decimal**
  - GetBCDAt
  - SetBCDAt
- **Miscellaneous**
  - GetStringAt
  - GetS7DateTimeAt
  - SetS7DateTimeAt
  - IPV4Array
  - GetIPV4AddressAt
  - GetIPV4AddressAsStringAt
  - SetIPV4AddressAt

