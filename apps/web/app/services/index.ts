import { Layer } from 'effect'
import { makeRemixRuntime } from '~/lib/utils.ts'
import { TodoRepo } from '~/services/todos-repo.ts'
import { OctokitService } from '~/services/octokit.ts'

export const { loaderFunction } = makeRemixRuntime(Layer.mergeAll(TodoRepo.Live, OctokitService.Live))
