import { Int64 } from '../../src/primatives/Int64';
import { OutOfRangeError } from '../../src/errors';
import { IsBigIntSupported } from '../../src/validators';


describe('Int64', function () {


  it('should initialize the class', function () {

    if (IsBigIntSupported()) {
      const VALID_VALUE = BigInt(3294967295);
      const x = new Int64(VALID_VALUE);
      expect(x).toBeInstanceOf(Int64);

      if (IsBigIntSupported()) {
        expect(x.value).toBe(VALID_VALUE);
      }
    }


  })
  it('should be valid', function () {
    if (IsBigIntSupported()) {
      const VALID_VALUE = BigInt(3294967295);
      const x = new Int64(VALID_VALUE);
      expect(x.validate()).toBe(undefined)
    }

  })
})