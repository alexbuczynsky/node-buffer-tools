import { PrimativeNumber } from './PrimativeNumber';

export class UInt8 extends PrimativeNumber {
  public readonly min = 0;
  public readonly max = 255;

  public createArray(length: number) {
    return new Array<UInt8>(length).fill(new UInt8());
  }
}