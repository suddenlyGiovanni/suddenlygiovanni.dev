import { Layer } from 'effect'

import { makeRemixRuntime } from '#root/client/lib/utils.ts'
import { OctokitService } from '#root/client/services/octokit.ts'
import { ResumeRepository } from '#root/client/services/resume-repository.ts'
import { TodoRepo } from '#root/client/services/todos-repo.ts'

export const { loaderFunction } = makeRemixRuntime(
	Layer.mergeAll(TodoRepo.Live, OctokitService.Live, ResumeRepository.Live),
)
