import * as Api from '@octokit/core'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'
import { RequestError } from '@octokit/request-error'
import { Config, Effect, Redacted, Schema } from 'effect'

export class OctokitError extends Schema.TaggedError<OctokitError>()('OctokitError', {
	cause: Schema.Defect,
}) {}

export class Octokit extends Effect.Service<Octokit>()('app/services/Octokit', {
	effect: Effect.gen(function* () {
		const OctokitApi = Api.Octokit.plugin(restEndpointMethods)
		const _client = new OctokitApi({ auth: Redacted.value(yield* Config.redacted('GITHUB_TOKEN')) })

		const use = Effect.fn('Octokit.use')(
			<A>(
				f: (client: typeof _client, signal: AbortSignal) => Promise<A>,
			): Effect.Effect<A, OctokitError> =>
				Effect.tryPromise({
					catch: error => {
						if (error instanceof RequestError) {
							return new OctokitError({ cause: error })
						}
						return new OctokitError({ cause: error })
					},
					try: signal => f(_client, signal),
				}),
		)

		return { client: _client, use } as const
	}),
}) {}
