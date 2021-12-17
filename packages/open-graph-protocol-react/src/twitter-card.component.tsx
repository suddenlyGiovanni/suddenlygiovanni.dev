import type { VFC } from 'react'

import {
  makeOpenGraphTwitterCard,
  type OpenGraphTwitterCard as TwitterCardProps,
} from '@suddenlygiovanni/open-graph-protocol'

/**
 * An helper React component to correctly fulfill the attribute requirements for
 * the Open Graph Protocol Twitter Card.
 *
 * @remarks
 * signature is
 * `OpenGraphTwitterCard` -> React.Fragment of ReadonlyArray<HTMLMetaElement>.
 *
 * The consumer is required to provide the correct OpenGraphTwitterCard attributes,
 * while supported by TypeScript auto complete, and will receive a correctly formed
 * set of HTML meta tags representing fulfilling the requirements of
 * the Open Graph Protocol specification for Twitter Cards
 *
 * The responsibility of choosing where/how to render the component is left to
 * the library consumer.
 *
 * @public
 */
export const TwitterCard: VFC<TwitterCardProps> = (twitterCard) => {
  return (
    <>
      {makeOpenGraphTwitterCard(twitterCard).map((tag, idx) => (
        <meta key={idx} {...tag} />
      ))}
    </>
  )
}
