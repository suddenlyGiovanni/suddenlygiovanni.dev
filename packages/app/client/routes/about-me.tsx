import type { ReactElement } from 'react'

import { Types, makeOpenGraphWebsite } from '@suddenly-giovanni/open-graph-protocol'
import { T } from '@suddenly-giovanni/ui/components/typography/typography.tsx'
import { clsx } from '@suddenly-giovanni/ui/lib/utils.ts'

import hero200wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_200.webp?url'
import hero811wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_811.webp?url'
import hero1200wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_1200.webp?url'
import hero1534wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_1534.webp?url'
import hero461wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_461.webp?url'
import hero929wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_929.webp?url'
import hero1293wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1293.webp?url'
import hero1804wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1804.webp?url'
import hero1826wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1826.webp?url'
import hero2314wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2314.webp?url'
import hero2670wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2670.webp?url'
import hero2800wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp?url'
import AboutMeContent from '#root/content/copy/about-me-v4.md'

import { config } from '#root/client/config.ts'

// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { Route } from './+types/about-me.ts'

// biome-ignore lint/nursery/useExplicitType: <explanation>
export function meta({ location }: Route.MetaArgs) {
	const description = 'All about Giovanni Ravalico'
	const title = `${config.siteName} | About me`
	return [
		{ title },
		{ name: 'description', content: description },
		makeOpenGraphWebsite({
			ogDescription: Types.String(description),
			ogImage: Types.URL(config.siteUrl + hero2800wAssetUrl),
			ogTitle: Types.String(title),
			ogType: Types.Enum('website'),
			ogUrl: Types.URL(config.siteUrl + location.pathname),
		}),
	]
}

export type PrependIfDefined<T extends string, S extends string> = T extends '' ? T : `${S}${T}`

export type ConcatSeparator<T extends string[], S extends string> = T extends [
	infer F extends string,
	...infer R extends string[],
]
	? `${F}${PrependIfDefined<ConcatSeparator<R, S>, S>}`
	: ''

const concatSeparator =
	<S extends string>(separator: S) =>
	<T extends string[]>(...strings: T): ConcatSeparator<T, S> =>
		strings.join(separator) as ConcatSeparator<T, S>

const sourceSrcSet = concatSeparator(', ')(
	`${hero200wAssetUrl} 200w`,
	`${hero811wAssetUrl} 811w`,
	`${hero1200wAssetUrl} 1200w`,
	`${hero1534wAssetUrl} 1534w`,
)

const imgSrcSet = concatSeparator(', ')(
	`${hero461wAssetUrl} 461w`,
	`${hero929wAssetUrl} 929w`,
	`${hero1293wAssetUrl} 1293w`,
	`${hero1826wAssetUrl} 1826w`,
	`${hero1804wAssetUrl} 1804w`,
	`${hero2314wAssetUrl} 2314w`,
	`${hero2670wAssetUrl} 2670w`,
	`${hero2800wAssetUrl} 2800w`,
)

export default function AboutMe(_: Route.ComponentProps): ReactElement {
	return (
		<article
			className={clsx(
				'prose dark:prose-invert flex w-full max-w-full flex-col justify-start font-comic',
			)}
			style={{ fontSynthesisWeight: 'initial' }}
		>
			<T.h2 className={clsx('font-comic')}>
				<div className={clsx('inline-block animate-wiggle hover:animate-none')}>👋</div> Hi, I'm
				Giovanni!
			</T.h2>
			<picture>
				<source
					media="(max-width: 767px)"
					sizes="(max-width: 1534px) 100vw, 1534px"
					srcSet={sourceSrcSet}
				/>
				<img
					alt="Giovanni Ravalico"
					className="w-full"
					sizes="(max-width: 4667px) 60vw, 2800px"
					src={hero2800wAssetUrl}
					srcSet={imgSrcSet}
				/>
			</picture>

			<AboutMeContent />
		</article>
	)
}
