import styled from 'styled-components'
import * as React from 'react'

const ListStyled = styled.ul`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: unset;
  margin-left: unset;

  list-style: none;
`

const ListItemStyled = styled.li`
  margin-right: 1em;
  margin-bottom: unset;
`

interface Props {
  readonly keywords: ReadonlyArray<string>
  readonly heading: string
}

export const SubSection: React.VFC<Props> = ({ heading, keywords }) => (
  <dl>
    <dt>{heading}</dt>
    <dd>
      <ListStyled>
        {keywords?.map((keyword) => (
          <ListItemStyled key={keyword}>{keyword}</ListItemStyled>
        ))}
      </ListStyled>
    </dd>
  </dl>
)
