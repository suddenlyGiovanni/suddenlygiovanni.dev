// biome-ignore lint/correctness/noNodejsModules: <explanation>
import * as process from 'node:process'
import * as Schema from '@effect/schema/Schema'
import { formatError } from '@effect/schema/TreeFormatter'
import * as Either from 'effect/Either'

const envSchema = Schema.Struct({
	// biome-ignore lint/style/useNamingConvention: <explanation>
	NODE_ENV: Schema.Literal('production', 'development', 'test'),
	// biome-ignore lint/style/useNamingConvention: <explanation>
	GITHUB_TOKEN: Schema.optionalWith(
		Schema.NonEmptyString.annotations({
			description: 'GitHub token',
			examples: ['github_pat_xxxxxxx_xxxxxx'],
		}),
		{
			exact: true,
			default: () => 'MOCK_GITHUB_TOKEN',
		},
	),
	// biome-ignore lint/style/useNamingConvention: <explanation>
	ALLOW_INDEXING: Schema.optionalWith(
		Schema.transform(Schema.Literal('true', 'false'), Schema.Boolean, {
			decode: string => string === 'true',
			encode: boolean => (boolean ? 'true' : 'false'),
		}),
		{
			exact: true,
			default: () => false,
		},
	),
})

type EnvSchema = Schema.Schema.Type<typeof envSchema>

declare global {
	// biome-ignore lint/style/noNamespace: <explanation>
	// biome-ignore lint/style/useNamingConvention: this is the correct overload
	namespace NodeJS {
		interface ProcessEnv extends EnvSchema {}
	}
}

/**
 *
 * Validates the environment variables.
 * If the environment variables are invalid, an error is thrown...
 * Invoke this function at the edge of your application to ensure that the environment variables are set.
 * Later make sure to use {@link getEnv} to access the environment variables.
 */
export function init(): void {
	const maybeEnv = Schema.decodeUnknownEither(envSchema)(process.env, { errors: 'all' })
	if (Either.isLeft(maybeEnv)) {
		// biome-ignore lint/nursery/noConsole: this is a dev-only error message
		console.error('❌ Invalid environment variables:', formatError(maybeEnv.left))
		throw new Error('Invalid environment variables')
	}
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
	return {
		// biome-ignore lint/style/useNamingConvention: <explanation>
		MODE: process.env.NODE_ENV,
		// biome-ignore lint/style/useNamingConvention: <explanation>
		ALLOW_INDEXING: process.env.ALLOW_INDEXING,
	} as const
}

// biome-ignore lint/style/useNamingConvention: I need it to be in all caps
type ENV = ReturnType<typeof getEnv>

declare global {
	// eslint-disable-next-line no-var -- We need it to be hoisted and editable
	var ENV: ENV
	interface Window {
		// biome-ignore lint/style/useNamingConvention: I need it to be in all caps
		ENV: ENV
	}
}
