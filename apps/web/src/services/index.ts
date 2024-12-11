import { Layer } from 'effect'
import { makeRemixRuntime } from '~/lib/utils.ts'
import { OctokitService } from '~/services/octokit.ts'
import { ResumeRepository } from '~/services/resume-repository.ts'
import { TodoRepo } from '~/services/todos-repo.ts'

export const { loaderFunction } = makeRemixRuntime(
	Layer.mergeAll(TodoRepo.Live, OctokitService.Live, ResumeRepository.Live),
)
