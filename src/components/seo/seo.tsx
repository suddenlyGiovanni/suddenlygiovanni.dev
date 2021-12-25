import { useSiteMetadata } from '@hooks/index'
import { insertIf, insertLazilyIf } from '@lib/array'

import { useLocation } from '@reach/router'
import {
  makeOpenGraphTwitterCard,
  makeOpenGraphWebsite,
  Types,
} from '@suddenlygiovanni/open-graph-protocol'
import React from 'react'
import { Helmet } from 'react-helmet'

type Robots = readonly (
  | 'index'
  | 'noindex'
  | 'follow'
  | 'nofollow'
  | 'all'
  | 'none'
  | 'noarchive'
  | 'nosnippet'
  | 'noimageindex'
  | 'nocache'
)[]

function toCommaSeparatedString<T extends string>(
  elements: readonly T[]
): string {
  return elements.join(', ')
}

interface MetaAttributes<
  Name extends string = string,
  Content extends string = string
> {
  readonly name: Name
  readonly content: Content
}

function makeMeta<Name extends string, Content extends string>(
  name: Name
): (content: Content) => MetaAttributes<Name, Content> {
  return (content) => ({ name, content })
}

interface Props {
  /**
   * Defines the document's title that is shown in a browser's title bar or a page's tab.
   */
  readonly title?: string

  /**
   * Useful when you want titles to inherit from a template:
   * @example
   * ```html
   * <Helmet titleTemplate="%s | MyAwesomeWebsite.com">
   *     <title>Nested Title</title>
   * </Helmet>
   * <!-- outputs: -->
   * <head>
   *     <title>Nested Title | MyAwesomeWebsite.com</title>
   * </head>
   * ```
   */
  readonly titleTemplate?: string

  /**
   * the language for the site
   */
  readonly language?: string

  readonly charSet?: string | 'utf8'

  /** the name of the application running in the web page. */
  readonly applicationName?: string

  /**
   * helps webmasters prevent duplicate content issues by specifying the "canonical" or "preferred" version of a web page as part of search engine optimization.
   */
  readonly url?: string

  /** the name of the document's author */
  readonly author?: string

  /**
   * a short and accurate summary of the content of the page.
   * Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
   */
  readonly description?: string

  /**
   * the identifier of the software that generated the page.
   */
  readonly generator?: string

  /**
   * words relevant to the page's content
   */
  readonly keywords?: readonly string[]

  /** the color schemes with which the document is compatible. */
  readonly colorScheme?:
    | 'light'
    | 'dark'
    | 'light dark'
    | 'normal'
    | 'only light'

  /**
   * the name of the creator of the document, such as an organization or institution.
   */
  readonly creator?: string[]

  /**
   * a synonym of robots, is only followed by Googlebot (the indexing crawler for Google)
   */
  readonly googlebot?: Exclude<Robots, 'nocache'[]>

  /** the name of the document's publisher. */
  readonly publisher?: string

  /** the behavior that cooperative crawlers, or "robots", should use with the page */
  readonly robots?: Robots

  /**
   * additional metadata to attach to the head
   */
  readonly meta?: JSX.IntrinsicElements['meta'][]

  /**
   * Is a USVString containing an initial '/' followed by the path of the URL, not including the query string or fragment.
   */
  readonly locationPathname?: string

  /**
   * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
   */
  readonly image?: string

  /**
   * A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters
   */
  readonly imageAlt?: string

  readonly social?: {
    readonly github: string
    readonly twitter: string
    readonly linkedin: string
  }
}

