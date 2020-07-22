import { css } from '@emotion/core'
import React, { useState } from 'react'

export const Wave = (): JSX.Element => {
  const [waves, setWave] = useState<number>(0)
  const label = `👋${waves} ${waves === 1 ? 'wave' : 'waves'}`
  const increment = (): void => setWave((w) => 1 + w)
  return (
    <button
      type="button"
      onClick={increment}
      css={css`
        color: white;
        font-size: 1.25rem;

        background-color: rebeccapurple;
        border: none;
      `}
    >
      {label}
    </button>
  )
}
