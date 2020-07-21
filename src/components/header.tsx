/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, sort-keys */
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import Image, { FixedObject } from 'gatsby-image'
import React, { FC } from 'react'

import { GetProfilePictureQuery } from '../../typings/graphql-types'
import { bpMaxSM } from '../lib/breakpoints'

import { Container } from './container'
import { HeaderLink } from './header-link'
import { MobileNav } from './mobile-nav'

const NavLink = styled(HeaderLink)({
  background: 'transparent',
  borderRadius: '3px',
  marginTop: 'unset',
  padding: '8px 10px',
  // media query
  [bpMaxSM]: {
    display: 'none',
  },
})

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
  const data = useStaticQuery<GetProfilePictureQuery>(getProfilePicture)

  if (data.file?.image?.fixed) {
    const { fixed } = data.file.image
    const fixedObject: FixedObject = {
      width: fixed.width,
      height: fixed.height,
      src: fixed.src,
      srcSet: fixed.srcSet,
      base64: fixed.base64 || undefined,
      srcWebp: fixed.srcWebp || undefined,
      srcSetWebp: fixed.srcSetWebp || undefined,
    }
    return fixedObject
  }
  return undefined
}

export const Header: FC = () => {
  const profilePictureFix = useProfilePictureFix()
  return (
    <header
      css={css`
        width: 100%;
        flex-shrink: 0;
        background: none;
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 1rem 0;
        z-index: 10;

        border-bottom: 1px dashed;
      `}
    >
      <Container maxWidth={720} noVerticalPadding>
        <nav
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <HeaderLink
            to="/"
            aria-label="go to homepage"
            activeStyle={undefined}
            css={css`
              position: relative;
              display: flex;
              flex-direction: row;
              align-items: center;
              :hover,
              :focus {
                background: unset;
                color: unset;
              }
              &.current-page {
                background: transparent;
              }

              span {
                display: inline-block;
                margin: 0;
                margin-left: 1rem;
              }
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
              critical
            />
            <span>suddenlyGiovanni</span>
          </HeaderLink>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: unset;

              .mobile-nav {
                display: none;
                visibility: hidden;
                ${bpMaxSM} {
                  display: block;
                  visibility: visible;
                }
              }
            `}
          >
            <MobileNav />
            <NavLink to="/" aria-label="go to homepage">
              Blog
            </NavLink>

            <span
              aria-label="go to reading journal"
              css={css({
                background: 'transparent',
                borderRadius: '3px',
                marginTop: 'unset',
                padding: '8px 10px',
                ':hover': {
                  cursor: 'not-allowed',
                },
                [bpMaxSM]: {
                  display: 'none',
                },
              })}
            >
              Reading journal
            </span>

            <NavLink to="/about" aria-label="go to about">
              About
            </NavLink>
          </div>
        </nav>
      </Container>
    </header>
  )
}
