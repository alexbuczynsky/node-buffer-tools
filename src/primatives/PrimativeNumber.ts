import { isInRange, checkNumberInRange } from "../validators";
import { OutOfRangeError } from "../errors";
import { IsBigIntSupported } from "../utils/IsBigIntSupported";

/**
 *
 *
 * @export
 * @abstract
 * @class PrimativeNumberBase
 */
export abstract class PrimativeNumberBase {
  /**
   * Minimum value of this primative number
   *
   * @abstract
   * @type {(bigint | number)}
   * @memberof PrimativeNumberBase
   */
  public abstract readonly min: bigint | number;
  /**
   * Maximum value of this primative number
   *
   * @abstract
   * @type {(bigint | number)}
   * @memberof PrimativeNumberBase
   */
  public abstract readonly max: bigint | number;


  /**
   * Validates if the value for this primative
   * is valid or not.
   * 
   * @example const x = new Int8(129); x.validate() // throws OutOfRangeError
   *
   * @abstract
   * @memberof PrimativeNumberBase
   * @throws {OutOfRangeError}
   */
  public abstract validate(): void;

  public abstract createArray(length: number): Array<ThisType<this>>;
}

export class PrimativeNumberArray<T extends PrimativeNumberBase> extends Array<T> {
  constructor(length: number) {
    super(length);
  }

}


/**
 *
 *
 * @export
 * @abstract
 * @class PrimativeNumberBigInt
 * @extends {PrimativeNumberBase}
 */
export abstract class PrimativeNumberBigInt extends PrimativeNumberBase {
  public abstract readonly min: bigint;
  public abstract readonly max: bigint;
  private _value!: bigint

  constructor(value?: bigint) {
    super();

    if (IsBigIntSupported()) {
      if (value !== undefined) {
        this._value = value;
      } else {
        this._value = BigInt(0);
      }
    } else {
      this._value = 0 as unknown as bigint;
    }
  }

  get value() {
    return this._value;
  }

  set value(x: bigint) {
    checkNumberInRange(x, this.min, this.max);
    this._value = x;
  }

  public validate() {
    return checkNumberInRange(this.value, this.min, this.max);
  }

  public isInRange(value: bigint) {
    return isInRange(value, this.min, this.max);
  }
}

/**
 *
 *
 * @export
 * @abstract
 * @class PrimativeNumber
 * @extends {PrimativeNumberBase}
 */
export abstract class PrimativeNumber extends PrimativeNumberBase {
  public abstract readonly min: number;
  public abstract readonly max: number;

  constructor(private _value: number = 0) {
    super();
  }

  get value() {
    return this._value;
  }

  set value(x: number) {
    checkNumberInRange(x, this.min, this.max);
    this._value = x;
  }

  public validate() {
    return checkNumberInRange(this.value, this.min, this.max);
  }

  public isInRange(value: number) {
    return isInRange(value, this.min, this.max);
  }
}