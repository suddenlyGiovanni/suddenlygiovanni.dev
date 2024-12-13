// biome-ignore lint/correctness/noNodejsModules: <explanation>
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as process from 'node:process'
import { Either, Schema } from 'effect'
import { TreeFormatter } from 'effect/ParseResult'

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
			default(): string {
				return 'MOCK_GITHUB_TOKEN'
			},
		},
	),
	// biome-ignore lint/style/useNamingConvention: <explanation>
	ALLOW_INDEXING: Schema.optionalWith(
		Schema.transform(Schema.Literal('true', 'false'), Schema.Boolean, {
			decode(string: 'true' | 'false'): boolean {
				switch (string) {
					case 'true':
						return true
					case 'false':
						return false
					default:
						return false
				}
			},
			encode(boolean: boolean): 'true' | 'false' {
				return boolean ? 'true' : 'false'
			},
		}),
		{
			exact: true,
			default(): false {
				return false
			},
		},
	),
})

declare global {
	// biome-ignore lint/style/noNamespace: <explanation>
	// biome-ignore lint/style/useNamingConvention: this is the correct overload
	namespace NodeJS {
		interface ProcessEnv extends Schema.Schema.Encoded<typeof envSchema> {}
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
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error('❌ Invalid environment variables:', TreeFormatter.formatError(maybeEnv.left))
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

// biome-ignore lint/nursery/useExplicitType: <explanation>
export function getEnv() {
	return {
		// biome-ignore lint/style/useNamingConvention: <explanation>
		MODE: process.env.NODE_ENV,
		// biome-ignore lint/style/useNamingConvention: <explanation>
		ALLOW_INDEXING: process.env.ALLOW_INDEXING,
	} as const
}

export type Env = ReturnType<typeof getEnv>

declare global {
	var ENV: Env
	interface Window {
		// biome-ignore lint/style/useNamingConvention: <explanation>
		ENV: Env
	}
}
