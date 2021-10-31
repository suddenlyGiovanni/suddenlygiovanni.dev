import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'

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

export const SuddenlyGiovanni: React.VFC = () => {
  const LinkToBlog = linksMap.get('blog')!
  return (
    <LinkStyled
      to={LinkToBlog.urlPathFragment}
      aria-label={LinkToBlog.description}
      activeStyle={undefined}
    >
      <StaticImage
        src={'../../content/assets/giovanni_ravalico-profile_bw.jpg'}
        width={50}
        height={50}
        style={{
          overflow: 'hidden',
          borderRadius: '100%',
        }}
        alt="Giovanni Ravalico's profile picture"
        placeholder="tracedSVG"
        layout="fixed"
        loading="eager"
      />
      <HeadingStyled>suddenlyGiovanni</HeadingStyled>
    </LinkStyled>
  )
}
