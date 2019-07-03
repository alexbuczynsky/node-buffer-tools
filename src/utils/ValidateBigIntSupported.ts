import { IsBigIntSupported } from "./IsBigIntSupported";
import { BigIntNotSupportedError } from "../errors";

export function ValidateBigIntSupported() {
  if (IsBigIntSupported() === false) {
    throw new BigIntNotSupportedError()
  }
}