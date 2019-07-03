import { CustomError } from 'ts-custom-error';

// -------------------------------------------------------------------------
// ERROR CODES
// -------------------------------------------------------------------------
export enum codes {
  OK = 0,
  PRIMATIVE_OUT_OF_RANGE = 1001,
  BIGINT_NOT_SUPPORTED = 1002,
}

export function errorCodeToString(code: codes) {
  return codes[code];
}


abstract class InternalCustomError extends CustomError {
  public abstract readonly code: codes;
  public get message() {
    let msg = errorCodeToString(codes.PRIMATIVE_OUT_OF_RANGE);
    if (this.debugMessage) {
      msg += ' ' + this.debugMessage
    }
    return msg;
  }

  constructor(public readonly debugMessage?: string) {
    super();
  }
}

export class OutOfRangeError extends InternalCustomError {
  public readonly code = codes.PRIMATIVE_OUT_OF_RANGE;
}

export class BigIntNotSupportedError extends InternalCustomError {
  public readonly code = codes.BIGINT_NOT_SUPPORTED;
}