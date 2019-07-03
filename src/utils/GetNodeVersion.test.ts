import { GetNodeVersion } from "./GetNodeVersion";

describe("GetNodeVersion", () => {
  it("should get the current node version", () => {
    const [major, minor, patch] = GetNodeVersion();

    const nodeVersion = `v${major}.${minor}.${patch}`;

    expect(nodeVersion).toEqual(process.version)
  })
})