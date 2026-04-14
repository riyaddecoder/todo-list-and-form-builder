import type { ChangeEvent } from 'react'
import type { TodoStatusFilter, User } from '../api/todos.ts'
import styles from './TodoFilters.module.css'

type TodoFiltersProps = {
  searchTerm: string
  selectedUserId: number | 'all'
  statusFilter: TodoStatusFilter
  users: User[]
  onSearchChange: (value: string) => void
  onUserChange: (userId: number | 'all') => void
  onStatusChange: (status: TodoStatusFilter) => void
}

export function TodoFilters({
  searchTerm,
  selectedUserId,
  statusFilter,
  users,
  onSearchChange,
  onUserChange,
  onStatusChange,
}: TodoFiltersProps) {
  function handleUserChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value

    onUserChange(value === 'all' ? 'all' : Number(value))
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    onStatusChange(event.target.value as TodoStatusFilter)
  }

  return (
    <section className={styles.panel}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Browse and filter tasks</h2>
      </div>

      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.label}>Search</span>
          <input
            className={styles.input}
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by todo title"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>User</span>
          <select
            className={styles.select}
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="all">All users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Status</span>
          <select
            className={styles.select}
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </label>
      </div>
    </section>
  )
}
