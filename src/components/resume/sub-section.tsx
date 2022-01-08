import styled from 'styled-components'

const Ul = styled.ul`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: unset;
  margin-left: unset;

  list-style: none;
`

const Li = styled.li`
  margin-right: 1em;
  margin-bottom: unset;
`

interface Props {
  readonly keywords: ReadonlyArray<string>
  readonly heading: string
}

export const SubSection: React.VFC<Props> = ({ heading, keywords }) => (
  <dl>
    <dt>{heading}</dt>
    <dd>
      <Ul>
        {keywords?.map((keyword) => (
          <Li key={keyword}>{keyword}</Li>
        ))}
      </Ul>
    </dd>
  </dl>
)
