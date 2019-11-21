import { StringDecoder } from 'string_decoder';
import { DEFAULT_STRING_ENCODING } from '../../constants';

/**
 * Parses the entire buffer into a string based
 * on the specified encoding.
 *
 * @export
 * @param {Buffer} buffer
 * @param {BufferEncoding} [format=DEFAULT_STRING_ENCODING]
 * @returns {string}
 */
export function StringParser(buffer: Buffer, format: BufferEncoding = DEFAULT_STRING_ENCODING): string {
  let text = new StringDecoder(format).write(buffer);
  // text = text.replace('\0', '').replace(/[^a-z0-9 ,.?!]/ig, '');
  return text;
}