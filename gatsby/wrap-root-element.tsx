import type { GatsbyBrowser } from 'gatsby'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => element
