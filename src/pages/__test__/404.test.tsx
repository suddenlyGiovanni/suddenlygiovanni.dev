/* eslint-disable jest/no-hooks */
/* eslint-disable jest/require-top-level-describe */
import { render } from '@testing-library/react'
import { StaticQuery } from 'gatsby' // mocked
import * as React from 'react'

import FourOhFour from '../404'

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

describe(`404`, () => {
  it(`contains NOT FOUND text`, () => {
    expect.hasAssertions()
    const { getByText } = render(<FourOhFour />)

    const element = getByText(`NOT FOUND`)

    expect(element).toBeInTheDocument()
  })
})
