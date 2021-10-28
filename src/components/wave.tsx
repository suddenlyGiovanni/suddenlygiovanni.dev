import * as React from 'react'
import styled from 'styled-components'

const WaveButtonStyled = styled.button.attrs(() => ({
  type: 'button',
}))`
  color: white;
  font-size: 1.25rem;

  background-color: rebeccapurple;
  border: none;
`

export const Wave: React.VFC = () => {
  const [waves, setWave] = React.useState<number>(0)
  const label = `👋${waves} ${waves === 1 ? 'wave' : 'waves'}`
  const increment = (): void => setWave((w) => 1 + w)
  return <WaveButtonStyled onClick={increment}>{label}</WaveButtonStyled>
}
