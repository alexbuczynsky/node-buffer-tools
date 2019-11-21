/**
 * Swaps the high and low WORDS (UINT16)
 * 
 * @param {Uint16Array} iData
 * @param {number} regSize
 * @returns
 */
export function WordSwap(buffer: Buffer): Buffer {
  const bufferLength = buffer.length;
  const oldWordArray = new Uint16Array(new Uint8Array(buffer).buffer);
  const newWordArray = new Uint16Array(bufferLength / 2);

  for (let i = 0; i <= oldWordArray.length; i += 2) {
    newWordArray[i] = oldWordArray[i + 1];
    newWordArray[i + 1] = oldWordArray[i];
  }

  return Buffer.from(newWordArray.buffer);
}