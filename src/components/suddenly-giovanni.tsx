import { css } from '@emotion/core'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import React from 'react'

import { useProfilePictureFix } from '../hooks/use-profile-picture-fix'
import { scale } from '../lib/typography'

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
          margin-top: unset;
          margin-bottom: unset;
          margin-left: 1rem;
          padding-bottom: unset;

          font-size: ${scale(1 / 2).fontSize};

          border: unset;
        `}
      >
        suddenlyGiovanni
      </h1>
    </Link>
  )
}
