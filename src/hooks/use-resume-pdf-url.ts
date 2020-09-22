/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, useStaticQuery } from 'gatsby'

import { GetResumePdfUrlQuery } from '../../typings/graphql-types'

const resumePdfURLQuery = graphql`
  query GetResumePdfURL {
    file(name: { eq: "giovanni-ravalico-resume" }, extension: { eq: "pdf" }) {
      id
      publicURL
    }
  }
`

export const useResumePdfURL = (): string => {
  const data = useStaticQuery<GetResumePdfUrlQuery>(resumePdfURLQuery)
  const publicURL: string = data.file?.publicURL ? data.file.publicURL : ''
  return publicURL
}
