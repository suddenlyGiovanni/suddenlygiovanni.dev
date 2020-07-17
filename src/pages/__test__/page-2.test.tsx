/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
import { render } from '@testing-library/react'
import { StaticQuery } from 'gatsby' // mocked
import * as React from 'react'

import PageTwo from '../page-2'

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

describe(`page Two`, () => {
  it(`contains NOT FOUND text`, () => {
    expect.hasAssertions()
    const { getByText } = render(<PageTwo />)

    const element = getByText(`Welcome to page 2`)

    expect(element).toBeInTheDocument()
  })
})
