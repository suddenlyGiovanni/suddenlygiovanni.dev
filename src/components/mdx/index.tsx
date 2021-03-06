/* eslint-disable react/jsx-props-no-spreading */
import type { MDXProviderComponents } from '@mdx-js/react'
import React from 'react'

import { Code } from './code'
import { List } from './list'
import { ListItem } from './list-item'
import { Paragraph } from './paragraph'
import { Pre } from './pre'
import { preToCodeBlock } from './pre-to-code-block'
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
  pre: (preProps) => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // it's possible to have a pre without a code in it
    return <Pre {...preProps} />
  },
}
