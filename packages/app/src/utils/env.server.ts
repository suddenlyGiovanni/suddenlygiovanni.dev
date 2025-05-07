import * as process from 'node:process'

import { Either, ParseResult, pipe, Schema } from 'effect'

const envSchema = Schema.Struct({
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
			default(): false {
				return false
			},
			exact: true,
		},
	),

	APP_ENV: Schema.optionalWith(Schema.Literal('development', 'staging', 'production'), {
		default: () => 'development',
	}),

	GITHUB_TOKEN: Schema.optionalWith(
		Schema.NonEmptyString.annotations({
			description: 'GitHub token',
			examples: ['github_pat_xxxxxxx_xxxxxx'],
		}),
		{
			default(): string {
				return 'MOCK_GITHUB_TOKEN'
			},
			exact: true,
		},
	),

	NODE_ENV: Schema.Literal('production', 'development', 'test'),
})

export class Config {
	static #instance: Config
	#env: Schema.Schema.Type<typeof envSchema>

	private constructor() {
		this.#init()
	}

	static get instance(): Config {
		if (!Config.#instance) {
			Config.#instance = new Config()
		}

		return Config.#instance
	}

	/**
	 * Initialize the environment variables.
	 */
	#init(): void {
		pipe(
			process.env,
			Schema.decodeUnknownEither(envSchema, { errors: 'all' }),
			Either.match({
				onLeft: (parseError): void => {
					console.error(
						'❌ Invalid environment variables:',
						ParseResult.TreeFormatter.formatErrorSync(parseError),
					)
					throw new Error('Invalid environment variables')
				},
				onRight: (env): void => {
					this.#env = env
					Object.freeze(this.#env)

					// Do not log the message when running tests
					if (this.#env.NODE_ENV !== 'test') {
						// biome-ignore lint/suspicious/noConsole: We want this to be logged
						console.log('✅ Environment variables loaded successfully')
					}
				},
			}),
		)
	}

	get serverEnv() {
		return this.#env
	}

	/**
	 * Helper getter which returns a subset of the environment vars which are safe expose to the client.
	 * Don't expose any secrets or sensitive data here.
	 * Otherwise, you would expose your server vars to the client if you returned them from here as this is
	 * directly sent in the root to the client and set on the window.env
	 * @returns Subset of the whole process.env to be passed to the client and used there
	 */
	get clientEnv() {
		const serverEnv = this.serverEnv
		return {
			NODE_ENV: serverEnv.NODE_ENV,
		}
	}
}

type ServerEnvVars = typeof Config.instance.serverEnv
type ClientEnvVars = typeof Config.instance.clientEnv

declare global {
	namespace NodeJS {
		interface ProcessEnv extends ServerEnvVars {}
	}

	var ENV: ClientEnvVars
	interface Window {
		ENV: ClientEnvVars
	}
}
