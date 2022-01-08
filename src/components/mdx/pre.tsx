type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

export const Pre: React.FC<Props> = ({ children, ...props }) => (
  <pre {...props}>{children}</pre>
)
