import { Nibble, Endian, DEFAULT_ENDIAN, NibbleSignificance } from "../../constants";
import { GetUInt8At, SetUInt8At } from "../byte";

export function GetNibbleAt(buffer: Buffer, bytePos: number, significance: NibbleSignificance, endian: Endian = DEFAULT_ENDIAN): number {
  const byte = GetUInt8At(buffer, bytePos, endian);

  return GetByteNibble(byte, significance);
}

export function SetNibbleAt(buffer: Buffer, bytePos: number, significance: NibbleSignificance, nibbleValue: Nibble, endian: Endian = DEFAULT_ENDIAN): void {
  const byte = GetUInt8At(buffer, bytePos, endian);
  return SetUInt8At(buffer, bytePos, SetByteNibble(byte, significance, nibbleValue));
}

export function GetByteNibble(byte: number, significance: NibbleSignificance): number {
  const position = significance * 4;
  const nibble = (byte >> position) & 0x0f;
  return nibble;
}

export function SetByteNibble(byte: number, significance: NibbleSignificance, nibbleValue: number) {
  let res = byte;
  res &= 0xF0;

  const position = significance * 4;
  res |= ((nibbleValue << position) & 0x0f)
  return res;

}