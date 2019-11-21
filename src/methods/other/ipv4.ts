export type IPV4Array = [number, number, number, number];

/**
 * Gets an IPV4 IP Address from the buffer at a specific position,
 * and returns it as a number array of length 4.
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {[number, number, number, number]}
 */
export function GetIPV4AddressAt(buffer: Buffer, pos: number): IPV4Array {
  const ipv4Address = buffer.slice(pos, pos + 4);
  return [
    ipv4Address[0],
    ipv4Address[1],
    ipv4Address[2],
    ipv4Address[3],
  ];
}

/**
 * Sets an IPV4 IP Address in the buffer at a specific position
 *
 * @export
 * @param {Buffer} buffer the buffer to write the ipv4 address to
 * @param {number} pos position to start the write operation
 * @param {(IPV4Array | number[] | Buffer | ArrayLike<number> | string)} ipv4Address ip address
 */
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: IPV4Array): void
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: number[]): void
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: Buffer): void
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: ArrayLike<number>): void
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: string): void
export function SetIPV4AddressAt(buffer: Buffer, pos: number, ipv4Address: IPV4Array | number[] | Buffer | ArrayLike<number> | string): void {
  if (typeof ipv4Address === 'string') {
    ipv4Address = ipv4Address.split('.').map(value => Number(value));
  }

  buffer[pos + 0] = ipv4Address[0];
  buffer[pos + 1] = ipv4Address[1];
  buffer[pos + 2] = ipv4Address[2];
  buffer[pos + 3] = ipv4Address[3];
}

/**
 * Gets an IPV4 IP Address from the buffer at a specific position,
 * and converts it into the format: `${ip1}.${ip2}.${ip3}.${ip4}`
 *
 * @export
 * @param {Buffer} buffer
 * @param {number} pos
 * @returns {string}
 */
export function GetIPV4AddressAsStringAt(buffer: Buffer, pos: number): string {
  return GetIPV4AddressAt(buffer, pos).join('.');
}
