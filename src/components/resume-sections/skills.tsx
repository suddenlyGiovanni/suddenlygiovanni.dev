import { css } from '@emotion/core'
import React from 'react'

import type { Skill } from '../../../typings/resume'

type Props = {
  skills: Skill[]
}

export function Skills({ skills }: Props): JSX.Element {
  return (
    <section>
      <h2>SKILLS</h2>
      {skills.map((skill) => (
        <dl key={skill.name}>
          <dt>{skill.name}</dt>
          <dd>
            <ul
              css={css`
                display: flex;
                flex-flow: row wrap;
                align-items: flex-start;
                justify-content: flex-start;
                margin-bottom: unset;
                margin-left: unset;

                list-style: none;
                li {
                  margin-right: 1rem;
                  margin-bottom: unset;
                }
              `}
            >
              {skill.keywords?.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </dd>
        </dl>
      ))}
    </section>
  )
}
