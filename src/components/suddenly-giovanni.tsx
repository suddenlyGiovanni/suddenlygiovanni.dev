import { Link } from 'gatsby'
import Image from 'gatsby-image'
import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'

import { useProfilePictureFix } from '../hooks'
import { linksMap } from '../lib/links-map'
import { scale } from '../lib/typography'

const LinkStyled: StyledComponent<typeof Link, any, {}, never> = styled(Link)`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

const HeadingStyled: StyledComponent<'h1', any, {}, never> = styled.h1`
  margin-top: unset;
  margin-bottom: unset;
  margin-left: 1rem;
  padding-bottom: unset;

  font-size: ${scale(1 / 2).fontSize};

  border: unset;
`

const ImageStyled: StyledComponent<typeof Image, any, {}, never> = styled(
  Image
)`
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

export const SuddenlyGiovanni: React.VFC = () => {
  const profilePictureFix = useProfilePictureFix()
  const LinkToBlog = linksMap.get('blog')!
  return (
    <LinkStyled
      to={LinkToBlog.urlPathFragment}
      aria-label={LinkToBlog.description}
      activeStyle={undefined}
    >
      <ImageStyled
        alt="Giovanni Ravalico's profile picture"
        // @ts-ignore
        fixed={profilePictureFix}
        loading="eager"
      />
      <HeadingStyled>suddenlyGiovanni</HeadingStyled>
    </LinkStyled>
  )
}
