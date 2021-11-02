interface LinkTo<
  To extends string,
  Title extends string,
  Description extends string
> {
  readonly urlPathFragment: To
  readonly description: Description
  readonly title: Title
}

export type MapKeys =
  | 'blog'
  | 'reading-journal'
  | 'about-me'
  | 'resume'
  | 'motivations'

export interface Blog extends LinkTo<'/blog', 'blog', 'Go to blog page'> {}

export interface ReadingJournal
  extends LinkTo<
    '/reading-journal',
    'reading journal',
    'Go to reading journal page'
  > {}

export interface AboutMe
  extends LinkTo<'/', 'about me', 'Go to about me page'> {}

export interface Resume
  extends LinkTo<'/resume', 'résumé', 'Go to resume page'> {}

export interface Motivations
  extends LinkTo<'/motivations', 'motivations', 'Go to my motivations'> {}

type LinksMap = ReadonlyMap<
  MapKeys,
  Blog | ReadingJournal | AboutMe | Resume | Motivations
>
export const linksMap: LinksMap = new Map([
  [
    'about-me',
    {
      title: 'about me',
      urlPathFragment: '/',
      description: 'Go to about me page',
    },
  ],
  [
    'blog',
    {
      title: 'blog',
      urlPathFragment: '/blog',
      description: 'Go to blog page',
    },
  ],
  [
    'reading-journal',
    {
      title: 'reading journal',
      urlPathFragment: '/reading-journal',
      description: 'Go to reading journal page',
    },
  ],

  [
    'resume',
    {
      title: 'résumé',
      urlPathFragment: '/resume',
      description: 'Go to resume page',
    },
  ],
  [
    'motivations',
    {
      title: 'motivations',
      urlPathFragment: '/motivations',
      description: 'Go to my motivations',
    },
  ],
])

export const linksEntries = ([...linksMap.entries()] as const).filter(
  ([key, ..._]) => key !== 'motivations'
)
