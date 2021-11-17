type Props = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>
export const ListItem: React.FC<Props> = ({ children, ...props }) => (
  <li {...props}>{children}</li>
)
