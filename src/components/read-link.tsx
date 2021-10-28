import type { GatsbyLinkProps } from 'gatsby'
import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'
import { Link } from './link'

export const ReadLink: StyledComponent<
  React.FC<GatsbyLinkProps<unknown>>,
  any,
  {},
  never
> = styled(Link)`
  display: inline-block;
`
