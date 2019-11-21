// -------------------------------------------------------------------------
// ERROR CODES
// -------------------------------------------------------------------------
export enum ErrorCode {
  OK = 0,
  PRIMATIVE_OUT_OF_RANGE = 1001,
  BIGINT_NOT_SUPPORTED = 1002,
}

/**
 * Converts an Error Code to a string
 *
 * @export
 * @param {ErrorCode} code
 * @returns
 */
export function errorCodeToString(code: ErrorCode) {
  return ErrorCode[code];
}