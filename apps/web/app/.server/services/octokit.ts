import { Config, type ConfigError, Context, Effect, Layer, Secret } from 'effect'

import { type Octokit, Octokit as OctokitClass } from 'octokit'

export class OctokitService extends Context.Tag('@services/OctokitService')<
	OctokitService,
	{
		readonly getOctokit: () => Effect.Effect<Octokit, ConfigError.ConfigError>
	}
>() {}

export const OctokitServiceLive = Layer.succeed(
	OctokitService,
	OctokitService.of({
		getOctokit: () =>
			Effect.gen(function* (_) {
				const githubToken = yield* _(Config.secret('GITHUB_TOKEN'))
				return new OctokitClass({ auth: Secret.value(githubToken) }) as unknown as Octokit
			}),
	}),
)
