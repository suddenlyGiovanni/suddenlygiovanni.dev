import type { MetaFunction } from '@remix-run/node'
import type { JSX } from 'react'
import { T } from '@suddenly-giovanni/ui'
import hero200wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_200.webp'
import hero811wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_811.webp'
import hero1200wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_1200.webp'
import hero1534wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_1534.webp'
import hero929wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_929.webp'
import hero461wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_461.webp'
import hero1293wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1293.webp'
import hero1826wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1826.webp'
import hero1804wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1804.webp'
import hero2314wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2314.webp'
import hero2670wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2670.webp'
import hero2800wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'

export const meta: MetaFunction = () => {
	return [{ title: 'About me' }, { name: 'description', content: 'All about Giovanni Ravalico' }]
}

const sourceSrcSet = [
	`${hero200wAssetUrl} 200w`,
	`${hero811wAssetUrl} 811w`,
	`${hero1200wAssetUrl} 1200w`,
	`${hero1534wAssetUrl} 1534w`,
].join(', ')

const imgSrcSet = [
	`${hero461wAssetUrl} 461w`,
	`${hero929wAssetUrl} 929w`,
	`${hero1293wAssetUrl} 1293w`,
	`${hero1826wAssetUrl} 1826w`,
	`${hero1804wAssetUrl} 1804w`,
	`${hero2314wAssetUrl} 2314w`,
	`${hero2670wAssetUrl} 2670w`,
	`${hero2800wAssetUrl} 2800w`,
].join(', ')

export default function Index(): JSX.Element {
	return (
		<article className="flex w-full flex-col justify-start ">
			<T.h2>About me page</T.h2>
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
		</article>
	)
}
