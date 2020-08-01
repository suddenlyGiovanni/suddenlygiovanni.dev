/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC } from 'react'

export const Wrapper: FC = ({ children, ...props }) => {
  // eslint-disable-next-line no-console
  // console.log(children && children.map((child) => child.props.mdxType))
  return <>{children}</>
}
