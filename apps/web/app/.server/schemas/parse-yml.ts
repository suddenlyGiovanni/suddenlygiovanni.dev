import { AST, ParseResult, Schema } from '@effect/schema'
// biome-ignore lint/style/useNamingConvention: I want to have the same style of using JSON.<method>
import * as YAML from '@std/yaml'
import type { YAMLError } from '@std/yaml/_error'

export const YmlString = Schema.string.annotations({
	[AST.IdentifierAnnotationId]: 'YmlString',
	[AST.TitleAnnotationId]: 'YmlString',
	[AST.DescriptionAnnotationId]: 'a YML string',
})

/**
 * The `parseYml` combinator provides a method to convert JSON strings into the `unknown` type using the underlying
 * functionality of `YAML.parse`. It also utilizes `YAML.stringify` for encoding.
 *
 * You can optionally provide a `ParseJsonOptions` to configure both `YAML.parse` and `YAML.stringify` executions.
 *
 * Optionally, you can pass a schema `Schema<A, I, R>` to obtain an `A` type instead of `unknown`.
 *
 * @example
 *
 * assert.deepStrictEqual(S.decodeUnknownSync(S.parseYml())(`
 *       test: toto
 *       foo:
 *         bar: True
 *         baz: 1
 *         qux: ~
 *     `), { test: "toto", foo: { bar: true, baz: 1, qux: null } })
 * assert.deepStrictEqual(S.decodeUnknownSync(S.parseYml(S.struct({ foo: S.NumberFromString })))(`foo: 42`), { foo: 42 })
 *
 * @category string transformations
 * @since 1.0.0
 */
export const parseYml: {
	<A, I, R>(schema: Schema.Schema<A, I, R>): Schema.Schema<A, string, R>
	(): Schema.Schema<unknown, string, never>
} = <A, I, R>(schema?: Schema.Schema<A, I, R>) => {
	if (Schema.isSchema(schema)) {
		// biome-ignore lint/suspicious/noExplicitAny: can't infer the type of `schema` with generics
		return Schema.compose(parseYml(), schema as any) as any
	}
	return Schema.transformOrFail(
		YmlString,
		Schema.unknown,
		(string, _, ast) =>
			ParseResult.try({
				try: () => YAML.parse(string),
				catch: (e: YAMLError) => new ParseResult.Type(ast, string, e.message),
			}),
		(unknown, _, ast) =>
			ParseResult.try({
				try: () => YAML.stringify(unknown),
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				catch: (e: any) => new ParseResult.Type(ast, unknown, e?.message),
			}),
	)
}
