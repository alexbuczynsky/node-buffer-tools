import { BuffExt } from "./BufferExtended";

describe("BufferExtended", function () {
  it('Should pass Big Endian Tests', function () {

    const referenceBuffer = Buffer.from(Uint8Array.from([
      parseInt("01011010", 2),
      parseInt("10110110", 2),
      0, 0, 0, 0, 0, 0
    ]));

    const buf = new BuffExt(referenceBuffer, 'BE');

    expect(buf.getBitAt(0, 0)).toBe(false);
    expect(buf.getBitAt(0, 1)).toBe(true);
    expect(buf.getBitAt(0, 2)).toBe(true);
    expect(buf.getBitAt(0, 3)).toBe(false);
    expect(buf.getBitAt(0, 4)).toBe(true);

    buf.setBitAt(0, 4, false);
    expect(buf.getBitAt(0, 4)).toBe(false);

    buf.setBitAt(0, 4, true);
    expect(buf.getBitAt(0, 4)).toBe(true);

    expect(buf.getInt16At(2)).toBe(0);
    buf.setInt16At(2, 20000);
    expect(buf.getInt16At(2)).toBe(20000);

    expect(buf.getFloat32At(4)).toBe(0);
    buf.setFloat32At(4, 245.544);
    expect(buf.getFloat32At(4)).toBe(245.544);

  })

  it('Should pass Little Endian Tests', function () {

    const referenceBuffer = Buffer.from(Uint8Array.from([
      parseInt("10110110", 2),
      parseInt("01011010", 2),
      0, 0, 0, 0, 0, 0
    ]));

    const buf = new BuffExt(referenceBuffer, 'LE');

    expect(buf.getBitAt(0, 0)).toBe(false);
    expect(buf.getBitAt(0, 1)).toBe(true);
    expect(buf.getBitAt(0, 2)).toBe(true);
    expect(buf.getBitAt(0, 3)).toBe(false);
    expect(buf.getBitAt(0, 4)).toBe(true);

    buf.setBitAt(0, 4, false);
    expect(buf.getBitAt(0, 4)).toBe(false);

    buf.setBitAt(0, 4, true);
    expect(buf.getBitAt(0, 4)).toBe(true);

    expect(buf.getInt16At(2)).toBe(0);
    buf.setInt16At(2, 20000);
    expect(buf.getInt16At(2)).toBe(20000);

    expect(buf.getFloat32At(4)).toBe(0);
    buf.setFloat32At(4, 245.544);
    expect(buf.getFloat32At(4)).toBe(245.544);

  })
})