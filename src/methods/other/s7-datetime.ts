import { BCDtoByte, ByteToBCD } from "../byte";

enum BCDDateIndex {
  YEAR = 0,
  MONTH = 1,
  DAY = 2,
  HOUR = 3,
  MINUTE = 4,
  SECOND = 5,
  MSEC_HIGH = 6,
  MSEC_LOW = 7,
}

/**
 * Get S7 DateTime from buffer at a starting position
 *
 * @export
 * @param {Buffer} buffer buffer containing the date time
 * @param {number} pos starting position
 * @returns
 */
export function GetS7DateTimeAt(buffer: Buffer, pos: number): Date {
  let year = BCDtoByte(buffer[pos + BCDDateIndex.YEAR]);

  if (year < 90) {
    year += 2000;
  } else {
    year += 1900;
  }

  const month = BCDtoByte(buffer[pos + BCDDateIndex.MONTH]) - 1;
  const dayOfMonth = BCDtoByte(buffer[pos + BCDDateIndex.DAY]);
  const hour = BCDtoByte(buffer[pos + BCDDateIndex.HOUR]);
  const minute = BCDtoByte(buffer[pos + BCDDateIndex.MINUTE]);
  const second = BCDtoByte(buffer[pos + BCDDateIndex.SECOND]);
  const millisecond = (BCDtoByte(buffer[pos + BCDDateIndex.MSEC_HIGH]) * 10) + (BCDtoByte(buffer[pos + BCDDateIndex.MSEC_LOW]) / 10);

  try {
    return new Date(year, month, dayOfMonth, hour, minute, second, millisecond);
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

  if (year > 1999) {
    year -= 2000;
  }

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const dayOfWeek = date.getDay() + 1;
  // MilliSecondHigh = First two digits of miliseconds 
  const MilliSecondHigh = date.getMilliseconds() / 10;
  // MilliSecondLow = Last digit of miliseconds
  const MilliSecondLow = date.getMilliseconds() % 10;


  buffer[pos + BCDDateIndex.YEAR] = ByteToBCD(year);
  buffer[pos + BCDDateIndex.MONTH] = ByteToBCD(month);
  buffer[pos + BCDDateIndex.DAY] = ByteToBCD(day);
  buffer[pos + BCDDateIndex.HOUR] = ByteToBCD(hour);
  buffer[pos + BCDDateIndex.MINUTE] = ByteToBCD(minutes);
  buffer[pos + BCDDateIndex.SECOND] = ByteToBCD(seconds);
  buffer[pos + BCDDateIndex.MSEC_HIGH] = ByteToBCD(MilliSecondHigh);
  buffer[pos + BCDDateIndex.MSEC_LOW] = ByteToBCD(MilliSecondLow * 10 + dayOfWeek);
}