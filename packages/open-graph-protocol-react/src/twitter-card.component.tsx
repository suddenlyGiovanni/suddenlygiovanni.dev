import type { VFC } from 'react'

import {
  makeOpenGraphTwitterCard,
  type OpenGraphTwitterCard as TwitterCardProps,
} from '@suddenlygiovanni/open-graph-protocol'

export const TwitterCard: VFC<TwitterCardProps> = (twitterCard) => {
  return (
    <>
      {makeOpenGraphTwitterCard(twitterCard).map((tag, idx) => (
        <meta key={idx} {...tag} />
      ))}
    </>
  )
}
