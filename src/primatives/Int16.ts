import { PrimativeNumber } from './PrimativeNumber';

export class Int16 extends PrimativeNumber {
  public readonly min = -32768;
  public readonly max = 32767;

  public createArray(length: number) {
    return new Array<Int16>(length).fill(new Int16());
  }
}