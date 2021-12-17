/**
 * @public
 */
export const maxLength =
  <Length extends number>(length: Length) =>
  <S extends string>(string: S) =>
    string.slice(0, length)
