import styled from '@emotion/styled'
import { Link, graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React, { FC } from 'react'

import { GetHeroImageQuery } from '../../typings/graphql-types'

const ImageBackground = styled(BackgroundImage)`
  background-position: top 20% center;
  background-size: cover;
  height: 50vh;

  /* override the default margin for sibling elements  */
  + * {
    margin-top: 0;
  }
`

const TextBox = styled('div')`
  background-image: linear-gradient(to top, #ddbbffdd 2rem, #ddbbff00);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  padding: 0 calc((100vw - 550px) / 2) 2rem;
  width: 100%;
  h1 {
    text-shadow: 1px 1px 3px #eeddff66;
    font-size: 2.25rem;
  }
  p,
  a {
    color: #222;
    margin-top: 0;
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
