import {
  makeOpenGraphMetaAttributesRecord,
  type OpenGraphRecord,
} from './open-graph'

interface Props {
  openGraph: OpenGraphRecord
}

/**
 * React wrapper around the open graph specification
 * it supports the `The Open Graph protocol` and Twitter's custom implementation
 * @link https://ogp.me/#types
 */
export function MetaOpenGraph({
  openGraph,
  ...intrinsicMetaAttributes
}: Props & JSX.IntrinsicElements['meta']): JSX.Element {
  return (
    <meta
      {...intrinsicMetaAttributes}
      {...makeOpenGraphMetaAttributesRecord(openGraph)}
    />
  )
}
