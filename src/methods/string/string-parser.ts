import { StringDecoder } from 'string_decoder';

/**
 * Parses the entire buffer into a string based
 * on the specified encoding.
 *
 * @export
 * @param {Buffer} buffer
 * @param {BufferEncoding} [format='utf8']
 * @returns {string}
 */
export function StringParser(buffer: Buffer, format: BufferEncoding = 'utf8'): string {
  let text = new StringDecoder(format).write(buffer);
  // text = text.replace('\0', '').replace(/[^a-z0-9 ,.?!]/ig, '');
  return text;
}