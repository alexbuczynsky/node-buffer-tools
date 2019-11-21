import { BCDtoByte, ByteToBCD } from "../byte";

/**
 * Get S7 DateTime from buffer at a starting position
 *
 * @export
 * @param {Buffer} buffer buffer containing the date time
 * @param {number} pos starting position
 * @returns
 */
export function GetS7DateTimeAt(buffer: Buffer, pos: number): Date {

  let year: number = BCDtoByte(buffer[pos]);

  if (year < 90) {
    year += 2000;
  } else {
    year += 1900;
  }

  const month: number = BCDtoByte(buffer[pos + 1]) - 1;
  const day: number = BCDtoByte(buffer[pos + 2]);
  const hour: number = BCDtoByte(buffer[pos + 3]);
  const minute: number = BCDtoByte(buffer[pos + 4]);
  const second: number = BCDtoByte(buffer[pos + 5]);
  const millisecond: number = (BCDtoByte(buffer[pos + 6]) * 10) + (BCDtoByte(buffer[pos + 7]) / 10);

  try {
    return new Date(year, month, day, hour, minute, second, millisecond);
  } catch (error) {
    return new Date(0);
  }
}

/**
 * Set S7 DateTime from buffer at a starting position
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @param {Date} date
 */
export function SetS7DateTimeAt(buffer: Buffer, pos: number, date: Date): void {
  let year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDay();
  const hour: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();
  const dayOfWeek: number = date.getDay() + 1;
  // MSecH = First two digits of miliseconds 
  const MsecH: number = date.getMilliseconds() / 10;
  // MSecL = Last digit of miliseconds
  const MsecL: number = date.getMilliseconds() % 10;
  if (year > 1999) {
    year -= 2000;
  }

  buffer[pos] = ByteToBCD(year);
  buffer[pos + 1] = ByteToBCD(month);
  buffer[pos + 2] = ByteToBCD(day);
  buffer[pos + 3] = ByteToBCD(hour);
  buffer[pos + 4] = ByteToBCD(minutes);
  buffer[pos + 5] = ByteToBCD(seconds);
  buffer[pos + 6] = ByteToBCD(MsecH);
  buffer[pos + 7] = ByteToBCD(MsecL * 10 + dayOfWeek);
}