/**
 * Gets the node version
 * 
 * @example consdole.log(GetNodeVersion()) // [12,0,0]
 *
 * @export
 * @returns {[number, number, number]}
 */
export function GetNodeVersion(): [number, number, number] {
  const version = process.version;

  const N = version.slice(1).split('.').map(x => parseInt(x, 10));

  return [N[0], N[1], N[2]]
}