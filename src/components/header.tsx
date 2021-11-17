import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import type { Route } from '../../config'
import { Container } from './container'
import { NavDesktop } from './nav-desktop'
import { NavMobile } from './nav-mobile'
import { SuddenlyGiovanni } from './suddenly-giovanni'

const HeaderStyled = styled.header`
  z-index: 10;

  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;

  border-bottom: thin solid black;
  background: none;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const Header: React.VFC = () => {
  const { site } = useStaticQuery<GatsbyTypes.RoutesQuery>(graphql`
    fragment RouteFragment on Route {
      uri
      url
      title
      description
      disabled
      hidden
    }

    query Routes {
      site {
        siteMetadata {
          routes {
            ...RouteFragment
          }
        }
      }
    }
  `)

  const routeEntries = site!.siteMetadata!.routes.filter(
    ({ hidden }) => !hidden
  ) as ReadonlyArray<Route>

  return (
    <HeaderStyled>
      <Container $maxWidth={720} $noVerticalPadding>
        <Nav>
          <SuddenlyGiovanni />
          <NavMobile routeEntries={routeEntries} />
          <NavDesktop routeEntries={routeEntries} />
        </Nav>
      </Container>
    </HeaderStyled>
  )
}
