/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled'
import Highlight, { Prism } from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

import { copyToClipboard } from '../../utils/copy-to-clipboard'


const Wrapper = styled.div`
  position: relative;

  overflow: auto;
`

const Pre = styled.pre`
  position: relative;

  margin: 1em 0;
  padding: 0.5em;
  overflow-x: auto;

  white-space: pre;

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

const CopyCode = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 0.25rem;
  z-index: 1;

  margin: 0.25em;

  border: 0;
  border-radius: 3px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`
type Props = {
  codeString: string
  language: Language
  'react-live': boolean
}
export const Code = ({
  codeString,
  language,
  ...props
}: Props): JSX.Element => {
  const handleClick = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    copyToClipboard(codeString).catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error(
        "I'm sorry, but something wrong happened while trying to copy this code example.\nTry with an other browser",
        error
      )
    })
  }
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} theme={theme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  }
  return (
    <Highlight
      Prism={Prism}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Wrapper>
          <CopyCode onClick={handleClick}>Copy</CopyCode>
          <Pre className={className} style={style}>
            <code className={`language-${language}`}>
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
            </code>
          </Pre>
        </Wrapper>
      )}
    </Highlight>
  )
}
