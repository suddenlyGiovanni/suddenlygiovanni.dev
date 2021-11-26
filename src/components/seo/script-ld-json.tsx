import type { Thing } from 'schema-dts'

export function ScriptLdJSON<Schema extends Thing>(props: {
  schema: Schema
}): JSX.Element {
  return (
    <script type="application/ld+json">
      {JSON.stringify(props.schema, null, 2)}
    </script>
  )
}
