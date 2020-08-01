/* eslint-disable sort-keys */
/* eslint-disable react/jsx-props-no-spreading */
import type { MDXProviderComponents } from '@mdx-js/react'

// import { Code } from "./code";
import { List } from './list'
import { ListItem } from './list-item'
import { Paragraph } from './paragraph'
import { SmallTitle } from './small-title'
import { Subtitle } from './subtitle'
import { Title } from './title'
import { Wrapper } from './wrapper'

export const mdxComponents: MDXProviderComponents = {
  wrapper: Wrapper,
  h1: Title,
  h2: Subtitle,
  h3: SmallTitle,
  p: Paragraph,
  ul: List,
  li: ListItem,
}
