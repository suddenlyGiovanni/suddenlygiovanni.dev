import Typography, { TypographyOptions } from 'typography'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import githubTheme from 'typography-theme-github'

const typography = new Typography(githubTheme as TypographyOptions)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography
