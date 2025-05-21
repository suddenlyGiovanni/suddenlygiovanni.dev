import { Layer } from 'effect'

import { makeRemixRuntime } from '#root/src/lib/utils.ts'

import { GithubService } from './github-service.ts'
import { Octokit } from './octokit.ts'
import { ResumeRepository } from './resume-repository.ts'
import { TodoRepo } from './todos-repo.ts'

export const { makServerLoaderFunction, makeServerActionFunction } = makeRemixRuntime(
	Layer.mergeAll(TodoRepo.Live, Octokit.Default, ResumeRepository.Default, GithubService.Default),
)
