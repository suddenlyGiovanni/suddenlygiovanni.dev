import { css } from '@emotion/core'

import { reset } from './reset.styles'

export const globalStyles = css`
  ${reset}

  pre {
    overflow: auto;

    word-wrap: normal;

    background: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
  }
  tt,
  code {
    padding: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;

    font-family: 'SFMono-Regular', Consolas, 'Roboto Mono', 'Droid Sans Mono',
      'Liberation Mono', Menlo, Courier, monospace;

    background-color: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
  }
  pre code {
    line-height: 1.42;

    background: none;
  }
  code::before,
  code::after,
  tt::before,
  tt::after {
    letter-spacing: -0.2em;

    content: ' ';
  }
  pre code::before,
  pre code::after,
  pre tt::before,
  pre tt::after {
    content: '';
  }
  @media only screen and (max-width: 480px) {
    html {
      font-size: 100%;
    }
  }
`
