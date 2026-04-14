export type TodoStatusFilter = 'all' | 'completed' | 'pending'

export type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

export type User = {
  id: number
  name: string
}

export type TodoWithUser = Todo & {
  userName: string
}

const TODOS_API_URL = 'https://jsonplaceholder.typicode.com/todos'
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users'

async function getJson<T>(url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

export async function fetchTodoListData() {
  const [todos, users] = await Promise.all([
    getJson<Todo[]>(TODOS_API_URL),
    getJson<User[]>(USERS_API_URL),
  ])

  const usersById = new Map(users.map((user) => [user.id, user.name]))

  const todosWithUsers: TodoWithUser[] = todos.map((todo) => ({
    ...todo,
    userName: usersById.get(todo.userId) ?? 'Unknown User',
  }))

  return {
    todos: todosWithUsers,
    users,
  }
}
