import styles from './TodoFeedback.module.css'

type TodoFeedbackProps = {
  title: string
  message: string
}

export function TodoFeedback({ title, message }: TodoFeedbackProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </section>
  )
}
