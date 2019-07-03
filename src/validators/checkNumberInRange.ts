import { OutOfRangeError } from '../errors';

export function messageConstructor(num: number | bigint, min: number | bigint, max: number | bigint) {
  return `Number ${num} falls out of range [${min}, ${max}]`;
}

/**
 * Checks if the number is in the range specified
 *
 * @export
 * @throws {OutOfRangeError}
 */
export function checkNumberInRange(num: bigint, min: bigint, max: bigint): void
export function checkNumberInRange(num: number, min: number, max: number): void
export function checkNumberInRange(num: number | bigint, min: number | bigint, max: number | bigint): void {
  const message = messageConstructor(num, min, max);

  if (isInRange(num, min, max)) {
    return;
  } else {
    throw new OutOfRangeError(message);
  }
}

export function isInRange(num: number, min: number, max: number): boolean
export function isInRange(num: bigint, min: bigint, max: bigint): boolean
export function isInRange(num: number | bigint, min: number | bigint, max: number | bigint): boolean
export function isInRange(num: number | bigint, min: number | bigint, max: number | bigint): boolean {
  if (num >= min && num <= max) {
    return true;
  } else {
    return false;
  }
}