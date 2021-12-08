import { insertLazilyIf, isArray } from '@lib/array'

import { makeOpenGraphMeta, type og, Types } from './open-graph'
import {
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
} from './open-graph-base'
import type { music } from './open-graph-music'

export type PropertyMusicRadioStation = music<'creator'>

interface MusicRadioStationMetaBase<
  Property extends og<PropertyMusicRadioStation>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

interface TypeMusicRadioStation
  extends MetaBase<og<'type'>, Types.Enum<music<'radio_station'>>> {}

/**
 * The creator of this station.
 * profile
 * @link ProfileMetadata
 */
interface MusicRadioStationCreator
  extends MusicRadioStationMetaBase<og<music<'creator'>>, Types.String> {}

export type RadioStationRecord =
  | TypeMusicRadioStation
  | MusicRadioStationCreator

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
    ...insertLazilyIf(
      openGraphMusicRadioStation.ogMusicCreator,
      (ogMusicCreator) =>
        isArray(ogMusicCreator)
          ? ogMusicCreator.map(makeOpenGraphMeta('og:music:creator'))
          : makeOpenGraphMeta({
              property: 'og:music:creator',
              content: ogMusicCreator,
            })
    ).flat(),
  ]
}
