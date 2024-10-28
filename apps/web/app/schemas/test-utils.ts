import { Effect, Either, Option, Schema } from 'effect'
import { type ParseError, TreeFormatter } from 'effect/ParseResult'
import type { ParseOptions } from 'effect/SchemaAST'

import { expect } from 'vitest'

export const onExcessPropertyError: ParseOptions = {
	onExcessProperty: 'error',
}

export const onExcessPropertyPreserve: ParseOptions = {
	onExcessProperty: 'preserve',
}

export const allErrors: ParseOptions = {
	errors: 'all',
}

export const expectDecodeUnknownSuccess = async <A, I>(
	schema: Schema.Schema<A, I, never>,
	input: unknown,
	// biome-ignore lint/suspicious/noExplicitAny: ok here
	expected: A = input as any,
	options?: ParseOptions,
): Promise<void> => expectSuccess(Schema.decodeUnknown(schema)(input, options), expected)

export const expectDecodeUnknownFailure = async <A, I>(
	schema: Schema.Schema<A, I, never>,
	input: unknown,
	message: string,
	options?: ParseOptions,
): Promise<void> => expectFailure(Schema.decodeUnknown(schema)(input, options), message)

export const expectEncodeSuccess = async <A, I>(
	schema: Schema.Schema<A, I, never>,
	a: A,
	expected: unknown,
	options?: ParseOptions,
): Promise<void> => expectSuccess(Schema.encode(schema)(a, options), expected)

export const expectEncodeFailure = async <A, I>(
	schema: Schema.Schema<A, I, never>,
	a: A,
	message: string,
	options?: ParseOptions,
): Promise<void> => expectFailure(Schema.encode(schema)(a, options), message)

// biome-ignore lint/style/useNamingConvention: <explanation>
export const printAST = <A, I, R>(schema: Schema.Schema<A, I, R>): void => {
	console.log('%o', schema.ast)
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export const expectFailure = async <A>(
	effect: Either.Either<A, ParseError> | Effect.Effect<A, ParseError>,
	message: string,
): Promise<void> => {
	if (Either.isEither(effect)) {
		expectEitherLeft(effect, message)
	} else {
		expectEffectFailure(effect, message)
	}
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export const expectSuccess = async <E, A>(
	effect: Either.Either<A, E> | Effect.Effect<A, E>,
	a: A,
): Promise<void> => {
	if (Either.isEither(effect)) {
		expectEitherRight(effect, a)
	} else {
		expectEffectSuccess(effect, a)
	}
}

export const expectEffectFailure = async <A>(
	effect: Effect.Effect<A, ParseError>,
	message: string,
): Promise<void> => {
	expect(
		await Effect.runPromise(Effect.either(Effect.mapError(effect, TreeFormatter.formatErrorSync))),
	).toStrictEqual(Either.left(message))
}

export const expectEffectSuccess = async <E, A>(
	effect: Effect.Effect<A, E>,
	a: A,
): Promise<void> => {
	expect(await Effect.runPromise(Effect.either(effect))).toStrictEqual(Either.right(a))
}

export const expectEitherLeft = <A>(e: Either.Either<A, ParseError>, message: string): void => {
	expect(Either.mapLeft(e, TreeFormatter.formatErrorSync)).toStrictEqual(Either.left(message))
}

export const expectEitherRight = <E, A>(e: Either.Either<A, E>, a: A): void => {
	expect(e).toStrictEqual(Either.right(a))
}

export const expectNone = <A>(o: Option.Option<A>): void => {
	expect(o).toStrictEqual(Option.none())
}

export const expectSome = <A>(o: Option.Option<A>, a: A): void => {
	expect(o).toStrictEqual(Option.some(a))
}
