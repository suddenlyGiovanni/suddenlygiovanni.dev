import { Config, Effect, pipe } from 'effect'

export class ConfigService extends Effect.Service<ConfigService>()('app/ConfigService', {
	effect: Effect.gen(function* () {
		const NODE_ENV = yield* pipe(
			'NODE_ENV',
			Config.literal('production', 'development'),
			Config.withDefault('production'),
		)
		const PORT = yield* Config.number('PORT').pipe(Config.withDefault(5173))

		return { NODE_ENV, PORT }
	}),
}) {}
