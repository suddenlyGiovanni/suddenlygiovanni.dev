import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'

import * as L from '../lib/links-map'
import * as Responsive from '../lib/responsive'
import { scale } from '../lib/typography'
import { NavItems } from './nav-items'

const NavMobileContainer: StyledComponent<'div', any, {}, never> = styled.div`
  overflow-y: hidden;

  @media ${Responsive.Queries.tabletAndUp} {
    display: none;
    visibility: hidden;
  }
`

const NavMobileButton: StyledComponent<
  'button',
  any,
  { type: 'button' },
  'type'
> = styled.button.attrs(() => ({
  type: 'button',
}))`
  position: relative;
  top: -5px;
  z-index: 30;

  width: 24px;
  height: 24px;

  background: transparent;
  border: none;

  :hover:not(.touch),
  :focus {
    background: transparent;
    border: none;
    outline: none;
  }
`

const HamburgerIcon = styled.div<{ $isToggledOn: boolean }>`
  position: absolute;
  left: 0;

  width: 24px;
  height: 2px;

  background: ${({ $isToggledOn }) => ($isToggledOn ? 'transparent' : `black`)};

  transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);

  ::before {
    position: absolute;
    top: -8px;
    left: 0;

    width: 24px;
    height: 2px;

    background: black;

    transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);

    content: '';

    ${({ $isToggledOn }) =>
      $isToggledOn
        ? ('transform: rotate(45deg); top: 0;' as const)
        : ('transform: rotate(0)' as const)};
  }

  ::after {
    position: absolute;
    top: 8px;
    left: 0;

    width: 24px;
    height: 2px;

    background: black;

    transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);

    content: '';

    ${({ $isToggledOn }) =>
      $isToggledOn
        ? ('transform: rotate(-45deg); top: 0;' as const)
        : ('transform: rotate(0)' as const)};
  }
`

const NavListMobile = styled(NavItems)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;

  list-style: unset;

  background: white;

  counter-reset: unset;
  margin-block-start: unset;
  margin-block-end: unset;
  padding-inline-start: unset;

  li {
    display: block;

    margin: 2rem auto;
    padding-left: unset;

    font-size: ${scale(0.7).fontSize};

    text-align: unset;
  }
`

interface Props {
  linksEntries: ReadonlyArray<
    [
      L.MapKeys,
      L.Blog | L.ReadingJournal | L.AboutMe | L.Resume | L.Motivations
    ]
  >
}

export const NavMobile: React.VFC<Props> = ({ linksEntries }) => {
  const [isToggledOn, setToggle] = React.useState<boolean>(false)
  const toggle = (): void => setToggle(!isToggledOn)

  return (
    <NavMobileContainer>
      <NavMobileButton
        onClick={toggle}
        aria-label={`${isToggledOn ? 'close menu' : 'open menu'}`}
      >
        <HamburgerIcon $isToggledOn={isToggledOn} />
      </NavMobileButton>
      {isToggledOn && <NavListMobile linksEntries={linksEntries} />}
    </NavMobileContainer>
  )
}
