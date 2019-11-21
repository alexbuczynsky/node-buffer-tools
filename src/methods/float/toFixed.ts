/**
 * Rounds number to a specific precision
 *
 * @export
 * @param {number} x
 * @param {number} precision
 * @returns {number}
 */
export function toFixed(x: number, precision: number): number {
  return Number(Number.parseFloat(x + '').toFixed(precision));
}