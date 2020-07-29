import { css } from '@emotion/core'
import React from 'react'

export function TemplateList({
  heading,
  stringList,
}: {
  stringList: string[]
  heading: string
}): JSX.Element {
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
              margin-right: 1rem;
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
