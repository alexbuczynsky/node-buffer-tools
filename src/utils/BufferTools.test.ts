import {
  GetBitAt,
  SetBitAt,
  BitIndex,
  GetInt8At,
  SetInt8At,
  GetInt16At,
  GetInt32At,
  SetInt16At,
  SetInt32At,
  GetLIntAt_UNSAFE,
  GetInt64_UNSAFE,
  SetLIntAt_UNSAFE,
  SetInt64_UNSAFE,
  GetUInt8At,
  SetUInt8At,
  SetUInt16At,
  GetUInt16At,
  SetUInt32At,
  GetUInt32At,
  GetFloat32At,
  SetFloat32At,
  ToggleBitAt,
} from './BufferTools';

// -------------------------------------------------------------------------
// BITS
// -------------------------------------------------------------------------

describe('GetBitAt', function () {

  const num1 = parseInt("10001001", 2);
  const num2 = parseInt("01110110", 2);

  const testBuffer = Buffer.from(Uint8Array.from([num1, num2]));

  it('should get the correct bits of the first byte', function () {
    expect(GetBitAt(testBuffer, 0, 0)).toBe(true);
    expect(GetBitAt(testBuffer, 0, 1)).toBe(false);
    expect(GetBitAt(testBuffer, 0, 2)).toBe(false);
    expect(GetBitAt(testBuffer, 0, 3)).toBe(true);
    expect(GetBitAt(testBuffer, 0, 4)).toBe(false);
    expect(GetBitAt(testBuffer, 0, 5)).toBe(false);
    expect(GetBitAt(testBuffer, 0, 6)).toBe(false);
    expect(GetBitAt(testBuffer, 0, 7)).toBe(true);
  })

  it('should get the correct bits of the second byte', function () {
    expect(GetBitAt(testBuffer, 1, 0)).toBe(false);
    expect(GetBitAt(testBuffer, 1, 1)).toBe(true);
    expect(GetBitAt(testBuffer, 1, 2)).toBe(true);
    expect(GetBitAt(testBuffer, 1, 3)).toBe(false);
    expect(GetBitAt(testBuffer, 1, 4)).toBe(true);
    expect(GetBitAt(testBuffer, 1, 5)).toBe(true);
    expect(GetBitAt(testBuffer, 1, 6)).toBe(true);
    expect(GetBitAt(testBuffer, 1, 7)).toBe(false);

  })
});

describe('SetBitAt', function () {
  let testBuffer = Buffer.from(Uint8Array.from([
    parseInt("00000000", 2),
    parseInt("11111111", 2),
  ]));

  let targetBit: BitIndex = 0;

  it('should set the first bit of the first byte high', function () {
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    SetBitAt(testBuffer, 0, targetBit, true);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    SetBitAt(testBuffer, 0, targetBit, false);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should set the second bit of the first byte high', function () {
    targetBit = 1;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    SetBitAt(testBuffer, 0, targetBit, true);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    SetBitAt(testBuffer, 0, targetBit, false);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should set the third bit of the first byte high', function () {
    targetBit = 2;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    SetBitAt(testBuffer, 0, targetBit, true);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    SetBitAt(testBuffer, 0, targetBit, false);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should set the fourth bit of the first byte high', function () {
    targetBit = 3;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    SetBitAt(testBuffer, 0, targetBit, true);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    SetBitAt(testBuffer, 0, targetBit, false);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should set the fifth bit of the first byte high', function () {
    targetBit = 4;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    SetBitAt(testBuffer, 0, targetBit, true);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    SetBitAt(testBuffer, 0, targetBit, false);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should set the sixth bit of the first byte high', function () {
    targetBit = 5;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    SetBitAt(testBuffer, 0, targetBit, true);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    SetBitAt(testBuffer, 0, targetBit, false);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should set the seventh bit of the first byte high', function () {
    targetBit = 6;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    SetBitAt(testBuffer, 0, targetBit, true);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    SetBitAt(testBuffer, 0, targetBit, false);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should set the eighth bit of the first byte high', function () {
    targetBit = 7;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    SetBitAt(testBuffer, 0, targetBit, true);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    SetBitAt(testBuffer, 0, targetBit, false);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })
});

