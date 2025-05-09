import { Layer } from 'effect'

import { makeRemixRuntime } from '#root/src/lib/utils.ts'
import { Octokit } from '#root/src/services/octokit.ts'
import { ResumeRepository } from '#root/src/services/resume-repository.ts'
import { TodoRepo } from '#root/src/services/todos-repo.ts'

export const { loaderFunction } = makeRemixRuntime(
	Layer.mergeAll(TodoRepo.Live, Octokit.Default, ResumeRepository.Default),
)
