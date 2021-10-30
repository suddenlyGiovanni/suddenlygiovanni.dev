import styled from 'styled-components'
import * as React from 'react'

import type { Language } from '../../types/resume'
import { Section } from './section'

const LanguageStyled = styled.div`
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
  readonly languages: ReadonlyArray<Language>
}

export const SectionLanguages: React.VFC<Props> = ({ languages }) => (
  <Section title={'Languages'}>
    <dl>
      {languages.map(({ fluency, language }) => (
        <LanguageStyled key={language}>
          <dt>{language}</dt>
          <dd>{fluency}</dd>
        </LanguageStyled>
      ))}
    </dl>
  </Section>
)
