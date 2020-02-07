import { UInt16 } from '../../src/primatives/UInt16';
import { OutOfRangeError } from '../../src/errors';


describe('UInt16', function () {
  const VALID_VALUE = 65535;
  const INVALID_VALUES = {
    LOW: -1,
    HIGH: 65536,
  };

  it('should initialize the class', function () {
    const x = new UInt16(VALID_VALUE);
    expect(x).toBeInstanceOf(UInt16);
    expect(x.value).toBe(VALID_VALUE);
  })
  it('should be valid', function () {
    const x = new UInt16(VALID_VALUE);
    expect(x.validate()).toBe(undefined)
  })

  it('should be too high', function () {
    const x = new UInt16(INVALID_VALUES.HIGH);
    let thrownError;
    try {
      x.validate()
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toBeInstanceOf(OutOfRangeError)
  })

  it('should be too low', function () {
    const x = new UInt16(INVALID_VALUES.LOW);
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
      const x = new UInt16();

      let thrownError;
      try {
        x.value = INVALID_VALUES.HIGH;
      } catch (err) {
        thrownError = err;
      }
      expect(thrownError).toBeInstanceOf(OutOfRangeError)
    })

    it('should be too low', function () {
      const x = new UInt16();

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