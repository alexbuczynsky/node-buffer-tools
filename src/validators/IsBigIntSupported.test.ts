import { IsBigIntSupported } from "./IsBigIntSupported";
import { GetNodeVersion } from "./GetNodeVersion";

describe("IsBigIntSupported", () => {
  it("should check if big int is supported", () => {
    const [major] = GetNodeVersion();

    if (major < 12) {
      expect(IsBigIntSupported()).toBe(false)
    } else {
      expect(IsBigIntSupported()).toBe(true)
    }
  })
})