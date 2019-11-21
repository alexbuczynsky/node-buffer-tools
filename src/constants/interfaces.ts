export type BitIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Little or Big Endian
 */
export type Endian = 'LE' | 'BE';

export type Bit = 0 | 1;

export type Crumb = Bit | 2 | 3;

export type Nibble = Crumb | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type BitOrder = 'reversed' | 'normal'