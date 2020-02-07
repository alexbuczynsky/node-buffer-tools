import {
  ErrorCode,
  errorCodeToString,
  OutOfRangeError,
} from '../../src/errors';

describe('Error Tests', function () {
  it('OutOfRangeError', function () {
    const e = new OutOfRangeError();
    expect(e.code).toBe(ErrorCode.PRIMATIVE_OUT_OF_RANGE)
    expect(e.message).toBe(errorCodeToString(e.code))
    expect(e.debugMessage).toBe(undefined);
  })
})