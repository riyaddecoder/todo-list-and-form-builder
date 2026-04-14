import styles from './FormBuilderEmptyState.module.css'

type FormBuilderEmptyStateProps = {
  onAddField: () => void
}

export function FormBuilderEmptyState({
  onAddField,
}: FormBuilderEmptyStateProps) {
  return (
    <section className={styles.card}>
      <p className={styles.kicker}>Start Here</p>
      <h2 className={styles.title}>No fields added yet</h2>
      <p className={styles.description}>
        Create your first field to begin shaping the form structure. You can mix
        text inputs, textareas, and dropdowns.
      </p>
      <button type="button" className={styles.button} onClick={onAddField}>
        Add Your First Field
      </button>
    </section>
  )
}
