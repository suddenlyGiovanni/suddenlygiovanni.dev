import { Effect, Layer } from 'effect'

interface Todo {
	readonly id: number
	readonly title: string
	readonly createdAt: string
	readonly status: 'COMPLETER' | 'CREATED'
}

const makeTodoRepo = Effect.sync(() => {
	return {
		getAllTodos: Effect.succeed<Todo[]>([]),
	}
})

export class TodoRepo extends Effect.Tag('@services/TodoRepo')<
	TodoRepo,
	Effect.Effect.Success<typeof makeTodoRepo>
>() {
	static Live = Layer.effect(this, makeTodoRepo)
}
