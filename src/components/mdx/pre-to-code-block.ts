import { Language } from 'prism-react-renderer'

interface PreProps {
  children?: {
    props: {
      /** "pre" */
      parentName: string
      /** "language-jsx" */
      className: string
      /** "code" */
      originalType: string
      /** "code" */
      mdxType: string
      children: string
    }
  }

  [prop: string]: any
}

interface Props {
  codeString: string
  language: Language
  className: string

  [prop: string]: any
}

export function preToCodeBlock(preProps: PreProps): Props | void {
  if (
    /** children is MDXTag */
    preProps.children &&
    /** MDXTag props */
    preProps.children.props &&
    /** if MDXTag is going to render a <code> */
    preProps.children.props.mdxType === 'code'
  ) {
    /** we have a <pre><code> situation */
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props

    const matches = /language-(?<lang>.*)/.exec(className)
    const language =
      matches && matches.groups && matches.groups.lang
        ? matches.groups.lang
        : ''

    return {
      className,
      codeString: codeString.trim(),
      language: language as Language,
      ...props,
    }
  }
  return undefined
}
