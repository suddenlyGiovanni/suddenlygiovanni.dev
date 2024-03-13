import { Root } from '@radix-ui/react-collapsible'

const Collapsible = Root
export { Collapsible }
// biome-ignore lint/nursery/noBarrelFile: this is necessary for the `@radix-ui/react-collapsible` package to work
export {
	CollapsibleTrigger,
	CollapsibleContent,
} from '@radix-ui/react-collapsible'