describe('ToggleBitAt', function () {
  let testBuffer = Buffer.from(Uint8Array.from([
    parseInt("00000000", 2),
    parseInt("11111111", 2),
  ]));

  let targetBit: BitIndex = 0;

  it('should toggle first bit of the first byte high', function () {
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should toggle second bit of the first byte high', function () {
    targetBit = 1;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should toggle third bit of the first byte high', function () {
    targetBit = 2;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should toggle fourth bit of the first byte high', function () {
    targetBit = 3;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should toggle fifth bit of the first byte high', function () {
    targetBit = 4;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should toggle sixth bit of the first byte high', function () {
    targetBit = 5;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should toggle seventh bit of the first byte high', function () {
    targetBit = 6;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })

  it('should toggle eighth bit of the first byte high', function () {
    targetBit = 7;
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(true);
    ToggleBitAt(testBuffer, 0, targetBit);
    expect(GetBitAt(testBuffer, 0, targetBit)).toBe(false);
  })
});

// -------------------------------------------------------------------------
// 8 Bit Signed Integer Tests
// -------------------------------------------------------------------------

describe('GetSIntAt', function () {

  let testBuffer = Buffer.from(Uint8Array.from([5, 127]));

  it('should read the first and second bytes', function () {
    expect(GetInt8At(testBuffer, 0)).toBe(5);
    expect(GetInt8At(testBuffer, 1)).toBe(127);
  })


})

describe('SetSIntAt', function () {

  let testBuffer = Buffer.from(Uint8Array.from([5, 127]));

  it('should set the first byte', function () {
    expect(GetInt8At(testBuffer, 0)).toBe(5);
    SetInt8At(testBuffer, 0, 10);
    expect(GetInt8At(testBuffer, 0)).toBe(10);
  })

  it('should set the second byte', function () {
    expect(GetInt8At(testBuffer, 1)).toBe(127);
    SetInt8At(testBuffer, 1, -100);
    expect(GetInt8At(testBuffer, 1)).toBe(-100);
  })

})

// -------------------------------------------------------------------------
// 16 Bit Signed Integer Tests
// -------------------------------------------------------------------------

describe('GetIntAt', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0]));

  it('should get the first two bytes', function () {
    expect(GetInt16At(littleEndianBuffer, 0)).toBe(205);
  })

  it('should get the first two bytes as Little Endian', function () {
    expect(GetInt16At(littleEndianBuffer, 0, 'LE')).toBe(205);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 205]));

  it('should get the first two bytes as Big Endian', function () {
    expect(GetInt16At(bigEndianBuffer, 0, 'BE')).toBe(205);
  })
})

describe('SetIntAt', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0]));

  it('should set the value', function () {
    expect(GetInt16At(littleEndianBuffer, 0)).toBe(205);
    SetInt16At(littleEndianBuffer, 0, -3000);
    expect(GetInt16At(littleEndianBuffer, 0)).toBe(-3000);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 205]));

  it('should set the value as Big Endian', function () {
    expect(GetInt16At(bigEndianBuffer, 0, 'BE')).toBe(205);
    SetInt16At(bigEndianBuffer, 0, 5000, 'BE');
    expect(GetInt16At(bigEndianBuffer, 0, 'BE')).toBe(5000);
  })
})

// -------------------------------------------------------------------------
// 32 Bit Signed Integer Tests
// -------------------------------------------------------------------------

describe('GetDIntAt', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0, 0, 0]));

  it('should get the correct value', function () {
    expect(GetInt32At(littleEndianBuffer, 0)).toBe(205);
  })

  it('should get correct value with Little Endian', function () {
    expect(GetInt32At(littleEndianBuffer, 0, 'LE')).toBe(205);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 0, 0, 205]));

  it('should get correct value with Big Endian', function () {
    expect(GetInt32At(bigEndianBuffer, 0, 'BE')).toBe(205);
  })
})

