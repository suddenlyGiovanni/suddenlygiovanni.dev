import { css } from '@emotion/core'
import React from 'react'

type Props = {
  stringList: string[]
  heading: string
}

export function TemplateList({ heading, stringList }: Props): JSX.Element {
  return (
    <dl>
      <dt>{heading}</dt>
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
              margin-right: 1em;
              margin-bottom: unset;
            }
          `}
        >
          {stringList?.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </dd>
    </dl>
  )
}
