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
  function handleOptionChange(optionIndex: number, nextValue: string) {
    if (!field) {
      return
    }

    const nextOptions = field.options.map((option, index) =>
      index === optionIndex ? nextValue : option,
    )

    onUpdate(field.id, { options: nextOptions })
  }

  function handleAddOption() {
    if (!field) {
      return
    }

    onUpdate(field.id, {
      options: [...field.options, `Option ${field.options.length + 1}`],
    })
  }

  function handleRemoveOption(optionIndex: number) {
    if (!field) {
      return
    }

    onUpdate(field.id, {
      options: field.options.filter((_, index) => index !== optionIndex),
    })
  }

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
        <div className={styles.field}>
          <div className={styles.optionHeader}>
            <span className={styles.label}>Dropdown options</span>
            <button
              type="button"
              className={styles.addOptionButton}
              onClick={handleAddOption}
            >
              Add value
            </button>
          </div>

          <div className={styles.optionList}>
            {field.options.map((option, index) => (
              <div key={`${field.id}-option-${index}`} className={styles.optionRow}>
                <input
                  className={styles.input}
                  type="text"
                  value={option}
                  onChange={(event) =>
                    handleOptionChange(index, event.target.value)
                  }
                  placeholder={`Option ${index + 1}`}
                />
                <button
                  type="button"
                  className={styles.removeOptionButton}
                  onClick={() => handleRemoveOption(index)}
                  disabled={field.options.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  )
}
