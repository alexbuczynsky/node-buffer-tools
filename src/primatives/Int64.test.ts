import { Int64 } from './Int64';
import { OutOfRangeError } from '../errors';


describe('Int64', function () {
  const VALID_VALUE = BigInt(3294967295);

  it('should initialize the class', function () {
    const x = new Int64(VALID_VALUE);
    expect(x).toBeInstanceOf(Int64);
    expect(x.value).toBe(VALID_VALUE);
  })
  it('should be valid', function () {
    const x = new Int64(VALID_VALUE);
    expect(x.validate()).toBe(undefined)
  })
})