import { ErrorCode } from "./error-codes";
import { BaseError } from "./base.error";

export class OutOfRangeError extends BaseError {
  public readonly code = ErrorCode.PRIMATIVE_OUT_OF_RANGE;
}
