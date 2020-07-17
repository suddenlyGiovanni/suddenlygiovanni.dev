import { render } from '@testing-library/react'
import React from 'react'
import renderer from 'react-test-renderer'

import Header from '../header'

describe('header', () => {
  it('renders siteTitle', () => {
    expect.hasAssertions()
    const siteTitle = 'Hello World'
    const { getByText } = render(<Header siteTitle={siteTitle} />)
    const title = getByText(siteTitle)

    expect(title).toBeInTheDocument()
  })
})
