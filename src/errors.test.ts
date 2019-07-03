import {
  codes,
  errorCodeToString,
  OutOfRangeError,
} from './errors';

describe('Error Tests', function () {
  it('OutOfRangeError', function () {
    const e = new OutOfRangeError();
    expect(e.code).toBe(codes.PRIMATIVE_OUT_OF_RANGE)
    expect(e.message).toBe(errorCodeToString(e.code))
    expect(e.debugMessage).toBe(undefined);
  })
})