import type { BaseOrExtended } from './open-graph.ts'

export type music<T extends string = ''> = BaseOrExtended<'music', T>
