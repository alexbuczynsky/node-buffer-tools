import { CloneBuffer } from "./CloneBuffer";

describe("CloneBuffer", () => {
  it("should create a new buffer allocation in memory", () => {
    const originalBuffer = Buffer.from(
      new Uint8Array([0, 255, 128, 4])
    )

    const referencedBuffer = originalBuffer;
    const clonedBuffer = CloneBuffer(originalBuffer);

    originalBuffer[0] = 10;


    expect(referencedBuffer[0]).toEqual(originalBuffer[0])
    expect(clonedBuffer).not.toEqual(clonedBuffer[0])
  })
})