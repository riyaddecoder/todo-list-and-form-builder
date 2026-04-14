import type { TodoWithUser } from '../api/todos.ts'
import { TodoStatusBadge } from './TodoStatusBadge.tsx'
import styles from './TodoTable.module.css'

type TodoTableProps = {
  todos: TodoWithUser[]
}

export function TodoTable({ todos }: TodoTableProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.tableHeader}>
        <div>
          <h2 className={styles.title}>Tasks</h2>
        </div>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className={styles.titleCell}>{todo.title}</td>
                <td>{todo.userName}</td>
                <td>
                  <TodoStatusBadge completed={todo.completed} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
