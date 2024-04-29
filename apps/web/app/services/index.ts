import { Layer } from 'effect'
import { makeRemixRuntime } from '~/lib/utils.ts'
import { TodoRepo } from '~/services/todos-repo.ts'

export const { loaderFunction } = makeRemixRuntime(Layer.mergeAll(TodoRepo.Live))
