import * as Api from '@octokit/core'
import {
	type RestEndpointMethodTypes,
	restEndpointMethods,
} from '@octokit/plugin-rest-endpoint-methods'
import { Config, Effect, Option, Redacted, Schema } from 'effect'

export class OctokitError extends Schema.TaggedError<OctokitError>()('OctokitError', {
	cause: Schema.Defect,
}) {}

export type GetContentResponse = RestEndpointMethodTypes['repos']['getContent']['response']

export class Octokit extends Effect.Service<Octokit>()('app/services/Octokit', {
	effect: Effect.gen(function* () {
		const OctokitApi = Api.Octokit.plugin(restEndpointMethods)
		const octokitApi = new OctokitApi({
			auth: Redacted.value(yield* Config.redacted('GITHUB_TOKEN')),
		})

		const use = Effect.fn('Octokit.use')(
			<A>(
				f: (client: typeof octokitApi, signal: AbortSignal) => Promise<A>,
			): Effect.Effect<A, OctokitError> =>
				Effect.tryPromise({
					catch: cause => new OctokitError({ cause }),
					try: signal => f(octokitApi, signal),
				}),
		)

		const getContent: (
			this: Octokit,
			params: {
				refOption: Option.Option<string>
				repo: string
				path: string
				owner: string
			},
		) => Effect.Effect<GetContentResponse, OctokitError> = Effect.fn('Octokit.getContent')(
			({ owner, path, repo, refOption }) =>
				use(({ rest }, abortSignal) =>
					rest.repos.getContent({
						owner,
						path,
						repo,
						request: { signal: abortSignal },
						...Option.match(refOption, {
							onNone: () => ({}),
							onSome: ref => ({ ref }),
						}),
					}),
				),
		)

		return { client: octokitApi, getContent, use } as const
	}),
}) {}
