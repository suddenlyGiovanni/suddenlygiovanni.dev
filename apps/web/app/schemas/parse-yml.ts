import * as YAML from '@std/yaml'
import { ParseResult, Schema, SchemaAST } from 'effect'

export const YmlString = Schema.String.annotations({
	[SchemaAST.IdentifierAnnotationId]: 'YmlString',
	[SchemaAST.TitleAnnotationId]: 'YmlString',
	[SchemaAST.DescriptionAnnotationId]: 'a YML string',
})

/**
 * The `parseYml` combinator provides a method to convert YAML strings into the `unknown` type using the underlying
 * functionality of `YAML.parse`. It also utilizes `YAML.stringify` for encoding.
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
export function parseYml(): Schema.Schema<unknown, string>
export function parseYml<A, I, R>(schema: Schema.Schema<A, I, R>): Schema.Schema<A, string, R>
export function parseYml<A, I, R>(schema?: Schema.Schema<A, I, R>) {
	if (Schema.isSchema(schema)) {
		// biome-ignore lint/suspicious/noExplicitAny: can't infer the type of `schema` with generics
		return Schema.compose(parseYml(), schema as any) as any
	}
	return Schema.transformOrFail(YmlString, Schema.Unknown, {
		decode: (string, _, ast) =>
			ParseResult.try({
				try: () => YAML.parse(string),
				catch: e => new ParseResult.Type(ast, string, e instanceof Error ? e?.message : undefined),
			}),
		encode: (unknown, _, ast) =>
			ParseResult.try({
				try: () => YAML.stringify(unknown),
				catch: e => new ParseResult.Type(ast, unknown, e instanceof Error ? e?.message : undefined),
			}),
	})
}
