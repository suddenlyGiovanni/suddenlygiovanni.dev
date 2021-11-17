interface Props {
  readonly title: string
}

export const Section: React.FC<Props & React.ComponentProps<'section'>> = ({
  children,
  title,
  ...props
}) => (
  <section {...props}>
    <h2>{title}</h2>
    {children}
  </section>
)
