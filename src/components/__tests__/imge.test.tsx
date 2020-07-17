import { render } from '@testing-library/react'
import { StaticQuery } from 'gatsby' // mocked
import * as React from 'react'

import Image from '../image'

// eslint-disable-next-line jest/require-top-level-describe
beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      placeholderImage: {
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            sizes: `100 200 300`,
            src: `pretend-i-am-a-base64-encoded-image`,
            srcSet: `asdfasdf`,
          },
        },
      },
    })
  )
})

describe(`image`, () => {
  it(`renders an image`, () => {
    expect.hasAssertions()
    const { container } = render(<Image />)

    expect(container.querySelector(`picture`)).toBeInTheDocument()
  })
})
