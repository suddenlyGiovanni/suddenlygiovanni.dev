import { Layer, ManagedRuntime } from 'effect'

import { GithubService } from './github-service.ts'
import { makeReactRouterServersRuntime } from './make-react-router-runtime.ts'
import { Octokit } from './octokit.ts'
import { ResumeRepository } from './resume-repository.ts'

const MainLayer = Layer.mergeAll(Octokit.Default, GithubService.Default, ResumeRepository.Default)

export const RuntimeServer = ManagedRuntime.make(MainLayer)
export const ReactRouterServersRuntime = makeReactRouterServersRuntime(RuntimeServer)
