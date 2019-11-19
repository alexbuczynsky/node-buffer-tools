import { ReverseString } from "./ReverseString";

export type BitOrder = 'reversed' | 'normal'

export const DEFAULT_BIT_ORDER: BitOrder = 'reversed';

/**
 * Converts a byte to a string with 8
 * characters of 0 or 1
 *
 * @export
 * @param {number} byte
 * @returns {string}
 */
export function ByteToBitString(byte: number, order: BitOrder = DEFAULT_BIT_ORDER): string {
  const string = byte.toString(2)

  if (byte > 255) {
    throw new Error(`InvalidByte: ${byte} > 255`)
  }

  const filledString = '00000000'.substr(string.length) + string;

  switch (order) {
    case 'normal':
      return filledString
    default:
      return ReverseString(filledString);
  }
}