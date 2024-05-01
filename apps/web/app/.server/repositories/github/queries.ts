import { Effect } from 'effect'
import { OctokitService } from '~/services/octokit.ts'
import * as RequestModel from './request-model.ts'
import * as Resolvers from './resolvers.ts'

export const getResume = Effect.request(
	RequestModel.GetResume({}),
	// @ts-expect-error
	Resolvers.GetResumeResolver,
).pipe(Effect.withRequestCaching(true), Effect.provide(OctokitService.Live))

export const getResumeFile = (owner: string, repo: string, path: string) =>
	Effect.request(
		RequestModel.GetResumeFile({ owner, repo, path }),
		// @ts-expect-error
		Resolvers.GetResumeFileResolver,
	).pipe(Effect.withRequestCaching(true), Effect.provide(OctokitService.Live))
