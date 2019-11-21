export * from './ValidateBigIntSupported';
import { BigIntNotSupportedError } from "../errors";
import { IsBigIntSupported } from './IsBigIntSupported';

export function ValidateBigIntSupported() {
  if (IsBigIntSupported() === false) {
    throw new BigIntNotSupportedError()
  }
}