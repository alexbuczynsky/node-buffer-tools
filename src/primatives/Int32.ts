import { PrimativeNumber } from './PrimativeNumber';

export class Int32 extends PrimativeNumber {
  public readonly min = -2147483648;
  public readonly max = 2147483647;

  public createArray(length: number) {
    return new Array<Int32>(length).fill(new Int32());
  }
}