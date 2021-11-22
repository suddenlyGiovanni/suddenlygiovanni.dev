import * as S from 'schema-dts'

export interface MakeSchemaWebPage {
  (
    schemaObj: {
      title: Pick<S.WebPage, 'name'>['name']
      author: Omit<
        Extract<
          Pick<S.WebPage, 'author'>['author'],
          Exclude<S.Person, string | S.Patient>
        >,
        '@type'
      >
    } & Pick<
      S.WebPage,
      'url' | 'headline' | 'inLanguage' | 'mainEntityOfPage' | 'description'
    >
  ): S.WithContext<S.WebPage>
}

/**
 * FIXME: TS rule: be generic in the accepted inputs
 * FIXME: TS rule: be very precise with the outputs
 */
export const schemaOrgWebPage: MakeSchemaWebPage = ({
  url,
  headline,
  inLanguage,
  mainEntityOfPage,
  description,
  title,
  author,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url,
  headline,
  inLanguage,
  mainEntityOfPage,
  description,
  name: title,
  author: {
    '@type': 'Person',
    ...author,
  },
  // TODO: continue!!!
})
