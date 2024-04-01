import { insertIf, isArray, type ValueOf } from '@suddenlygiovanni/open-graph-protocol-utils'

import {
  makeOpenGraphMeta,
  type MetaBase,
  type og,
  PropertyMusicRadioStation,
  Types,
} from './open-graph'
import {
  type BasicRecord,
  makeOpenGraphBase,
  type OgType,
  type OpenGraphBaseWithOptional,
  type OptionalRecord,
} from './open-graph-base'
import type { music } from './open-graph-music'

export type IPropertyMusicRadioStation = ValueOf<typeof PropertyMusicRadioStation>

export type RadioStationRecord =
  | Exclude<BasicRecord, OgType>
  | OgTypeMusicRadioStation
  | OptionalRecord
  | OgMusicRadioStationCreator

interface MusicRadioStationMetaBase<
  Property extends IPropertyMusicRadioStation,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

interface OgTypeMusicRadioStation
  extends MetaBase<og<'type'>, Types.Enum<music<'radio_station'>>> {}

/**
 * The creator of this station.
 * profile
 */
interface OgMusicRadioStationCreator
  extends MusicRadioStationMetaBase<og<music<'creator'>>, Types.String> {}

interface OpenGraphMusicRadioStation extends OpenGraphBaseWithOptional {
  /** 'music.radio_station */
  ogType: Types.Enum<'music.radio_station'>

  /**
   * The URL of the actual radio stream
   */
  ogAudio: Types.URL

  /**
   * The creator of this radio station.
   * This is a URL of a page with og type profile.
   * Multiple music:creator tags can be specified.
   */
  ogMusicCreator?: Types.URL | readonly Types.URL[]
}

export function makeOpenGraphMusicRadioStation(
  openGraphMusicRadioStation: OpenGraphMusicRadioStation
) {
  return [
    // BASIC_METADATA! + AUDIO!
    ...makeOpenGraphBase(openGraphMusicRadioStation),

    // MUSIC_CREATOR?
    ...insertIf(openGraphMusicRadioStation.ogMusicCreator, (ogMusicCreator) =>
      isArray(ogMusicCreator)
        ? ogMusicCreator.map(makeOpenGraphMeta(PropertyMusicRadioStation.OG_MUSIC_CREATOR))
        : makeOpenGraphMeta(PropertyMusicRadioStation.OG_MUSIC_CREATOR, ogMusicCreator)
    ).flat(),
  ]
}
