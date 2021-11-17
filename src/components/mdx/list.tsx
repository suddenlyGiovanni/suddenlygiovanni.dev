type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>

export const List: React.FC<Props> = ({ children, ...props }) => (
  <ul {...props}>{children}</ul>
)
