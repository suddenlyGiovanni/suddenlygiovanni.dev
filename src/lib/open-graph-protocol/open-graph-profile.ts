import { insertLazilyIf } from '@lib/array'
import { makeOpenGraphMeta } from './open-graph'

import type { BaseOrExtended, og, Types } from './open-graph'
import {
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
} from './open-graph-base'

export type profile<T extends string = ''> = BaseOrExtended<'profile', T>

interface ProfileType extends MetaBase<og<'type'>, Types.Enum<'profile'>> {}

export type PropertyProfile =
  | profile<'first_name'>
  | profile<'last_name'>
  | profile<'username'>
  | profile<'gender'>

interface ProfileMetadataBase<
  Property extends og<PropertyProfile>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

/**
 * A name normally given to an individual by a parent or self-chosen.
 * string
 */
interface ProfileFirstName
  extends ProfileMetadataBase<og<profile<'first_name'>>, Types.String> {}

/**
 * A name inherited from a family or marriage and by which the individual is commonly known.
 * string
 */
interface ProfileLastName
  extends ProfileMetadataBase<og<profile<'last_name'>>, Types.String> {}

/**
 * A short unique string to identify them.
 * string
 */
interface ProfileUsername
  extends ProfileMetadataBase<og<profile<'username'>>, Types.String> {}

/**
 * Gender
 */
interface ProfileGender
  extends ProfileMetadataBase<
    og<profile<'gender'>>,
    Types.Enum<'male' | 'female'>
  > {}

export type ProfileRecord =
  | ProfileType
  | ProfileFirstName
  | ProfileLastName
  | ProfileUsername
  | ProfileGender

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
      makeOpenGraphMeta('og:profile:first_name')
    ),

    // LAST_NAME?
    ...insertLazilyIf(
      openGraphProfile.ogProfileLastName,
      makeOpenGraphMeta('og:profile:last_name')
    ),

    // USER_NAME?
    ...insertLazilyIf(
      openGraphProfile.ogProfileUsername,
      makeOpenGraphMeta('og:profile:username')
    ),

    // GENDER?
    ...insertLazilyIf(
      openGraphProfile.ogProfileGender,
      makeOpenGraphMeta('og:profile:gender')
    ),
  ]
}
