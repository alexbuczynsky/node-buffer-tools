import { BaseError } from "./base.error";
import { ErrorCode } from "./error-codes";

export class BigIntNotSupportedError extends BaseError {
  public readonly code = ErrorCode.BIGINT_NOT_SUPPORTED;
}