import type { MetaFunction } from '@remix-run/node'
import { Link as RemixLink } from '@remix-run/react'
import { Types, makeOpenGraphWebsite } from '@suddenlygiovanni/open-graph-protocol'
import { T } from '@suddenlygiovanni/ui/components/typography/typography.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'
import type { ComponentPropsWithoutRef, JSX, ReactElement } from 'react'

import hero200wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_200.webp'
import hero811wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_811.webp'
import hero1200wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_1200.webp'
import hero1534wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_ar_1_1,c_fill,g_auto__c_scale,w_1534.webp'
import hero461wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_461.webp'
import hero929wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_929.webp'
import hero1293wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1293.webp'
import hero1804wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1804.webp'
import hero1826wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_1826.webp'
import hero2314wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2314.webp'
import hero2670wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2670.webp'
import hero2800wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import { config } from '~/config.ts'
import { routesRecord } from '~/routes-record.ts'

// biome-ignore lint/nursery/useComponentExportOnlyModules: Remix convention
export function meta({ location }: Parameters<MetaFunction>[number]) {
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

function Link({ className, ...props }: ComponentPropsWithoutRef<typeof RemixLink>): ReactElement {
	return (
		<RemixLink
			className={clsx(
				'decoration-wavy',
				'underline-offset-4',
				'underline',
				'decoration-auto',
				className,
			)}
			{...props}
		/>
	)
}

export default function Index(): JSX.Element {
	return (
		<article className={clsx('flex', 'w-full', 'flex-col', 'justify-start', 'font-comic')}>
			<T.h2>Hi! I'm Giovanni 👋</T.h2>
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
			<T.p>
				I am a self-taught <strong>software developer</strong>, a geek, and more generally a problem
				solver. I am also a young father of three and a committed husband.
			</T.p>
			<T.p>
				I was born in ☢️🌧 <strong>1986</strong> (you to do the math) and grew up in a small city by
				the 🌊 sea <strong>in the north-east of 🇮🇹 Italy</strong>.
			</T.p>

			<T.p>
				At the university, I <strong>📚 studied Modern History</strong>, but I never actually
				graduated. There I <strong>met the ❤️ love of my life</strong>, 👱🏻‍♀️ Morena, with whom I
				have been together ever since.
			</T.p>
			<T.p>
				Soon after college, we <strong>got 💍 married and started</strong> our own 👩‍❤️‍👨
				<strong>family</strong>. In 2014 our hearts became soo much bigger when 👶🏻 Enea come
				about. Four years later, 👶🏻 Elai managed to have the same effect on us.
			</T.p>

			<T.p>
				<strong>Kids</strong> are the <strong>most amazing thing</strong> that had happened to me.
				They <strong>changed my life</strong>. They <strong>brought</strong> so much{' '}
				<strong>clarity</strong>!
			</T.p>

			<T.p>
				Thanks to this new perspective, in <strong>2014</strong>, I decided to{' '}
				<strong>switch career</strong> and transition toward 💻 software engineering. That was the
				beginning of my unconventional journey toward becoming a software developer. For any further
				information, please{' '}
				<strong>
					refer to my <Link to={routesRecord.resume.url}>📑 résumé</Link>
				</strong>
				.
			</T.p>
			<T.p>
				I am an <strong>incredibly 👀 curious</strong> person by nature and a{' '}
				<strong>life long learner</strong>. <strong>Reading</strong>, <strong>thinking</strong>, and{' '}
				<strong>testing</strong> what I have learned <strong>is one of my life's joy</strong>.
				Programming has managed to scratch this itch for me ever since I picked it up.
			</T.p>

			<T.p>
				<strong>TypeScript</strong> is my language of choice. It has shaped the way I think soo much
				soo that now I'm seeing types, signatures, and contracts flowing around even in dynamically
				typed languages.
			</T.p>
			<T.p>
				<strong>I'm language-curious</strong>; my gaze is set on the <strong>functional</strong>{' '}
				side of the <strong>language</strong> spectrum with the end goal of, one day, picking up
				Haskell.
			</T.p>
			<T.p>
				<strong>I</strong> try <strong>not</strong> to <strong>concern</strong> myself too much{' '}
				<strong>with this</strong> library <strong>or that framework</strong> since, as time has
				proven many times over, they tend to come and go as the hype wagon moves on to the next
				thing.
			</T.p>
			<T.p>
				<strong>
					Instead, I prefer to have a better understanding of the underlying building blocks
				</strong>
				, which tend to be more stable: the language, the data structures, and the design patterns
				that enable the creation of higher levels of abstractions.
			</T.p>

			<T.p>
				<strong>Making stuff is really fulfilling for me</strong>.{' '}
				<strong>I just happened to choose to use code to do so</strong>, but I could definitely see
				myself as a 🪓 carpenter, working with wood, or as a 🧑🏻‍🍳 chef preparing some elaborate
				recipe or...
			</T.p>

			<T.p>
				I lived in 🇮🇹 Italy, 🇭🇷 Croatia, and 🇩🇪 Germany. Currently,{' '}
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
