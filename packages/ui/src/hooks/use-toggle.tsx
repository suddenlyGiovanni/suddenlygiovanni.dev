import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'

/**
 * Custom hook for managing a boolean toggle state in React components.
 * @param defaultValue - The initial value for the toggle state.
 * @returns A tuple containing the current state,
 * a function to toggle the state, and a function to set the state explicitly.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-toggle)
 * @example
 * // Usage of useToggle hook
 * const [isToggled, toggle, setToggle] = useToggle(); // Initial value is false
 * // OR
 * const [isToggled, toggle, setToggle] = useToggle(true); // Initial value is true
 * // Use isToggled in your component, toggle to switch the state, setToggle to set the state explicitly.
 */
export function useToggle(
	defaultValue?: boolean,
): [value: boolean, toggle: () => void, setValue: Dispatch<SetStateAction<boolean>>] {
	const [value, setValue] = useState(Boolean(defaultValue))

	const toggle = useCallback(() => {
		setValue(x => !x)
	}, [])

	return [value, toggle, setValue]
}
