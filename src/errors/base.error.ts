import { CustomError } from 'ts-custom-error';
import { errorCodeToString, ErrorCode } from "./error-codes";

export abstract class BaseError extends CustomError {
  public abstract readonly code: ErrorCode;
  public get message() {
    let msg = errorCodeToString(ErrorCode.PRIMATIVE_OUT_OF_RANGE);
    if (this.debugMessage) {
      msg += ' ' + this.debugMessage
    }
    return msg;
  }

  constructor(public readonly debugMessage?: string) {
    super();
  }
}