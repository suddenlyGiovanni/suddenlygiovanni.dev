import { Octokit } from '@octokit/core'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'
// biome-ignore lint/performance/noBarrelFile: <explanation>
export { RequestError } from '@octokit/request-error'
import { Config, Effect, Layer, Redacted } from 'effect'

const makeOctokitService = Effect.gen(function* () {
	const githubToken = yield* Config.redacted('GITHUB_TOKEN')
	const OctokitApi = Octokit.plugin(restEndpointMethods)
	return { octokit: new OctokitApi({ auth: Redacted.value(githubToken) }) }
})

export class OctokitService extends Effect.Tag('@services/OctokitService')<
	OctokitService,
	Effect.Effect.Success<typeof makeOctokitService>
>() {
	// biome-ignore lint/style/useNamingConvention: <explanation>
	static Live = Layer.effect(this, makeOctokitService)
}
