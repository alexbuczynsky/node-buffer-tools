import { PrimativeNumberBigInt } from './PrimativeNumber';

export class Int64 extends PrimativeNumberBigInt {
  public readonly min = BigInt(-9223372036854775808);
  public readonly max = BigInt(9223372036854775807);

  public createArray(length: number) {
    return new Array<Int64>(length).fill(new Int64());
  }
}