describe('SetDIntAt', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0, 0, 0]));

  it('should set the value', function () {
    expect(GetInt32At(littleEndianBuffer, 0)).toBe(205);
    SetInt32At(littleEndianBuffer, 0, -3000);
    expect(GetInt32At(littleEndianBuffer, 0)).toBe(-3000);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 0, 0, 205]));

  it('should set the value as Big Endian', function () {
    expect(GetInt32At(bigEndianBuffer, 0, 'BE')).toBe(205);
    SetInt32At(bigEndianBuffer, 0, -50001, 'BE');
    expect(GetInt32At(bigEndianBuffer, 0, 'BE')).toBe(-50001);
  })
})

// -------------------------------------------------------------------------
// 64 Bit Signed Integer Tests
// -------------------------------------------------------------------------

describe('GetLIntAt_UNSAFE / GetInt64_UNSAFE', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0, 0, 0, 0, 0, 0, 0]));

  it('should get the correct value', function () {
    expect(GetLIntAt_UNSAFE(littleEndianBuffer, 0)).toBe(205);
    expect(GetInt64_UNSAFE(littleEndianBuffer, 0)).toBe(205);
  })

  it('should get correct value with Little Endian', function () {
    expect(GetLIntAt_UNSAFE(littleEndianBuffer, 0, 'LE')).toBe(205);
    expect(GetInt64_UNSAFE(littleEndianBuffer, 0, 'LE')).toBe(205);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 205]));

  it('should get correct value with Big Endian', function () {
    expect(GetLIntAt_UNSAFE(bigEndianBuffer, 0, 'BE')).toBe(205);
    expect(GetInt64_UNSAFE(bigEndianBuffer, 0, 'BE')).toBe(205);
  })
})


describe('SetLIntAt_UNSAFE / SetInt64_UNSAFE', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0, 0, 0, 0, 0, 0, 0]));

  it('should set the value', function () {
    expect(GetLIntAt_UNSAFE(littleEndianBuffer, 0)).toBe(205);

    SetLIntAt_UNSAFE(littleEndianBuffer, 0, -3000);
    expect(GetLIntAt_UNSAFE(littleEndianBuffer, 0)).toBe(-3000);

    SetInt64_UNSAFE(littleEndianBuffer, 0, -3000);
    expect(GetLIntAt_UNSAFE(littleEndianBuffer, 0)).toBe(-3000);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 205]));

  it('should set the value as Big Endian', function () {
    expect(GetLIntAt_UNSAFE(bigEndianBuffer, 0, 'BE')).toBe(205);

    SetLIntAt_UNSAFE(bigEndianBuffer, 0, -50001, 'BE');
    expect(GetLIntAt_UNSAFE(bigEndianBuffer, 0, 'BE')).toBe(-50001);

    SetInt64_UNSAFE(bigEndianBuffer, 0, -9000000, 'BE');
    expect(GetLIntAt_UNSAFE(bigEndianBuffer, 0, 'BE')).toBe(-9000000);
  })
})

// -------------------------------------------------------------------------
// 8 Bit Unsigned Integer Tests
// -------------------------------------------------------------------------

describe('GetUSIntAt', function () {

  let testBuffer = Buffer.from(Uint8Array.from([5, 127]));

  it('should read the first and second bytes', function () {
    expect(GetUInt8At(testBuffer, 0)).toBe(5);
    expect(GetUInt8At(testBuffer, 1)).toBe(127);
  })


})

describe('SetUSIntAt', function () {

  let testBuffer = Buffer.from(Uint8Array.from([5, 127]));

  it('should set the first byte', function () {
    expect(GetUInt8At(testBuffer, 0)).toBe(5);
    SetUInt8At(testBuffer, 0, 10);
    expect(GetUInt8At(testBuffer, 0)).toBe(10);
  })

  it('should set the second byte', function () {
    expect(GetUInt8At(testBuffer, 1)).toBe(127);
    SetUInt8At(testBuffer, 1, 254);
    expect(GetUInt8At(testBuffer, 1)).toBe(254);
  })

})

// -------------------------------------------------------------------------
// 16 Bit Unsigned Integer Tests
// -------------------------------------------------------------------------

