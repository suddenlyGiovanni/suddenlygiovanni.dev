import {
  makeOpenGraphMetaAttributesRecord,
  type OpenGraphRecord,
} from '@suddenlygiovanni/open-graph-protocol'

interface Props {
  openGraph: OpenGraphRecord
}

/**
 * React wrapper around the `Open Graph Protocol` specification.
 *
 * @remarks
 * supports the `The Open Graph protocol` and Twitter's custom implementation.
 * Provides an amazing DX by suggesting and auto-completing allowed user input.
 * Returns a single HTMLMetaElement with the allowed set of Open Graph property.
 * Leverage the work of `@suddenlygiovanni/open-graph-protocol`
 *
 * @link { https://ogp.me/#types }
 *
 * @public
 */

export function MetaOpenGraph({
  openGraph,
  ...intrinsicMetaAttributes
}: Props & JSX.IntrinsicElements['meta']): JSX.Element {
  return <meta {...intrinsicMetaAttributes} {...makeOpenGraphMetaAttributesRecord(openGraph)} />
}
