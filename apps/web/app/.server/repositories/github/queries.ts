import { Effect } from 'effect'

import { OctokitServiceLive } from '~/.server/services/octokit.ts'

import type * as Model from './model.ts'
import * as RequestModel from './request-model.ts'
import * as Resolvers from './resolvers.ts'

export const getResume: Effect.Effect<Model.Resume, Model.GetUserError> = Effect.request(
	RequestModel.GetResume({}),
	Resolvers.GetResumeResolver,
).pipe(Effect.withRequestCaching(true), Effect.provide(OctokitServiceLive))

export const getResumeFile = (owner: string, repo: string, path: string) =>
	Effect.request(
		RequestModel.GetResumeFile({ owner, repo, path }),
		Resolvers.GetResumeFileResolver,
	).pipe(Effect.withRequestCaching(true), Effect.provide(OctokitServiceLive))