describe('GetUIntAt', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0]));

  it('should get the first two bytes', function () {
    expect(GetUInt16At(littleEndianBuffer, 0)).toBe(205);
  })

  it('should get the first two bytes as Little Endian', function () {
    expect(GetUInt16At(littleEndianBuffer, 0, 'LE')).toBe(205);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 205]));

  it('should get the first two bytes as Big Endian', function () {
    expect(GetUInt16At(bigEndianBuffer, 0, 'BE')).toBe(205);
  })
})

describe('SetUIntAt', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0]));

  it('should set the value', function () {
    expect(GetUInt16At(littleEndianBuffer, 0)).toBe(205);
    SetUInt16At(littleEndianBuffer, 0, 65535);
    expect(GetUInt16At(littleEndianBuffer, 0)).toBe(65535);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 205]));

  it('should set the value as Big Endian', function () {
    expect(GetUInt16At(bigEndianBuffer, 0, 'BE')).toBe(205);
    SetUInt16At(bigEndianBuffer, 0, 65535, 'BE');
    expect(GetUInt16At(bigEndianBuffer, 0, 'BE')).toBe(65535);
  })
})

// -------------------------------------------------------------------------
// 32 Bit Unsigned Integer Tests
// -------------------------------------------------------------------------

describe('GetUDIntAt', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0, 0, 0]));

  it('should get the correct value', function () {
    expect(GetUInt32At(littleEndianBuffer, 0)).toBe(205);
  })

  it('should get correct value with Little Endian', function () {
    expect(GetUInt32At(littleEndianBuffer, 0, 'LE')).toBe(205);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 0, 0, 205]));

  it('should get correct value with Big Endian', function () {
    expect(GetUInt32At(bigEndianBuffer, 0, 'BE')).toBe(205);
  })
})

describe('SetUDIntAt', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([205, 0, 0, 0]));

  it('should set the value', function () {
    expect(GetUInt32At(littleEndianBuffer, 0)).toBe(205);
    SetUInt32At(littleEndianBuffer, 0, 4294967295);
    expect(GetUInt32At(littleEndianBuffer, 0)).toBe(4294967295);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 0, 0, 205]));

  it('should set the value as Big Endian', function () {
    expect(GetUInt32At(bigEndianBuffer, 0, 'BE')).toBe(205);
    SetUInt32At(bigEndianBuffer, 0, 4294967295, 'BE');
    expect(GetUInt32At(bigEndianBuffer, 0, 'BE')).toBe(4294967295);
  })
})

// -------------------------------------------------------------------------
// 32 Bit Float Tests
// -------------------------------------------------------------------------

describe('GetFloatAt', function () {
  let littleEndianBuffer = Buffer.from(new Float32Array([
    1005.40,
    101.4
  ]).buffer);

  it('should get the correct value', function () {
    expect(GetFloat32At(littleEndianBuffer, 0, 3)).toBe(1005.40);
  })

  it('should get correct value with Little Endian', function () {
    expect(GetFloat32At(littleEndianBuffer, 0, 3, 'LE')).toBe(1005.40);
  })

  let bigEndianBuffer = Buffer.from(new Float32Array([
    1005.40,
    101.4
  ]).buffer).swap32();

  it('should get correct value with Big Endian', function () {
    expect(GetFloat32At(bigEndianBuffer, 0, 3, 'BE')).toBe(1005.40);
  })
})

describe('SetFloatAt', function () {

  let littleEndianBuffer = Buffer.from(Uint8Array.from([0, 0, 0, 0]));

  it('should set the value', function () {
    expect(GetFloat32At(littleEndianBuffer, 0)).toBe(0);
    SetFloat32At(littleEndianBuffer, 0, 1004.43);
    expect(GetFloat32At(littleEndianBuffer, 0)).toBe(1004.43);
  })

  let bigEndianBuffer = Buffer.from(Uint8Array.from([0, 0, 0, 0]));

  it('should set the value as Big Endian', function () {
    expect(GetFloat32At(bigEndianBuffer, 0, 3, 'BE')).toBe(0);
    SetFloat32At(bigEndianBuffer, 0, -30001.432, 'BE');
    expect(GetFloat32At(bigEndianBuffer, 0, 3, 'BE')).toBe(-30001.432);
  })
})