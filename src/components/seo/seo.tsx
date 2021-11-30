import { useLocation } from '@reach/router'
import { Helmet } from 'react-helmet'

import { useSiteMetadata } from '../../hooks'
import * as Strings from '../../lib/string'
import { Facebook } from './facebook'
import { ScriptLdJSON } from './script-ld-json'
import {
  makeSchemaBlogPosting,
  makeSchemaBreadcrumbList,
  makeSchemaWebPage,
} from './structured-data'
import { Twitter } from './twitter'

const maxLength70 = Strings.maxLength(70)
const maxLength160 = Strings.maxLength(160)

interface Props {
  title: string
  titleTemplate: string
  description: string
  pathname: string
  article: boolean
  image: string
  siteLanguage: string
  siteLocale: string
  author: string
  datePublished: string
  dateModified: string
}

export const SEO: React.VFC<Partial<Readonly<Props>>> = ({
  title,
  titleTemplate,
  description,
  pathname,
  article = false,
  image,
  siteLanguage,
  siteLocale,
  author,
  datePublished,
  dateModified,
}) => {
  const siteMetadata = useSiteMetadata()
  const { pathname: localPathname } = useLocation()

  const {
    defaultTitle,
    titleTemplate: defaultTitleTemplate,
    defaultDescription,
    siteUrl,
    buildTime,
    defaultImage,

    // keywords,
    defaultLocale,
    defaultLanguage,
    social: { twitterHandle },
    author: { name: defaultAuthor },
  } = siteMetadata

  const seo = {
    title: title ? maxLength70(title) : maxLength70(defaultTitle),
    description: description
      ? maxLength160(description)
      : maxLength160(defaultDescription),
    titleTemplate: `%s · ${titleTemplate || defaultTitleTemplate}`,
    url: `${siteUrl}${pathname || localPathname}`,
    siteLanguage: siteLanguage || defaultLanguage,
    siteLocale: siteLocale || defaultLocale,
    datePublished: datePublished
      ? undefined
      : new Date(Date.now()).toISOString(),
    dateModified: dateModified || new Date(buildTime).toISOString(),
    author: author || defaultAuthor,
    image: image || defaultImage,
  }

  const copyrightYear = new Date().getFullYear()

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')
  // Structured Data Testing Tool >>
  // https://search.google.com/structured-data/testing-tool

  return (
    <>
      <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
        <html lang={seo.siteLanguage} />
        <link rel="canonical" href={seo.url} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />

        {article ? (
          // it is a blog article
          <>
            <ScriptLdJSON
              schema={makeSchemaBlogPosting({
                author: {
                  '@type': 'Person',
                  name: seo.author,
                },
                copyrightHolder: {
                  '@type': 'Person',
                  name: seo.author,
                },
                copyrightYear,
                creator: {
                  '@type': 'Person',
                  name: seo.author,
                },
                publisher: {
                  '@type': 'Organization',
                  name: seo.author,
                  logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}${defaultImage}`,
                  },
                },
                datePublished: seo.datePublished,
                dateModified: seo.dateModified,
                description: seo.description,
                headline: seo.title,
                inLanguage: siteLanguage,
                url: seo.url,
                name: seo.title,
                image: {
                  '@type': 'ImageObject',
                  url: seo.image,
                },
                mainEntityOfPage: seo.url,
              })}
            />
            <ScriptLdJSON
              schema={makeSchemaBreadcrumbList([
                {
                  '@type': 'ListItem',
                  item: {
                    '@id': siteUrl,
                    name: 'Homepage',
                  },
                  position: 1,
                },
                {
                  '@type': 'ListItem',
                  item: {
                    '@id': seo.url,
                    name: seo.title,
                  },
                  position: 2,
                },
              ])}
            />
          </>
        ) : (
          // it is a regular webpage
          <>
            <ScriptLdJSON
              schema={makeSchemaWebPage({
                url: siteUrl,
                headline: seo.description,
                inLanguage: siteLanguage,
                mainEntityOfPage: siteUrl,
                description: seo.description,
                name: seo.title,
                author: {
                  '@type': 'Person',
                  name: seo.author,
                },
                copyrightHolder: {
                  '@type': 'Person',
                  name: seo.author,
                },
                copyrightYear,
                creator: {
                  '@type': 'Person',
                  name: seo.author,
                },
                publisher: {
                  '@type': 'Person',
                  name: seo.author,
                },
                datePublished: seo.datePublished || undefined,
                dateModified: seo.dateModified,
                image: {
                  '@type': 'ImageObject',
                  url: seo.image,
                },
              })}
            />
            <ScriptLdJSON
              schema={makeSchemaBreadcrumbList([
                {
                  '@type': 'ListItem',
                  item: {
                    '@id': siteUrl,
                    name: 'Homepage',
                  },
                  position: 1,
                },
              ])}
            />
          </>
        )}
      </Helmet>

      <>
        <Facebook
          desc={seo.description}
          image={seo.image}
          title={seo.title}
          type={article ? 'article' : 'website'}
          url={seo.url}
          locale={seo.siteLocale}
        />
        <Twitter
          title={seo.title}
          image={seo.image}
          desc={seo.description}
          username={twitterHandle}
        />
      </>
    </>
  )
}
