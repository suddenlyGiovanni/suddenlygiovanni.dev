import {
	type BaseOrExtended,
	type MetaBase,
	makeOpenGraphMeta,
	type OpenGraphMeta,
	type og,
	PropertyProfile,
} from './open-graph.ts'
import {
	type BasicRecord,
	makeOpenGraphBase,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
} from './open-graph-base.ts'
import type * as Types from './types.ts'
import { insertIf, type ValueOf } from './utils/index.ts'

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

type ProfileMetaBase<Property extends IPropertyProfile, Content extends Types.Type> = MetaBase<Property, Content>

type OgTypeProfile = MetaBase<og<'type'>, Types.Enum<'profile'>>

/**
 * A name normally given to an individual by a parent or self-chosen.
 * string
 */
type OgProfileFirstName = ProfileMetaBase<og<Profile<'first_name'>>, Types.String>

/**
 * A name inherited from a family or marriage and by which the individual is commonly known.
 * string
 */
type OgProfileLastName = ProfileMetaBase<og<Profile<'last_name'>>, Types.String>

/**
 * A short unique string to identify them.
 * string
 */
type OgProfileUsername = ProfileMetaBase<og<Profile<'username'>>, Types.String>

/**
 * Gender
 */
type OgProfileGender = ProfileMetaBase<og<Profile<'gender'>>, Types.Enum<'male' | 'female'>>

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

export function makeOpenGraphProfile(openGraphProfile: OpenGraphProfile): readonly OpenGraphMeta[] {
	return [
		// BASIC_METADATA!
		...makeOpenGraphBase(openGraphProfile),

		// FIRST_NAME?
		...insertIf(openGraphProfile.ogProfileFirstName, makeOpenGraphMeta(PropertyProfile.OG_PROFILE_FIRST_NAME)),

		// LAST_NAME?
		...insertIf(openGraphProfile.ogProfileLastName, makeOpenGraphMeta(PropertyProfile.OG_PROFILE_LAST_NAME)),

		// USER_NAME?
		...insertIf(openGraphProfile.ogProfileUsername, makeOpenGraphMeta(PropertyProfile.OG_PROFILE_USERNAME)),

		// GENDER?
		...insertIf(openGraphProfile.ogProfileGender, makeOpenGraphMeta(PropertyProfile.OG_PROFILE_GENDER)),
	]
}
