import * as React from 'react'
import styled from 'styled-components'

const DivStyled = styled.div`
  padding: 10px;

  font-size: 20px;

  background: white;
  border: 1px solid #efefef;
`

const KeyStyled = styled.strong`
  color: white;

  background: red;
`

interface Props {
  readonly children?: Readonly<Record<string, unknown>>
}

export const Dump: React.VFC<Props> = ({ children = {} }) => (
  <DivStyled>
    {Object.entries(children).map(([key, val]) => (
      <pre key={key}>
        <KeyStyled>
          {key}

          <span role="img" aria-label="poop">
            💩
          </span>
        </KeyStyled>
        {JSON.stringify(val, null, 2)}
      </pre>
    ))}
  </DivStyled>
)
