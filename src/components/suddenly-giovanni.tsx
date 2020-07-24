import { css } from '@emotion/core'
import Image from 'gatsby-image'
import React from 'react'

import { useProfilePictureFix } from '../hooks/use-profile-picture-fix'

import { HeaderLink } from './header-link'

const headerLinkStyles = css`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-weight: bold;
  text-decoration: none;

  :hover,
  :focus {
    color: unset;
    text-decoration: none;

    background: unset;
  }

  &.current-page {
    background: transparent;
  }

  span {
    display: inline-block;
    margin: 0;
    margin-left: 1rem;
  }
`

export const imageStyles = css`
  max-width: 50px;
  overflow: hidden;

  border-radius: 100%;
  picture {
    margin: 0;
  }
  picture > * {
    margin: 0;
  }
`

export const SuddenlyGiovanni = ({
  to,
  ariaLabel,
}: {
  to: string
  ariaLabel: string
}): JSX.Element => {
  const profilePictureFix = useProfilePictureFix()
  return (
    <HeaderLink
      to={to}
      aria-label={ariaLabel}
      activeStyle={undefined}
      css={headerLinkStyles}
    >
      <Image
        css={imageStyles}
        alt="Giovanni Ravalico's profile picture"
        fixed={profilePictureFix}
        loading="eager"
      />
      <span>suddenlyGiovanni</span>
    </HeaderLink>
  )
}
