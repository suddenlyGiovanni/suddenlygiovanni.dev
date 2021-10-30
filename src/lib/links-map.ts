interface LinkTo<
  To extends string,
  Title extends string,
  Description extends string
> {
  readonly urlPathFragment: To
  readonly description: Description
  readonly title: Title
}

type MapKeys =
  | 'blog'
  | 'reading-journal'
  | 'about-me'
  | 'resume'
  | 'motivations'

interface Blog extends LinkTo<'/', 'blog', 'Go to blog page'> {}

interface ReadingJournal
  extends LinkTo<'/', 'reading journal', 'Go to reading journal page'> {}

interface AboutMe
  extends LinkTo<'/about-me', 'about me', 'Go to about me page'> {}

interface Resume extends LinkTo<'/resume', 'résumé', 'Go to resume page'> {}

interface Motivations
  extends LinkTo<'/motivations', 'motivations', 'Go to my motivations'> {}

type LinksMap = ReadonlyMap<
  MapKeys,
  Blog | ReadingJournal | AboutMe | Resume | Motivations
>
export const linksMap: LinksMap = new Map([
  [
    'blog',
    {
      title: 'blog',
      urlPathFragment: '/',
      description: 'Go to blog page',
    },
  ],
  [
    'reading-journal',
    {
      title: 'reading journal',
      urlPathFragment: '/',
      description: 'Go to reading journal page',
    },
  ],
  [
    'about-me',
    {
      title: 'about me',
      urlPathFragment: '/about-me',
      description: 'Go to about me page',
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
