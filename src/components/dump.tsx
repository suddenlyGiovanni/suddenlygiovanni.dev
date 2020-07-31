import { css } from '@emotion/core'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { [key: string]: unknown }
export const Dump = (props: Props): JSX.Element => (
  <div
    css={css`
      padding: 10px;

      font-size: 20px;

      background: white;
      border: 1px solid #efefef;
    `}
  >
    {Object.entries(props).map(([key, val]) => (
      <pre key={key}>
        <strong
          css={css`
            color: white;

            background: red;
          `}
        >
          {key}

          <span role="img" aria-label="poop">
            💩
          </span>
        </strong>
        {JSON.stringify(val, null, 2)}
      </pre>
    ))}
  </div>
)
