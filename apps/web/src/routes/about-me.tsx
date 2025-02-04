import type { ComponentPropsWithoutRef, ReactElement } from 'react'
import { Link as RouterLink } from 'react-router'

import { Types, makeOpenGraphWebsite } from '@suddenlygiovanni/open-graph-protocol'
import { T } from '@suddenlygiovanni/ui/components/typography/typography.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'

import hero200wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_200.webp'
import hero811wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_811.webp'
import hero1200wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_1200.webp'
import hero1534wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_1534.webp'
import hero461wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_461.webp'
import hero929wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_929.webp'
import hero1293wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1293.webp'
import hero1804wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1804.webp'
import hero1826wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1826.webp'
import hero2314wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2314.webp'
import hero2670wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2670.webp'
import hero2800wAssetUrl from 'content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import AboutMeContentV1 from 'content/copy/about-me-v1.md'
import AboutMeContentV2 from 'content/copy/about-me-v2.md'
import { config } from '#config.ts'

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

function Link({ className, ...props }: ComponentPropsWithoutRef<typeof RouterLink>): ReactElement {
	return (
		<RouterLink
			className={clsx('underline decoration-auto decoration-wavy underline-offset-4', className)}
			{...props}
		/>
	)
}

console.log(AboutMeContentV2)

export default function AboutMe(_: Route.ComponentProps): ReactElement {
	return (
		<article className={clsx('flex w-full flex-col justify-start ')}>
			<T.h2 className={clsx('font-comic')}>
				Hi! I'm Giovanni{' '}
				<div className={clsx('inline-block animate-wiggle hover:animate-none')}>👋</div>
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

			<AboutMeContentV1 />

			<AboutMeContentV2 />

			<T.p>
				I lived in 🇮 Italy, 🇭 Croatia, and 🇩 Germany. Currently,{' '}
				<strong>I'm located in Berlin, Germany</strong>.
			</T.p>

			<T.p>
				You can <strong>find me on</strong>{' '}
				<T.a
					href={config.socials.Twitter.url}
					target="_blank"
					rel="noreferrer"
				>
					🐦 Twitter
				</T.a>
				,{' '}
				<T.a
					href={config.socials.GitHub.url}
					target="_blank"
					rel="noreferrer"
				>
					🐙 GitHub
				</T.a>
				, and{' '}
				<T.a
					href={config.socials.LinkedIn.url}
					target="_blank"
					rel="noreferrer"
				>
					🦵 LinkedIn
				</T.a>
				.
			</T.p>
		</article>
	)
}
