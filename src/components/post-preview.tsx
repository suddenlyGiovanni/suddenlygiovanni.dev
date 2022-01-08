import * as Integers from '@lib/integer'

import { Link } from 'gatsby'
import styled from 'styled-components'

import { DateAndReadingTime } from './date-and-reading-time'

const PostPreviewHeadingStyled = styled.h2`
  margin-top: unset;
`

const LinkStyled = styled(Link)`
  color: unset;
  text-decoration: none;

  box-shadow: none;

  &:visited {
    color: unset;
  }
`

interface Props {
  id: string
  slug: string
  author: string
  title: string
  description: string
  date: Date
  timeToRead: number
}

export const PostPreview: React.VFC<Props> = ({
  slug,
  title,
  description,
  date,
  ...props
}) => {
  const timeToRead = Integers.fromNumber(props.timeToRead)
  return (
    <article>
      <header>
        <PostPreviewHeadingStyled>
          <LinkStyled to={slug}>{title}</LinkStyled>
        </PostPreviewHeadingStyled>
        <DateAndReadingTime date={date} timeToRead={timeToRead} />
      </header>

      <section>
        <p>{description}</p>
      </section>
    </article>
  )
}
