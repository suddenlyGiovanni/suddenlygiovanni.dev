import { Data, type Option } from 'effect'
import type { MetaType } from '~/.server/schemas/resume/meta.ts'
import type { ResumeType } from '~/.server/schemas/resume/resume.ts'

export interface Resume {
	readonly _tag: 'Resume'
	readonly meta: MetaType
	readonly resume: ResumeType
}

export class GetUserError extends Data.TaggedError('GetUserError')<{
	readonly message?: string
}> {}

export interface ResumeFile {
	readonly _tag: 'ResumeFile'
	readonly canonical: Option.Option<string>
	readonly decodedContent: string
	readonly lastModified: Option.Option<string>
}

/**
 * This error can be thrown when the data returned from the getContent request is not an object or
 * is an array, or does not have the correct type, name, or path.
 */
export class ResumeFileInvalidDataError extends Data.TaggedError('ResumeFileInvalidDataError')<{
	readonly message?: string
}> {}

/**
 * This error can be thrown when the content of the file cannot be correctly decoded from base64 or
 * cannot be parsed by the decode function.
 */
export class ResumeFileDecodingError extends Data.TaggedError('ResumeFileDecodingError')<{
	readonly message?: string
	readonly encoding?: string
}> {}

export type ResumeFileError = ResumeFileInvalidDataError | ResumeFileDecodingError
