import { useLocation } from '@reach/router'
import React from 'react'
import { Helmet } from 'react-helmet'

import { insertIf, insertLazilyIf } from '../../lib/array'

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
  readonly title: string

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
  readonly siteLanguage?: string

  readonly charSet?: string | 'utf8'

  /** the name of the application running in the web page. */
  readonly applicationName?: string

  /**
   * helps webmasters prevent duplicate content issues by specifying the "canonical" or "preferred" version of a web page as part of search engine optimization.
   */
  readonly url: string

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
}

export const SEOBase: React.VFC<Props> = (props) => {
  const location = useLocation()

  return (
    <Helmet
      title={props.title}
      titleTemplate={props.titleTemplate && `%s · ${props.titleTemplate}`}
      htmlAttributes={{ lang: props.siteLanguage || 'en_US' }}
      link={[{ href: props.url, rel: 'canonical' }]}
      meta={[
        { charSet: props.charSet || 'utf8' },

        /** the name of the application running in the web page. */
        ...insertLazilyIf(props.applicationName, (applicationName) => ({
          name: 'application-name',
          content: applicationName,
        })),

        /** the name of the document's author */
        ...insertLazilyIf(props.author, (author) => ({
          name: 'author',
          content: author,
        })),

        /**
         * a short and accurate summary of the content of the page.
         * Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
         */
        ...insertLazilyIf(props.description, (description) => ({
          name: 'description',
          content: description,
        })),

        /** the identifier of the software that generated the page. */
        ...insertLazilyIf(props.generator, (generator) => ({
          name: 'generator',
          content: generator,
        })),

        /** words relevant to the page's content separated by commas. */
        ...insertLazilyIf(props.keywords, (keywords) => ({
          name: 'keywords',
          content: toCommaSeparatedStringList(keywords),
        })),

        /** the color schemes with which the document is compatible. */
        ...insertLazilyIf(props.colorScheme, (colorScheme) => ({
          name: 'color-scheme',
          content: colorScheme,
        })),

        /** the name of the document's publisher. */
        ...insertLazilyIf(props.publisher, (publisher) => ({
          name: 'publisher',
          content: publisher,
        })),

        /** the behavior that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list. */
        ...insertLazilyIf(props.robots, (robots) => ({
          name: 'robots',
          content: toCommaSeparatedStringList(robots),
        })),

        /**
         * the name of the creator of the document, such as an organization or institution.
         * If there are more than one, several <meta> elements should be used.
         */
        ...(props.creator
          ? props.creator.map((creator) => ({
              name: 'creator',
              content: creator,
            }))
          : []),

        /**
         * a synonym of robots, is only followed by Googlebot (the indexing crawler for Google)
         */
        ...insertLazilyIf(props.googlebot, (googlebot) => {
          return {
            name: 'googlebot',
            content: toCommaSeparatedStringList(googlebot),
          }
        }),
        // TODO: insert open graph data

        ...insertIf(props.meta, ...(props.meta || [])),
      ]}
    />
  )
}

function toCommaSeparatedStringList<T extends string>(
  elements: readonly T[]
): string {
  return elements.reduce(
    (stringAcc, element, idx) =>
      idx === 0 ? element : `${stringAcc}, ${element}`,
    ''
  )
}
