/**
 * A generic utility type that operates on ObjectType and will return codomain of all its values as a disjoint union.
 * Optionally it accepts the union type some assignable keys to narrow down the codomain.
 *
 * @example
 * ```ts
 * type Dictionary = Record<string, number>
 * ValueOf<Dictionary>
 * // ^^^ number
 * ```
 *
 * ```ts
 * interface ObjectType {
 *   foo: 'FOO';
 *   ultimateQuestionOfLifeTheUniverseAndEverything: 42;
 *   greet: <T extends string>(name: T) => `Hi ${T}!`
 * }
 * ValueOf<ObjectType, 'ultimateQuestionOfLifeTheUniverseAndEverything' | 'greet'>
 * // ^^^ 42 | <T extends string>(name: T) => `Hi ${T}!`
 * ```
 *
 * @public
 */
export type ValueOf<T extends object, K extends keyof T = keyof T> = T[K]
