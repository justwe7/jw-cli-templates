export function foo <T extends number|string>(val: T): T[] {
  return [val]
}
