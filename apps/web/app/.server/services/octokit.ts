import { Context } from 'effect'
import { env } from 'node:process'
import { Octokit } from 'octokit'

export const octokit = new Octokit({ auth: env.GITHUB_TOKEN })

export class GitHub extends Context.Tag('GitHub')<GitHub, { readonly octokit: typeof octokit }>() {}
