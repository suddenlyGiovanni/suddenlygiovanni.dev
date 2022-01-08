import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button.attrs(() => ({
  type: 'button',
}))`
  color: white;
  font-size: 1.25rem;

  background-color: rebeccapurple;
  border: none;
`

export const Wave: React.VFC = () => {
  const [waves, setWave] = useState<number>(0)
  const label = `👋${waves} ${waves === 1 ? 'wave' : 'waves'}`
  const increment = (): void => setWave((w) => 1 + w)
  return <Button onClick={increment}>{label}</Button>
}
