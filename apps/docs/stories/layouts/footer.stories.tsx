import type {Meta, StoryObj} from '@storybook/react'
import {Layout, Placeholder} from '@suddenly-giovanni/ui'

const meta = {
  title: 'Layout/Footer',
  component: Layout.Footer,
} satisfies Meta<typeof Layout.Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Footer = {
  decorators: [
    Story => (
      <Layout.Body
        className="border-dashed border-violet-500 bg-violet-200 text-xl text-violet-500 text-center">
        Body
        <Story/>
      </Layout.Body>
    ),
  ],
  render: ({children, ...args}) => (
    <Layout.Footer
      {...args}
    ><Placeholder>Footer</Placeholder></Layout.Footer>
  ),
} satisfies Story
