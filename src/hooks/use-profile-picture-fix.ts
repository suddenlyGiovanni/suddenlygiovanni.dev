import { graphql, useStaticQuery } from 'gatsby'
import { FixedObject } from 'gatsby-image'

import { GetProfilePictureQuery } from '../../typings/graphql-types'

export const useProfilePictureFix = (): FixedObject | undefined => {
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
      base64: fixed.base64 || undefined,
      height: fixed.height,
      src: fixed.src,
      srcSet: fixed.srcSet,
      srcSetWebp: fixed.srcSetWebp || undefined,
      srcWebp: fixed.srcWebp || undefined,
      width: fixed.width,
    }
    return fixedObject
  }
  return undefined
}
