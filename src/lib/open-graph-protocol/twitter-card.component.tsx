import * as React from 'react'
import { Helmet } from 'react-helmet'

import {
  makeOpenGraphTwitterCard,
  type OpenGraphTwitterCard as TwitterCardProps,
} from './open-graph-twitter'

export const TwitterCard: React.VFC<TwitterCardProps> = (twitterCard) => {
  return <Helmet meta={makeOpenGraphTwitterCard(twitterCard)} />
}
