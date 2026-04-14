import styles from './TodoStatusBadge.module.css'

type TodoStatusBadgeProps = {
  completed: boolean
}

export function TodoStatusBadge({ completed }: TodoStatusBadgeProps) {
  return (
    <span className={completed ? styles.completed : styles.pending}>
      {completed ? 'Completed' : 'Pending'}
    </span>
  )
}
