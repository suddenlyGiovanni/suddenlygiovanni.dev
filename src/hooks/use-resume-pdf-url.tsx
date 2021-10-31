import { graphql, useStaticQuery } from 'gatsby'

const resumePdfURLQuery = graphql`
  query GetResumePdfURL {
    file(name: { eq: "giovanni-ravalico-resume" }, extension: { eq: "pdf" }) {
      id
      publicURL
    }
  }
`

export const useResumePdfURL = (): string => {
  const data = useStaticQuery<GatsbyTypes.GetResumePdfURL>(resumePdfURLQuery)
  return data.file?.publicURL || ''
}
