import { type ValueOf, insertLazilyIf } from '@suddenlyGiovanni/open-graph-protocol-utils'

import { type BaseOrExtended, makeOpenGraphMeta, MetaBase, type og, type Types } from './open-graph'
import {
  type BasicRecord,
  makeOpenGraphBase,
  type OpenGraphBaseWithOptional,
  type OptionalRecord,
  type OgType,
} from './open-graph-base'

type profile<T extends string = ''> = BaseOrExtended<'profile', T>

export type PropertyProfile = ValueOf<typeof PropertyProfile>
export const PropertyProfile = {
  OG_PROFILE_FIRST_NAME: 'og:profile:first_name',
  OG_PROFILE_LAST_NAME: 'og:profile:last_name',
  OG_PROFILE_USERNAME: 'og:profile:username',
  OG_PROFILE_GENDER: 'og:profile:gender',
} as const

export type ProfileRecord =
  | Exclude<BasicRecord, OgType>
  | OgTypeProfile
  | OptionalRecord
  | OgProfileFirstName
  | OgProfileLastName
  | OgProfileUsername
  | OgProfileGender

interface ProfileMetaBase<Property extends PropertyProfile, Content extends Types.Type>
  extends MetaBase<Property, Content> {}

interface OgTypeProfile extends MetaBase<og<'type'>, Types.Enum<'profile'>> {}

/**
 * A name normally given to an individual by a parent or self-chosen.
 * string
 */
interface OgProfileFirstName extends ProfileMetaBase<og<profile<'first_name'>>, Types.String> {}

/**
 * A name inherited from a family or marriage and by which the individual is commonly known.
 * string
 */
interface OgProfileLastName extends ProfileMetaBase<og<profile<'last_name'>>, Types.String> {}

/**
 * A short unique string to identify them.
 * string
 */
interface OgProfileUsername extends ProfileMetaBase<og<profile<'username'>>, Types.String> {}

/**
 * Gender
 */
interface OgProfileGender
  extends ProfileMetaBase<og<profile<'gender'>>, Types.Enum<'male' | 'female'>> {}

interface OpenGraphProfile extends OpenGraphBaseWithOptional {
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
    ...insertLazilyIf(
      openGraphProfile.ogProfileFirstName,
      makeOpenGraphMeta(PropertyProfile.OG_PROFILE_FIRST_NAME)
    ),

    // LAST_NAME?
    ...insertLazilyIf(
      openGraphProfile.ogProfileLastName,
      makeOpenGraphMeta(PropertyProfile.OG_PROFILE_LAST_NAME)
    ),

    // USER_NAME?
    ...insertLazilyIf(
      openGraphProfile.ogProfileUsername,
      makeOpenGraphMeta(PropertyProfile.OG_PROFILE_USERNAME)
    ),

    // GENDER?
    ...insertLazilyIf(
      openGraphProfile.ogProfileGender,
      makeOpenGraphMeta(PropertyProfile.OG_PROFILE_GENDER)
    ),
  ]
}
