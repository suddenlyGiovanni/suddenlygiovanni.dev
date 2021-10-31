import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'

import { linksMap } from '../lib/links-map'
import * as Responsive from '../lib/responsive'
import { scale } from '../lib/typography'
import { NavLink } from './nav-link'

/**
 * TODO: this needs to be renamed!
 */
const NavMobileContainerStyled: StyledComponent<
  'div',
  any,
  {},
  never
> = styled.div`
  display: none;

  visibility: hidden;

  ${Responsive.Queries.mediaQuerySmallDevices} {
    display: block;
    visibility: visible;
  }
`

/**
 * TODO: this needs to be renamed!
 */
const ButtonStyled: StyledComponent<
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

/**
 * TODO: this needs to be renamed!
 */
const DivStyled = styled.div<{ $isToggledOn: boolean }>`
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

const UnorderedListStyled: StyledComponent<'ul', any, {}, never> = styled.ul`
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
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

  list-style: unset;

  background: white;

  counter-reset: unset;
  margin-block-start: unset;
  margin-block-end: unset;
  padding-inline-start: unset;

  & > li {
    display: block;

    margin: 2rem auto;
    padding-left: unset;

    font-size: ${scale(0.7).fontSize};

    text-align: unset;
  }
`

const linksEntries = [...linksMap.entries()]

export const NavMobile: React.VFC = () => {
  const [isToggledOn, setToggle] = React.useState<boolean>(false)
  const toggle = (): void => setToggle(!isToggledOn)
  return (
    <NavMobileContainerStyled>
      <ButtonStyled
        onClick={toggle}
        aria-label={`${isToggledOn ? 'close menu' : 'open menu'}`}
      >
        <DivStyled $isToggledOn={isToggledOn} />
      </ButtonStyled>
      {isToggledOn && (
        <UnorderedListStyled>
          {linksEntries.map(
            ([key, { description, title, urlPathFragment }]) => (
              <li key={key}>
                <NavLink
                  to={urlPathFragment}
                  aria-label={description}
                  {...(key === 'reading-journal'
                    ? { $disabled: true }
                    : { activeClassName: 'current-page' })}
                >
                  {title.toUpperCase()}
                </NavLink>
              </li>
            )
          )}
        </UnorderedListStyled>
      )}
    </NavMobileContainerStyled>
  )
}
