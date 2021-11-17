type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const Subtitle: React.FC<Props> = ({ children, ...props }) => (
  <h2 {...props}>{children}</h2>
)
