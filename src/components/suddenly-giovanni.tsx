import { css } from '@emotion/core'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import React from 'react'

import { scale } from '../lib/typography'
import { useProfilePictureFix } from '../hooks/use-profile-picture-fix'

export const SuddenlyGiovanni = (): JSX.Element => {
  const profilePictureFix = useProfilePictureFix()
  return (
    <Link
      to="/"
      aria-label="go to homepage"
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

          font-size: ${scale(1 / 2).fontSize};

          border-bottom: unset;
        `}
      >
        suddenlyGiovanni
      </h1>
    </Link>
  )
}
