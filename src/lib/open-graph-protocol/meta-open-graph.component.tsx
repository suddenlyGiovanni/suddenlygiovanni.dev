import {
  makeOpenGraphMetaAttributesRecord,
  OpenGraphMetadata,
} from './open-graph-protocol'

interface Props {
  openGraph: OpenGraphMetadata
}

/**
 * React wrapper around the open graph specification
 * it supports the `The Open Graph protocol` and Twitter's custom implementation
 * @link https://ogp.me/#types
 */
export function MetaOpenGraphProtocol({
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
