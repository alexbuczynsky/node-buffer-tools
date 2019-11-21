import { StringParser } from "./string-parser";
import { DEFAULT_STRING_ENCODING } from "../../constants";

/**
 *
 *
 * @export
 * @param {Buffer} buffer referenced buffer
 * @param {number} pos starting position
 * @param {number} length number of characters in the string
 * @param {BufferEncoding} [format=DEFAULT_STRING_ENCODING]
 * @returns
 */
export function GetStringAt(buffer: Buffer, pos: number, length: number, format: BufferEncoding = DEFAULT_STRING_ENCODING) {
  const start = pos;
  const end = pos + length - 1;

  return StringParser(buffer.slice(start, end), format)
}