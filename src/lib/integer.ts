export interface IntBrand {
  readonly Int: unique symbol
}

export type Int = number & IntBrand

export function fromNumber(number: number): Int {
  return number as Int
}

export function toNumber(int: Int): number {
  return int as number
}
