import * as React from 'react'
import styled from 'styled-components'

const DumpContainerStyled = styled.div`
  padding: 10px;

  font-size: 20px;

  background: white;
  border: 1px solid #efefef;
`

const DumpKeyStyled = styled.strong`
  color: white;

  background: red;
`

interface Props {
  readonly children?: Readonly<Record<string, any>>
}

export const Dump: React.VFC<Props> = ({ children = {} }) => (
  <DumpContainerStyled>
    {Object.entries(children).map(([key, val]) => (
      <pre key={key}>
        <DumpKeyStyled>
          {key}

          <span role="img" aria-label="poop">
            💩
          </span>
        </DumpKeyStyled>
        {JSON.stringify(val, null, 2)}
      </pre>
    ))}
  </DumpContainerStyled>
)
