import { GetNodeVersion } from "./GetNodeVersion";


export function IsBigIntSupported() {
  const [major] = GetNodeVersion()
  if (major < 12) { //only supported on node version 12.0.0 or above
    return false;
  } else {
    return true;
  }
}
