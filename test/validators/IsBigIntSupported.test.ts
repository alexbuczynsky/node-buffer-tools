import { IsBigIntSupported } from "../../src/validators/IsBigIntSupported";
import { GetNodeVersion } from "../../src/validators/GetNodeVersion";

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