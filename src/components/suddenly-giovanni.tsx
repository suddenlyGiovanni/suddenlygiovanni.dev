import { css } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'
import Image, { FixedObject } from 'gatsby-image'
import React from 'react'

import { GetProfilePictureQuery } from '../../typings/graphql-types'

const useProfilePictureFix = (): FixedObject | undefined => {
  const getProfilePicture = graphql`
    query GetProfilePicture {
      file(name: { eq: "giovanni_ravalico-profile_bw" }) {
        image: childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `
  const { file } = useStaticQuery<GetProfilePictureQuery>(getProfilePicture)

  return file?.image?.fixed ? file.image.fixed : undefined
}

export const SuddenlyGiovanni = (): JSX.Element => {
  const profilePictureFix = useProfilePictureFix()
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Image
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
        alt="Giovanni Ravalico's profile picture"
        fixed={profilePictureFix}
      />
      <span
        css={css`
          display: inline-block;
          margin: 0;
          margin-left: 1rem;
        `}
      >
        suddenlyGiovanni
      </span>
    </div>
  )
}
