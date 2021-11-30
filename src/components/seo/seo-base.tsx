import React from 'react'
import { Helmet } from 'react-helmet'

import { insertIf } from '../../lib/array'

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
}

export const SEOBase: React.VFC<Props> = (props) => {
  return (
    <Helmet
      title={props.title}
      titleTemplate={props.titleTemplate && `%s · ${props.titleTemplate}`}
      htmlAttributes={{ lang: props.siteLanguage || 'en_US' }}
      link={[{ href: props.url, rel: 'canonical' }]}
      meta={[
        { charSet: props.charSet || 'utf8' },

        /** the name of the application running in the web page. */
        ...insertIf(props.applicationName, {
          name: 'application-name',
          content: props.applicationName,
        }),

        /** the name of the document's author */
        ...insertIf(props.author, { name: 'author', content: props.author }),

        /**
         * a short and accurate summary of the content of the page.
         * Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
         */
        ...insertIf(props.description, {
          name: 'description',
          content: props.description,
        }),

        /** the identifier of the software that generated the page. */
        ...insertIf(props.generator, {
          name: 'generator',
          content: props.generator,
        }),

        /** words relevant to the page's content separated by commas. */
        ...insertIf(props.keywords, {
          name: 'keywords',
          content: props.keywords?.reduce(
            (keywords, keyword, idx) =>
              idx === 0 ? keyword : `${keywords}, ${keyword}`,
            ''
          ),
        }),

        /** the color schemes with which the document is compatible. */
        ...insertIf(props.colorScheme, {
          name: 'color-scheme',
          content: props.colorScheme,
        }),

        /** the name of the document's publisher. */
        ...insertIf(props.publisher, {
          name: 'publisher',
          content: props.publisher,
        }),

        /** the behavior that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list. */
        ...insertIf(
          props.robots,

          {
            name: 'robots',
            content: props.robots?.reduce(
              (robots, robot, idx) =>
                idx === 0 ? robot : `${robots}, ${robot}`,
              ''
            ),
          }
        ),

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
        ...insertIf(props.googlebot, {
          name: 'googlebot',
          content: props.googlebot?.reduce(
            (googlebot, robot, idx) =>
              idx === 0 ? robot : `${googlebot}, ${robot}`,
            ''
          ),
        }),
      ]}
    />
  )
}
