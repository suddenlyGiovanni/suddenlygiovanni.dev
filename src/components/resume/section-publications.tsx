import type { Publication } from '@typings/resume'
import { Dump } from '../dump'
import { Section } from './section'

interface Props {
  readonly publications: ReadonlyArray<Publication>
}

export const SectionPublications: React.VFC<Props> = ({ publications }) => (
  <Section title={'Publications'}>
    {publications.map((publication) => (
      <Dump>{publication}</Dump>
    ))}
  </Section>
)
