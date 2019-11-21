import { BuffExt } from "./BuffExt";

const FIRST_BYTE_STRING = "10110110"
const SECOND_BYTE_STRING = "01011010";

const TEST_BYTE_ARRAY = Uint8Array.from([
  parseInt(FIRST_BYTE_STRING, 2),
  parseInt(SECOND_BYTE_STRING, 2),
  0, 0, 0, 0, 0, 0
]);


function runStandardBufferTests(buf: BuffExt) {

  expect(buf.getBitAt(0, 0)).toBe(false);
  expect(buf.getBitAt(0, 1)).toBe(true);
  expect(buf.getBitAt(0, 2)).toBe(true);
  expect(buf.getBitAt(0, 3)).toBe(false);
  expect(buf.getBitAt(0, 4)).toBe(true);

  buf.setBitAt(0, 4, false);
  expect(buf.getBitAt(0, 4)).toBe(false);

  buf.setBitAt(0, 4, true);
  expect(buf.getBitAt(0, 4)).toBe(true);

  expect(buf.getUInt16At(0)).toBe(23222);
  buf.setUInt16At(0, 30000)
  expect(buf.getUInt16At(0)).toBe(30000);

  let binaryData = ['10101110', '00001100']

  switch (buf.endian) {
    case 'BE':

      break;
    case 'LE':
      binaryData = binaryData.reverse();
      break;
  }

  const binaryString = binaryData.join('');

  expect(buf.getUInt16BinaryStringAt(0, 'reversed')).toEqual(binaryString)
  expect(buf.getUInt16BinaryStringAt(0, 'normal')).toEqual(ReverseString(binaryString))
  buf.setUInt16At(0, 23222)
  expect(buf.getUInt16At(0)).toBe(23222);

  expect(buf.getInt16At(2)).toBe(0);
  buf.setInt16At(2, 20000);
  expect(buf.getInt16At(2)).toBe(20000);

  expect(buf.getFloat32At(4)).toBe(0);
  buf.setFloat32At(4, 245.544);
  expect(buf.getFloat32At(4)).toBe(245.544);

  const bitStringArray = buf.toBitStringArray('normal');

  expect(bitStringArray[0]).toEqual(FIRST_BYTE_STRING)
  expect(bitStringArray[1]).toEqual(SECOND_BYTE_STRING)

  const ipv4Address = [192, 168, 1, 145];
  buf.setIPV4AddressAt(0, ipv4Address);
  expect(buf.getIPV4AddressAt(0)).toEqual(ipv4Address)
  expect(buf.getIPV4AddressAsStringAt(0)).toEqual('192.168.1.145')

  const ipv4String = '10.0.0.5';
  buf.setIPV4AddressAt(0, ipv4String);
  expect(buf.getIPV4AddressAsStringAt(0)).toEqual(ipv4String)
  expect(buf.getIPV4AddressAt(0)).toEqual([10, 0, 0, 5])

}


describe("BufferExtended", function () {
  it('Should pass Big Endian Tests', function () {

    const bigEndianBuffer = Buffer.from(TEST_BYTE_ARRAY).swap16();

    const buf = new BuffExt(bigEndianBuffer, 'BE');

    runStandardBufferTests(buf);
  })

  it('Should pass Little Endian Tests', function () {

    const littleEndianBuffer = Buffer.from(TEST_BYTE_ARRAY);

    const buf = new BuffExt(littleEndianBuffer, 'LE');

    runStandardBufferTests(buf);
  })

  it('Should allocate a buffer', () => {
    const bufferSize = 100;
    const buffer = BuffExt.alloc(bufferSize);

    expect(buffer).toBeInstanceOf(BuffExt);
    expect(buffer.byteLength).toEqual(bufferSize)
  })

  it('Should accept an array buffer and create an instance of BuffExt', () => {
    const bufferSize = 100;
    const x = new Uint8Array(bufferSize);

    const buffer = BuffExt.fromArrayBuffer(x.buffer);

    expect(buffer).toBeInstanceOf(BuffExt);
    expect(buffer.byteLength).toEqual(bufferSize)
  })

  it('Should accept a number array and create an instance of BuffExt', () => {

    const buffer = BuffExt.fromNumberArray([0, 255, 1, 4]);

    expect(buffer).toBeInstanceOf(BuffExt);
    expect(buffer.byteLength).toEqual(4)
  })

})