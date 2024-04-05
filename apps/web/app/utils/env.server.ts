import * as process from 'node:process'
import * as Schema from '@effect/schema/Schema'
import { formatError } from '@effect/schema/TreeFormatter'
import * as Either from 'effect/Either'

const envSchema = Schema.struct({
	NODE_ENV: Schema.literal('production', 'development', 'test'),
	GITHUB_TOKEN: Schema.optional(
		Schema.NonEmpty.annotations({
			description: 'GitHub token',
			examples: ['github_pat_xxxxxxx_xxxxxx'],
		}),
		{
			exact: true,
			default: () => 'MOCK_GITHUB_TOKEN',
		},
	),
	ALLOW_INDEXING: Schema.optional(
		Schema.transform(
			Schema.literal('true', 'false'),
			Schema.boolean,
			Boolean,
			bool => String(bool) as 'true' | 'false',
		),
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
		MODE: process.env.NODE_ENV,
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
