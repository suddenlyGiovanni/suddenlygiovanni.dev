import type {
  BlogPosting,
  BreadcrumbList,
  Role,
  WebPage,
  WithContext,
} from 'schema-dts'

type RemoveRoleFromSchemaValue<T, TProperty extends string> = Exclude<
  T,
  Role<T, TProperty> | readonly Role<T, TProperty>[]
>

export function makeSchemaWebPage<SchemaWebPage extends Omit<WebPage, '@type'>>(
  schemaWebPage: SchemaWebPage
): Readonly<WithContext<WebPage>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    ...schemaWebPage,
  } as const
}

export function makeSchemaBlogPosting<
  SchemaBlogPosting extends Omit<BlogPosting, '@type'>
>(schemaBlogPosting: SchemaBlogPosting): Readonly<WithContext<BlogPosting>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    ...schemaBlogPosting,
  } as const
}

export function makeSchemaBreadcrumbList(
  itemListElement: RemoveRoleFromSchemaValue<
    BreadcrumbList['itemListElement'],
    'itemListElement'
  >
): Readonly<WithContext<BreadcrumbList>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  }
}
