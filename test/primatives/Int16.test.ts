import { Int16 } from '../../src/primatives/Int16';
import { OutOfRangeError } from '../../src/errors';


describe('Int16', function () {
  const VALID_VALUE = 32767;
  const INVALID_VALUES = {
    LOW: -32769,
    HIGH: 32768,
  };

  it('should initialize the class', function () {
    const x = new Int16(VALID_VALUE);
    expect(x).toBeInstanceOf(Int16);
    expect(x.value).toBe(VALID_VALUE);
  })
  it('should be valid', function () {
    const x = new Int16(VALID_VALUE);
    expect(x.validate()).toBe(undefined)
  })

  it('should be too high', function () {
    const x = new Int16(INVALID_VALUES.HIGH);
    let thrownError;
    try {
      x.validate()
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toBeInstanceOf(OutOfRangeError)
  })

  it('should be too low', function () {
    const x = new Int16(INVALID_VALUES.LOW);
    let thrownError;
    try {
      x.validate()
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toBeInstanceOf(OutOfRangeError)
  })

  describe('Get / Set Value Methods', function () {
    it('should be too high', function () {
      const x = new Int16();

      let thrownError;
      try {
        x.value = INVALID_VALUES.HIGH;
      } catch (err) {
        thrownError = err;
      }
      expect(thrownError).toBeInstanceOf(OutOfRangeError)
    })

    it('should be too low', function () {
      const x = new Int16();

      let thrownError;
      try {
        x.value = INVALID_VALUES.LOW;
      } catch (err) {
        thrownError = err;
      }
      expect(thrownError).toBeInstanceOf(OutOfRangeError)
    })
  })
})