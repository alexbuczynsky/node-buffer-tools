import { WordSwap } from "../../src/utils/WordSwap";

describe("WordSwap", () => {
  it("should swap the words in the buffer", () => {

    const byte0 = 0;
    const byte1 = 255;
    const byte2 = 128;
    const byte3 = 4;

    const originalBuffer = Buffer.from(
      new Uint8Array([
        byte0,
        byte1,
        byte2,
        byte3,
      ])
    )

    const originalWord0 = originalBuffer.slice(0, 1);
    const originalWord1 = originalBuffer.slice(2, 3);

    const swappedBuffer = WordSwap(originalBuffer);

    const swappedWord0 = swappedBuffer.slice(0, 1);
    const swappedWord1 = swappedBuffer.slice(2, 3);

    expect(originalWord0).toEqual(swappedWord1)
    expect(originalWord1).toEqual(swappedWord0)
  })
})