import type { Thing } from 'schema-dts'

export function scriptLdJSON<Schema extends Thing>(
  schema: Schema
): JSX.IntrinsicElements['script'] {
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema, null, 2)}
    </script>
  )
}
