import { PrimativeNumber } from './PrimativeNumber';

export class UInt16 extends PrimativeNumber {
  public readonly min = 0;
  public readonly max = 65535;

  public createArray(length: number) {
    return new Array<UInt16>(length).fill(new UInt16());
  }
}