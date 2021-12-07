import {
  makeOpenGraphMetaAttributesRecord,
  OpenGraphMetadata,
} from './open-graph-protocol'

/**
 * React wrapper around the open graph specification
 * it supports the `The Open Graph protocol` and Twitter's custom implementation
 * @link https://ogp.me/#types
 */
export function MetaOpenGraphProtocol(
  props: Partial<Omit<JSX.IntrinsicElements['meta'], 'property' | 'content'>> &
    OpenGraphMetadata
): JSX.Element {
  return <meta {...makeOpenGraphMetaAttributesRecord(props)} />
}
