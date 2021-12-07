import * as React from 'react'
import { Helmet } from 'react-helmet'

import {
  makeTwitterCard,
  TwitterCard as TwitterCardProps,
} from './open-graph-twitter'

export const TwitterCard: React.VFC<TwitterCardProps> = (twitterCard) => {
  return <Helmet meta={makeTwitterCard(twitterCard)} />
}
