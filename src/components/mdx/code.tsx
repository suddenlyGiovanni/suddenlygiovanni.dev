/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled'
import Highlight, { Prism } from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import React from 'react'

const Pre = styled.pre`
  margin: 1em 0;
  padding: 0.5em;
  overflow-x: auto;

  text-align: left;

  & .token-line {
    height: 1.3em;

    line-height: 1.3em;
  }
`

const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  display: table-cell;
  padding-right: 1em;

  text-align: right;

  opacity: 0.5;

  user-select: none;
`

const LineContent = styled.span`
  display: table-cell;
`

type Props = {
  codeString: string
  language: Language
}
export const Code = ({ codeString, language }: Props): JSX.Element => {
  return (
    <Highlight
      Prism={Prism}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}
