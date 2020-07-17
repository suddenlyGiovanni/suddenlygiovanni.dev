import { render } from '@testing-library/react'
import { StaticQuery } from 'gatsby' // mocked
import * as React from 'react'

import Layout from '../layout'

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: `GatsbyJS`,
        },
      },
    })
  )
})

describe(`layout`, () => {
  it(`renders a header`, () => {
    expect.hasAssertions()
    const { container } = render(
      <Layout>
        <main>
          <h1>hello</h1>
        </main>
      </Layout>
    )

    expect(container.querySelector(`header`)).toBeInTheDocument()
  })

  it(`renders children`, () => {
    expect.hasAssertions()
    const text = `__Hello world__`
    const { getByText } = render(
      <Layout>
        <main>
          <h1>{text}</h1>
        </main>
      </Layout>
    )

    const child = getByText(text)

    expect(child).toBeInTheDocument()
  })
})
