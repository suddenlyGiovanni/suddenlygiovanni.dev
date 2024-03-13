/* eslint-disable @typescript-eslint/ban-types -- Reason this is a special case */
import type {
	ComponentPropsWithRef,
	ComponentPropsWithoutRef,
	ElementType,
	PropsWithChildren,
} from 'react'

interface AsProp<C extends ElementType> {
	as?: C
}

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProp<
	C extends ElementType,
	// biome-ignore lint/complexity/noBannedTypes: TODO: find a better way to type this
	Props = {},
> = PropsWithChildren<Props & AsProp<C>> & Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentPropWithRef<
	C extends ElementType,
	// biome-ignore lint/complexity/noBannedTypes: TODO: find a better way to type this
	Props = {},
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }
