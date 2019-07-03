import { PrimativeNumber } from './PrimativeNumber';

export class UInt32 extends PrimativeNumber {
  public readonly min = 0;
  public readonly max = 4294967295;

  public createArray(length: number) {
    return new Array<UInt32>(length).fill(new UInt32());
  }
}