export const SEO: React.VFC<Props> = (props) => {
  const siteMetadata = useSiteMetadata()
  const location = useLocation()

  const seoTitle = props.title || siteMetadata.title
  const seoTitleTemplate = props.titleTemplate || siteMetadata.titleTemplate
  const seoCanonical = props.locationPathname || location.pathname
  const seoUrl = `${siteMetadata.url}${seoCanonical}` as const
  const seoDescription = props.description || siteMetadata.description
  const seoKeywords = props.keywords || siteMetadata.keywords
  const seoLang = props.language || siteMetadata.language
  const seoImageSrc = props.image || seoUrl + siteMetadata.image
  const seoImageAlt = props.imageAlt || siteMetadata.imageAlt
  const seoGenerator = props.generator || 'GatsbyJS'
  const seoAuthor = props.author || siteMetadata.author.name
  const seoPublisher = props.publisher || siteMetadata.social.github
  const seoCreator = props.creator || [seoAuthor, siteMetadata.social.github]
  const seoColorScheme = props.colorScheme || ('only light' as const)
  const seoRobots = props.robots || (['index'] as const)
  const seoGooglebot = props.googlebot || seoRobots
  const seoTwitter =
    (props.social && props.social.twitter) || siteMetadata.social.twitter

  return (
    <Helmet
      title={seoTitle}
      titleTemplate={`%s · ${seoTitleTemplate}`}
      htmlAttributes={{ lang: seoLang, prefix: 'og: http://ogp.me/ns#' }}
      link={[{ href: seoUrl, rel: 'canonical' }]}
      meta={[
        { charSet: props.charSet || 'utf8' },

        /** the name of the application running in the web page. */
        ...insertLazilyIf(props.applicationName, makeMeta('application-name')),

        /** the name of the document's author */
        ...insertLazilyIf(seoAuthor, makeMeta('author')),

        /**
         * a short and accurate summary of the content of the page.
         * Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
         */
        ...insertLazilyIf(seoDescription, makeMeta('description')),

        /** the identifier of the software that generated the page. */
        ...insertLazilyIf(seoGenerator, makeMeta('generator')),

        /** words relevant to the page's content separated by commas. */
        ...insertLazilyIf(seoKeywords, (keywords) =>
          makeMeta('keywords')(toCommaSeparatedString(keywords))
        ),

        /** the color schemes with which the document is compatible. */
        ...insertLazilyIf(seoColorScheme, makeMeta('color-scheme')),

        /** the name of the document's publisher. */
        ...insertLazilyIf(seoPublisher, makeMeta('publisher')),

        /** the behavior that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list. */
        ...insertLazilyIf(seoRobots, (robots) =>
          makeMeta('robots')(toCommaSeparatedString(robots))
        ),

        /**
         * a synonym of robots, is only followed by Googlebot (the indexing crawler for Google)
         */
        ...insertLazilyIf(seoGooglebot, (googlebot) =>
          makeMeta('googlebot')(toCommaSeparatedString(googlebot))
        ),

        /**
         * the name of the creator of the document, such as an organization or institution.
         * If there are more than one, several <meta> elements should be used.
         */
        ...(seoCreator ? seoCreator.map(makeMeta('creator')) : []),

        // TODO: insert open graph data

        ...makeOpenGraphWebsite({
          ogTitle: Types.String(seoTitle),
          ogType: Types.Enum('website'),
          ogUrl: Types.URL(seoUrl),
          ogImage: Types.URL(seoImageSrc),
          ogDescription: Types.String(seoDescription),
          ogDeterminer: Types.Enum('auto'),
          ogLocale: Types.String(seoLang),
        }),

        // TODO: insert Twitter card open graph data
        // FIXME: enable further editing for case 'Article'
        ...makeOpenGraphTwitterCard({
          twitterCard: Types.Enum('summary_large_image'),
          twitterTitle: Types.String(seoTitle),
          twitterSite: Types.String(seoTwitter),
          twitterSiteID: Types.String(seoTwitter),
          twitterCreatorID: Types.String(seoTwitter),
          twitterCreator: Types.String(toCommaSeparatedString(seoCreator)),
          twitterDescription: Types.String(seoDescription),
          twitterImage: Types.URL(seoImageSrc),
          twitterImageAlt: Types.String(seoImageAlt),
        }),

        ...insertIf(props.meta, ...(props.meta || [])),
      ]}
    />
  )
}
