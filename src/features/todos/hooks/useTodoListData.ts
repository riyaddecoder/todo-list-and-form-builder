import { useEffect, useState } from 'react'
import { fetchTodoListData, type TodoWithUser, type User } from '../api/todos.ts'

type TodoListDataState = {
  todos: TodoWithUser[]
  users: User[]
  isLoading: boolean
  errorMessage: string | null
}

export function useTodoListData() {
  const [state, setState] = useState<TodoListDataState>({
    todos: [],
    users: [],
    isLoading: true,
    errorMessage: null,
  })

  useEffect(() => {
    let isMounted = true

    async function loadTodoListData() {
      try {
        const data = await fetchTodoListData()

        if (!isMounted) {
          return
        }

        setState({
          todos: data.todos,
          users: data.users,
          isLoading: false,
          errorMessage: null,
        })
      } catch (error) {
        if (!isMounted) {
          return
        }

        setState({
          todos: [],
          users: [],
          isLoading: false,
          errorMessage:
            error instanceof Error
              ? error.message
              : 'Unable to load todo data right now.',
        })
      }
    }

    loadTodoListData()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}
