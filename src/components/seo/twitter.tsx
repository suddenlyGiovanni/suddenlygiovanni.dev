import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  username: string
  title: string
  desc: string
  image: string
  type?: string
}

export const Twitter = ({
  type = 'summary_large_image',
  username,
  title,
  desc,
  image,
}: Props): JSX.Element => (
  <Helmet>
    {username && <meta name="twitter:creator" content={username} />}
    <meta name="twitter:card" content={type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:image:alt" content={desc} />
  </Helmet>
)
