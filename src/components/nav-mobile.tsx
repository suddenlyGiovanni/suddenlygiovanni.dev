import { css } from '@emotion/core'
import React, { useState } from 'react'

import { maxSM } from '../lib/breakpoints'
import { scale } from '../lib/typography'

import { NavLink } from './nav-link'

export const NavMobile = (): JSX.Element => {
  const [isToggledOn, setToggle] = useState<boolean>(false)
  const toggle = (): void => setToggle(!isToggledOn)
  return (
    <div
      css={css`
        display: none;

        visibility: hidden;

        @media (max-width: ${maxSM}px) {
          display: block;

          visibility: visible;
        }
      `}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={`${isToggledOn ? 'close menu' : 'open menu'}`}
        css={css`
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
        `}
      >
        <div
          css={css`
            position: absolute;
            left: 0;

            width: 24px;
            height: 2px;

            background: ${isToggledOn ? 'transparent' : `black`};

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

              ${isToggledOn
                ? 'transform: rotate(45deg); top: 0; '
                : 'transform: rotate(0)'};
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

              ${isToggledOn
                ? 'transform: rotate(-45deg); top: 0;'
                : 'transform: rotate(0)'};
            }
          `}
        />
      </button>
      {isToggledOn && (
        <ul
          css={css`
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
          `}
        >
          <li>
            <NavLink
              aria-label="View blog page"
              to="/"
              activeClassName="current-page"
            >
              BLOG
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/"
              aria-label="go to reading journal"
              css={css`
                text-decoration: line-through;

                cursor: not-allowed;
                &:hover {
                  text-decoration: line-through;

                  cursor: not-allowed;
                }
              `}
            >
              READING JOURNAL
            </NavLink>
          </li>

          <li>
            <NavLink
              aria-label="View about page"
              to="/about-me"
              activeClassName="current-page"
            >
              ABOUT ME
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/resume"
              aria-label="go to resume"
              activeClassName="current-page"
            >
              RÉSUMÉ
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  )
}
