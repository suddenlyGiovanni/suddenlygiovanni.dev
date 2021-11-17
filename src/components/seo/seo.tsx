import { useLocation } from '@reach/router'
import { Helmet } from 'react-helmet'

import { useSiteMetadata } from '../../hooks'
import { Facebook } from './facebook'
import { Twitter } from './twitter'

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
    // @ts-ignore
    keywords,
    defaultLocale,
    defaultLanguage,
    social: { twitterHandle },
    author: { name: defaultAuthor },
  } = siteMetadata

  const maxLength = (length: number) => (str: string) => str.slice(0, length)
  const maxLength70 = maxLength(70)
  const maxLength160 = maxLength(160)

  const seo = {
    title: title ? maxLength70(title) : maxLength70(defaultTitle),
    description: description
      ? maxLength160(description)
      : maxLength160(defaultDescription),
    titleTemplate: `%s · ${titleTemplate || defaultTitleTemplate}`,
    url: `${siteUrl}${pathname || localPathname}`,
    siteLanguage: siteLanguage || defaultLanguage,
    siteLocale: siteLocale || defaultLocale,
    datePublished: datePublished ? null : new Date(Date.now()).toISOString(),
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

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
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
    datePublished: seo.datePublished,
    dateModified: seo.dateModified,
    image: {
      '@type': 'ImageObject',
      url: seo.image,
    },
  }

  // Initial breadcrumb list

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl,
        name: 'Homepage',
      },
      position: 1,
    },
  ]

  let schemaArticle = null

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
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
    }
    // Push current blog post into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': seo.url,
        name: seo.title,
      },
      position: 2,
    })
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  }

  return (
    <>
      <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
        <html lang={seo.siteLanguage} />
        <link rel="canonical" href={seo.url} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />

        {!article && (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgWebPage)}
          </script>
        )}
        {article && (
          <script type="application/ld+json">
            {JSON.stringify(schemaArticle)}
          </script>
        )}
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
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
