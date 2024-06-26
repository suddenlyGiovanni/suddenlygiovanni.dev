import { Octokit } from '@octokit/core'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'
// biome-ignore lint/performance/noBarrelFile: <explanation>
export { RequestError } from '@octokit/request-error'
import { Config, Effect, Layer, Secret } from 'effect'

const makeOctokitService = Effect.gen(function* () {
	const githubToken = yield* Config.secret('GITHUB_TOKEN')
	const OctokitApi = Octokit.plugin(restEndpointMethods)
	return { octokit: new OctokitApi({ auth: Secret.value(githubToken) }) }
})

export class OctokitService extends Effect.Tag('@services/OctokitService')<
	OctokitService,
	Effect.Effect.Success<typeof makeOctokitService>
>() {
	// biome-ignore lint/style/useNamingConvention: <explanation>
	static Live = Layer.effect(this, makeOctokitService)
}
