import {
	type BasicRecord,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
	makeOpenGraphBase,
} from './open-graph-base.ts'
import type { music } from './open-graph-music.ts'
import {
	type MetaBase,
	type OpenGraphMeta,
	PropertyMusicRadioStation,
	type Types,
	makeOpenGraphMeta,
	type og,
} from './open-graph.ts'
import { insertIf } from './utils/array.ts'
import { isArray } from './utils/type-guards.ts'
import type { ValueOf } from './utils/types.ts'

export type IPropertyMusicRadioStation = ValueOf<typeof PropertyMusicRadioStation>

export type RadioStationRecord =
	| Exclude<BasicRecord, OgType>
	| OgTypeMusicRadioStation
	| OptionalRecord
	| OgMusicRadioStationCreator

type MusicRadioStationMetaBase<
	Property extends IPropertyMusicRadioStation,
	Content extends Types.Type,
> = MetaBase<Property, Content>

type OgTypeMusicRadioStation = MetaBase<og<'type'>, Types.Enum<music<'radio_station'>>>

/**
 * The creator of this station.
 * profile
 */
type OgMusicRadioStationCreator = MusicRadioStationMetaBase<og<music<'creator'>>, Types.String>

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
	openGraphMusicRadioStation: OpenGraphMusicRadioStation,
): readonly OpenGraphMeta[] {
	return [
		// BASIC_METADATA! + AUDIO!
		...makeOpenGraphBase(openGraphMusicRadioStation),

		// MUSIC_CREATOR?
		...insertIf(openGraphMusicRadioStation.ogMusicCreator, ogMusicCreator =>
			isArray(ogMusicCreator)
				? ogMusicCreator.map(makeOpenGraphMeta(PropertyMusicRadioStation.OG_MUSIC_CREATOR))
				: makeOpenGraphMeta(PropertyMusicRadioStation.OG_MUSIC_CREATOR, ogMusicCreator),
		).flat(),
	]
}
