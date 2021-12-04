import { useLocation } from '@reach/router'
import React from 'react'
import { Helmet } from 'react-helmet'

import { useSiteMetadata } from '../../hooks'
import { insertIf, insertLazilyIf } from '../../lib/array'
import { Types } from './meta.open-graph-protocol'
import { makeTwitterCard } from './twitter-card'

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

interface Props {
  /**
   * Defines the document's title that is shown in a browser's title bar or a page's tab.
   */
  readonly title?: string

  /**
   * Useful when you want titles to inherit from a template:
   * @example
   * <Helmet titleTemplate="%s | MyAwesomeWebsite.com">
   *     <title>Nested Title</title>
   * </Helmet>
   * <!-- outputs: -->
   * <head>
   *     <title>Nested Title | MyAwesomeWebsite.com</title>
   * </head>
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

export const SEOBase: React.VFC<Props> = (props) => {
  const siteMetadata = useSiteMetadata()
  const location = useLocation()

  const seoTitle = props.title || siteMetadata.title
  const seoTitleTemplate = props.titleTemplate || siteMetadata.titleTemplate
  const seoCanonical = props.locationPathname || location.pathname
  const seoDescription = props.description || siteMetadata.description
  const seoKeywords = props.keywords || siteMetadata.keywords
  const seoLang = props.language || siteMetadata.language
  const seoImageSrc = props.image || siteMetadata.image
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
      link={[{ href: `${siteMetadata.url}${seoCanonical}`, rel: 'canonical' }]}
      meta={[
        { charSet: props.charSet || 'utf8' },

        /** the name of the application running in the web page. */
        ...insertLazilyIf(props.applicationName, (applicationName) => ({
          name: 'application-name',
          content: applicationName,
        })),

        /** the name of the document's author */
        ...insertLazilyIf(seoAuthor, (author) => ({
          name: 'author',
          content: author,
        })),

        /**
         * a short and accurate summary of the content of the page.
         * Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
         */
        ...insertLazilyIf(seoDescription, (description) => ({
          name: 'description',
          content: description,
        })),

        /** the identifier of the software that generated the page. */
        ...insertLazilyIf(seoGenerator, (generator) => ({
          name: 'generator',
          content: generator,
        })),

        /** words relevant to the page's content separated by commas. */
        ...insertLazilyIf(seoKeywords, (keywords) => ({
          name: 'keywords',
          content: toCommaSeparatedStringList(keywords),
        })),

        /** the color schemes with which the document is compatible. */
        ...insertLazilyIf(seoColorScheme, (colorScheme) => ({
          name: 'color-scheme',
          content: colorScheme,
        })),

        /** the name of the document's publisher. */
        ...insertLazilyIf(seoPublisher, (publisher) => ({
          name: 'publisher',
          content: publisher,
        })),

        /** the behavior that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list. */
        ...insertLazilyIf(seoRobots, (robots) => ({
          name: 'robots',
          content: toCommaSeparatedStringList(robots),
        })),

        /**
         * a synonym of robots, is only followed by Googlebot (the indexing crawler for Google)
         */
        ...insertLazilyIf(seoGooglebot, (googlebot) => ({
          name: 'googlebot',
          content: toCommaSeparatedStringList(googlebot),
        })),

        /**
         * the name of the creator of the document, such as an organization or institution.
         * If there are more than one, several <meta> elements should be used.
         */
        ...(seoCreator
          ? seoCreator.map((creator) => ({
              name: 'creator',
              content: creator,
            }))
          : []),

        // TODO: insert open graph data

        // TODO: insert Twitter card open graph data
        ...makeTwitterCard({
          card: Types.Enum('summary_large_image'),
          title: Types.String(seoTitle),
          site: Types.String(seoTwitter),
          siteID: Types.String(seoTwitter),
          creatorID: Types.String(seoTwitter),
          creator: Types.String(toCommaSeparatedStringList(seoCreator)),
          description: Types.String(seoDescription),
          image: Types.URL(seoImageSrc),
          imageAlt: Types.String(seoImageAlt),
          // TODO: finish inserting all the relevant properties
        }),

        ...insertIf(props.meta, ...(props.meta || [])),
      ]}
    />
  )
}

function toCommaSeparatedStringList<T extends string>(
  elements: readonly T[]
): string {
  return elements.join(', ')
}
