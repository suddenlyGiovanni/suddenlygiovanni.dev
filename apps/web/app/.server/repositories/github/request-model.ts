import { Request } from 'effect'
import type * as Model from './model.ts'

export interface GetResume extends Request.Request<Model.Resume, Model.GetUserError> {
	readonly _tag: 'GetResume'
}
export const GetResume = Request.tagged('GetResume')

export interface GetResumeFile extends Request.Request<Model.ResumeFile, Model.ResumeFileError> {
	readonly _tag: 'GetResumeFile'
	readonly owner: string
	readonly repo: string
	readonly path: string
}
export const GetResumeFile = Request.tagged('GetResumeFile')
