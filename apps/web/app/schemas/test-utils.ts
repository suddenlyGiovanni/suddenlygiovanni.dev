import type { ParseOptions } from '@effect/schema/AST'
import type * as ParseResult from '@effect/schema/ParseResult'
import * as S from '@effect/schema/Schema'
import { formatErrorSync } from '@effect/schema/TreeFormatter'
import * as Effect from 'effect/Effect'
import * as Either from 'effect/Either'
import * as Option from 'effect/Option'
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
	schema: S.Schema<A, I, never>,
	input: unknown,
	expected: A = input as any,
	options?: ParseOptions,
) => expectSuccess(S.decodeUnknown(schema)(input, options), expected)

export const expectDecodeUnknownFailure = async <A, I>(
	schema: S.Schema<A, I, never>,
	input: unknown,
	message: string,
	options?: ParseOptions,
) => expectFailure(S.decodeUnknown(schema)(input, options), message)

export const expectEncodeSuccess = async <A, I>(
	schema: S.Schema<A, I, never>,
	a: A,
	expected: unknown,
	options?: ParseOptions,
) => expectSuccess(S.encode(schema)(a, options), expected)

export const expectEncodeFailure = async <A, I>(
	schema: S.Schema<A, I, never>,
	a: A,
	message: string,
	options?: ParseOptions,
) => expectFailure(S.encode(schema)(a, options), message)

export const printAST = <A, I, R>(schema: S.Schema<A, I, R>) => {
	console.log('%o', schema.ast)
}

export const expectFailure = async <A>(
	effect: Either.Either<A, ParseResult.ParseError> | Effect.Effect<A, ParseResult.ParseError>,
	message: string,
) => {
	if (Either.isEither(effect)) {
		expectEitherLeft(effect, message)
	} else {
		expectEffectFailure(effect, message)
	}
}

export const expectSuccess = async <E, A>(
	effect: Either.Either<A, E> | Effect.Effect<A, E>,
	a: A,
) => {
	if (Either.isEither(effect)) {
		expectEitherRight(effect, a)
	} else {
		expectEffectSuccess(effect, a)
	}
}

export const expectEffectFailure = async <A>(
	effect: Effect.Effect<A, ParseResult.ParseError>,
	message: string,
) => {
	expect(
		await Effect.runPromise(Effect.either(Effect.mapError(effect, formatErrorSync))),
	).toStrictEqual(Either.left(message))
}

export const expectEffectSuccess = async <E, A>(effect: Effect.Effect<A, E>, a: A) => {
	expect(await Effect.runPromise(Effect.either(effect))).toStrictEqual(Either.right(a))
}

export const expectEitherLeft = <A>(
	e: Either.Either<A, ParseResult.ParseError>,
	message: string,
) => {
	expect(Either.mapLeft(e, formatErrorSync)).toStrictEqual(Either.left(message))
}

export const expectEitherRight = <E, A>(e: Either.Either<A, E>, a: A) => {
	expect(e).toStrictEqual(Either.right(a))
}

export const expectNone = <A>(o: Option.Option<A>) => {
	expect(o).toStrictEqual(Option.none())
}

export const expectSome = <A>(o: Option.Option<A>, a: A) => {
	expect(o).toStrictEqual(Option.some(a))
}
