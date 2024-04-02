import {
	type BasicRecord,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
	makeOpenGraphBase,
} from './open-graph-base.ts'
import {
	type BaseOrExtended,
	type MetaBase,
	PropertyProfile,
	type Types,
	makeOpenGraphMeta,
	type og,
} from './open-graph.ts'
import { insertIf } from './utils/array.ts'
import type { ValueOf } from './utils/types.ts'

type Profile<T extends string = ''> = BaseOrExtended<'profile', T>

export type IPropertyProfile = ValueOf<typeof PropertyProfile>

export type ProfileRecord =
	| Exclude<BasicRecord, OgType>
	| OgTypeProfile
	| OptionalRecord
	| OgProfileFirstName
	| OgProfileLastName
	| OgProfileUsername
	| OgProfileGender

interface ProfileMetaBase<Property extends IPropertyProfile, Content extends Types.Type>
	extends MetaBase<Property, Content> {}

interface OgTypeProfile extends MetaBase<og<'type'>, Types.Enum<'profile'>> {}

/**
 * A name normally given to an individual by a parent or self-chosen.
 * string
 */
interface OgProfileFirstName extends ProfileMetaBase<og<Profile<'first_name'>>, Types.String> {}

/**
 * A name inherited from a family or marriage and by which the individual is commonly known.
 * string
 */
interface OgProfileLastName extends ProfileMetaBase<og<Profile<'last_name'>>, Types.String> {}

/**
 * A short unique string to identify them.
 * string
 */
interface OgProfileUsername extends ProfileMetaBase<og<Profile<'username'>>, Types.String> {}

/**
 * Gender
 */
interface OgProfileGender
	extends ProfileMetaBase<og<Profile<'gender'>>, Types.Enum<'male' | 'female'>> {}

export interface OpenGraphProfile extends OpenGraphBaseWithOptional {
	ogType: Types.Enum<'profile'>

	/**
	 * A name normally given to an individual by a parent or self-chosen.
	 * string
	 */
	ogProfileFirstName?: Types.String

	/**
	 * A name inherited from a family or marriage and by which the individual is commonly known.
	 * string
	 */
	ogProfileLastName?: Types.String

	/**
	 * A short unique string to identify them.
	 * string
	 */
	ogProfileUsername?: Types.String

	/** Gender */
	ogProfileGender?: Types.Enum<'male' | 'female'>
}

export function makeOpenGraphProfile(openGraphProfile: OpenGraphProfile) {
	return [
		// BASIC_METADATA!
		...makeOpenGraphBase(openGraphProfile),

		// FIRST_NAME?
		...insertIf(
			openGraphProfile.ogProfileFirstName,
			makeOpenGraphMeta(PropertyProfile.OG_PROFILE_FIRST_NAME),
		),

		// LAST_NAME?
		...insertIf(
			openGraphProfile.ogProfileLastName,
			makeOpenGraphMeta(PropertyProfile.OG_PROFILE_LAST_NAME),
		),

		// USER_NAME?
		...insertIf(
			openGraphProfile.ogProfileUsername,
			makeOpenGraphMeta(PropertyProfile.OG_PROFILE_USERNAME),
		),

		// GENDER?
		...insertIf(
			openGraphProfile.ogProfileGender,
			makeOpenGraphMeta(PropertyProfile.OG_PROFILE_GENDER),
		),
	]
}
