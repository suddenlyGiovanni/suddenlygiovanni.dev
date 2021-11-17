type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

export const Paragraph: React.FC<Props> = ({ children, ...props }) => (
  <p {...props}>{children}</p>
)
