import styled, { StyledComponent } from 'styled-components'
import * as Responsive from '../lib/responsive'

interface ContainerProps {
  readonly $maxWidth: number
  readonly $noHorizontalPadding: boolean
  readonly $noVerticalPadding: boolean
}

export const Container: StyledComponent<
  'div',
  any,
  Partial<ContainerProps>,
  '$maxWidth' | '$noHorizontalPadding' | '$noVerticalPadding'
> = styled.div.attrs((props: ContainerProps) => ({
  $maxWidth: props.$maxWidth ?? 720,
  $noHorizontalPadding: props.$noHorizontalPadding ?? false,
  $noVerticalPadding: props.$noVerticalPadding ?? false,
}))`
  width: 100%;

  max-width: ${({ $maxWidth, $noHorizontalPadding }) => {
    // @ts-ignore
    return $maxWidth + ($noHorizontalPadding ? 0 : 80)
  }}px;

  margin: 0 auto;

  padding-top: ${({ $noVerticalPadding }) => ($noVerticalPadding ? 0 : 40)}px;
  padding-right: ${({ $noHorizontalPadding }) =>
    $noHorizontalPadding ? 0 : 40}px;
  padding-bottom: ${({ $noVerticalPadding }) =>
    $noVerticalPadding ? 0 : 40}px;
  padding-left: ${({ $noHorizontalPadding }) =>
    $noHorizontalPadding ? 0 : 40}px;

  @query ${Responsive.Queries.mobile} {
    padding-top: ${({ $noVerticalPadding }) => ($noVerticalPadding ? 0 : 20)}px;

    padding-right: ${({ $noHorizontalPadding }) =>
      $noHorizontalPadding ? 0 : 20}px;

    padding-bottom: ${({ $noVerticalPadding }) =>
      $noVerticalPadding ? 0 : 20}px;

    padding-left: ${({ $noHorizontalPadding }) =>
      $noHorizontalPadding ? 0 : 20}px;
  }
`
