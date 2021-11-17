import styled from 'styled-components'

import type { Language as ILanguage } from '../../types/resume'
import { Section } from './section'

const Language = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  dt,
  dd {
    margin-bottom: unset;
  }

  dd {
    margin-left: 1em;
  }
`

interface Props {
  readonly languages: ReadonlyArray<ILanguage>
}

export const SectionLanguages: React.VFC<Props> = ({ languages }) => (
  <Section title={'Languages'}>
    <dl>
      {languages.map(({ fluency, language }) => (
        <Language key={language}>
          <dt>{language}</dt>
          <dd>{fluency}</dd>
        </Language>
      ))}
    </dl>
  </Section>
)
