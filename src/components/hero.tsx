import styled from '@emotion/styled'
import { Link, graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React, { FC } from 'react'

import { GetHeroImageQuery } from '../../typings/graphql-types'

const ImageBackground = styled(BackgroundImage)`
  height: 50vh;

  background-position: top 20% center;
  background-size: cover;

  /* override the default margin for sibling elements  */
  + * {
    margin-top: 0;
  }
`

const TextBox = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 0 calc((100vw - 550px) / 2) 2rem;

  background-image: linear-gradient(to top, #dbfd 2rem, #dbf0);
  h1 {
    font-size: 2.25rem;
    text-shadow: 1px 1px 3px #edf6;
  }
  p,
  a {
    margin-top: 0;

    color: #222;
  }
  a {
    margin-top: 0.5rem;
  }
`

const getHeroImage = graphql`
  query GetHeroImage {
    image: file(relativePath: { eq: "markus-spiske-hero.jpg" }) {
      sharp: childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export const Hero: FC = () => {
  const { image } = useStaticQuery<GetHeroImageQuery>(getHeroImage)
  return (
    <ImageBackground Tag="section" fluid={image?.sharp.fluid} fadeIn>
      <TextBox>
        <h1>Home</h1>
        <p>
          Hello fellow developers
          <Link to="/about">Learn about me &rarr;</Link>
        </p>
      </TextBox>
    </ImageBackground>
  )
}
