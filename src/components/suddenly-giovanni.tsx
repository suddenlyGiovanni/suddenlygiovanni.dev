import { css } from '@emotion/core'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import React from 'react'

import { useProfilePictureFix } from '../hooks/use-profile-picture-fix'

type Props = {
  to: string
  ariaLabel: string
}

export const SuddenlyGiovanni = ({ to, ariaLabel }: Props): JSX.Element => {
  const profilePictureFix = useProfilePictureFix()
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      activeStyle={undefined}
      css={css`
        position: relative;

        display: flex;
        flex-direction: row;
        align-items: center;

        color: inherit;
        text-decoration: none;

        &:hover {
          text-decoration: none;
        }
      `}
    >
      <Image
        alt="Giovanni Ravalico's profile picture"
        fixed={profilePictureFix}
        loading="eager"
        css={css`
          max-width: 50px;
          overflow: hidden;

          border-radius: 100%;
          picture {
            margin: 0;
          }
          picture > * {
            margin: 0;
          }
        `}
      />
      <h1
        css={css`
          margin-bottom: 0;
          margin-left: 1rem;

          font-size: 1.25rem;

          border-bottom: unset;
        `}
      >
        suddenlyGiovanni
      </h1>
    </Link>
  )
}
