import { Int8 } from '../../src/primatives/Int8';
import { OutOfRangeError } from '../../src/errors';


describe('Int8', function () {
  const VALID_VALUE = -125;
  const INVALID_VALUES = {
    LOW: -129,
    HIGH: 128,
  };

  it('should initialize the class', function () {
    const x = new Int8(VALID_VALUE);
    expect(x).toBeInstanceOf(Int8);
    expect(x.value).toBe(VALID_VALUE);
  })
  it('should be valid', function () {
    const x = new Int8(VALID_VALUE);
    expect(x.validate()).toBe(undefined)
  })

  it('should be too high', function () {
    const x = new Int8(INVALID_VALUES.HIGH);
    let thrownError;
    try {
      x.validate()
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toBeInstanceOf(OutOfRangeError)
  })

  it('should be too low', function () {
    const x = new Int8(INVALID_VALUES.LOW);
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
      const x = new Int8();

      let thrownError;
      try {
        x.value = INVALID_VALUES.HIGH;
      } catch (err) {
        thrownError = err;
      }
      expect(thrownError).toBeInstanceOf(OutOfRangeError)
    })

    it('should be too low', function () {
      const x = new Int8();

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