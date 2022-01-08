import * as React from 'react'

/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */
export function createContext<A>(defaultValue: A): readonly [
  ctx: React.Context<{
    state: A
    update: React.Dispatch<React.SetStateAction<A>>
  }>,
  Provider: (props: React.PropsWithChildren<{}>) => JSX.Element
] {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>
  const defaultUpdate: UpdateType = () => defaultValue
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate,
  })

  function Provider(props: React.PropsWithChildren<{}>): JSX.Element {
    const [state, update] = React.useState(defaultValue)
    return <ctx.Provider value={{ state, update }} {...props} />
  }

  return [ctx, Provider] as const
}

export * from './nav-mobile.context'
