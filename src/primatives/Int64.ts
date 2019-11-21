import { PrimativeNumberBigInt } from './PrimativeNumber';
import { IsBigIntSupported } from '../validators';

export class Int64 extends PrimativeNumberBigInt {
  public readonly min!: bigint;
  public readonly max!: bigint;

  constructor(value?: bigint) {
    super(value);
    if (IsBigIntSupported()) {
      this.min = BigInt(-9223372036854775808);
      this.max = BigInt(9223372036854775807);
    } else {
      console.warn('WARNING: Using Int64 in node versions prior to 12.0.0 can cause rounding errors at large indexes')
      this.min = -9223372036854775808 as unknown as bigint;
      this.max = 9223372036854775807 as unknown as bigint;
    }
  }

  public createArray(length: number) {
    return new Array<Int64>(length).fill(new Int64());
  }
}