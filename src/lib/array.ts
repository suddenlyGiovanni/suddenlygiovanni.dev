export function insertIf<T>(condition: any, ...elements: T[]): T[] {
  return condition ? elements : []
}
