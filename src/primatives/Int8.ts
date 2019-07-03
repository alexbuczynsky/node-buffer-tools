import { PrimativeNumber } from './PrimativeNumber';

export class Int8 extends PrimativeNumber {
  public readonly min = -128;
  public readonly max = 127;

  public createArray(length: number) {
    return new Array<Int8>(length).fill(new Int8());
  }
}