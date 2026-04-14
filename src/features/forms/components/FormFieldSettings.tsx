import type { FormField } from '../types.ts'
import styles from './FormFieldSettings.module.css'

type FormFieldSettingsProps = {
  field: FormField | null
  onRemove: (fieldId: string) => void
  onUpdate: (
    fieldId: string,
    patch: Partial<Pick<FormField, 'label' | 'placeholder' | 'options'>>,
  ) => void
}

export function FormFieldSettings({
  field,
  onRemove,
  onUpdate,
}: FormFieldSettingsProps) {
  if (!field) {
    return (
      <aside className={styles.panel}>
        <p className={styles.kicker}>Field Settings</p>
        <h2 className={styles.title}>Select a field</h2>
        <p className={styles.description}>
          Click a field in the center canvas to edit its label and placeholder.
        </p>
      </aside>
    )
  }

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Field Settings</p>
          <h2 className={styles.title}>Edit selected field</h2>
        </div>
        <button
          type="button"
          className={styles.removeButton}
          onClick={() => onRemove(field.id)}
        >
          Remove
        </button>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Label</span>
        <input
          className={styles.input}
          type="text"
          value={field.label}
          onChange={(event) => onUpdate(field.id, { label: event.target.value })}
          placeholder="User Name"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Placeholder</span>
        <input
          className={styles.input}
          type="text"
          value={field.placeholder}
          onChange={(event) =>
            onUpdate(field.id, { placeholder: event.target.value })
          }
          placeholder="Enter user name"
        />
      </label>

      {field.type === 'select' ? (
        <label className={styles.field}>
          <span className={styles.label}>Dropdown options</span>
          <textarea
            className={styles.textarea}
            value={field.options.join('\n')}
            onChange={(event) =>
              onUpdate(field.id, {
                options: event.target.value
                  .split('\n')
                  .map((option) => option.trim())
                  .filter(Boolean),
              })
            }
            rows={6}
            placeholder={'Option 1\nOption 2'}
          />
        </label>
      ) : null}
    </aside>
  )
}
