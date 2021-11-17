import styled, { StyledComponent } from 'styled-components'
import * as Responsive from '../lib/responsive'

export const Main: StyledComponent<'main', any, {}, never> = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-start;
  width: 100%;
  max-width: 800px;
  margin: 2rem auto 2rem;
  padding: 0 40px;

  & > h1 {
    margin-top: unset;
    padding-bottom: unset;

    border-bottom: unset;
  }

  @media ${Responsive.Queries.mobile} {
    padding: 0 20px;
  }
`
