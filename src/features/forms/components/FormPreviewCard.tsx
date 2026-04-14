import type { SubmitEventHandler } from 'react'
import type { FormField } from '../types.ts'
import { getFieldName } from '../utils/getFieldName.ts'
import styles from './FormPreviewCard.module.css'

type FormPreviewCardProps = {
  fields: FormField[]
  values: Record<string, string>
  submitted: boolean
  onValueChange: (fieldName: string, value: string) => void
  onSubmit: SubmitEventHandler<HTMLFormElement>
}

export function FormPreviewCard({
  fields,
  values,
  submitted,
  onValueChange,
  onSubmit,
}: FormPreviewCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Preview & Submit</p>
          <h1 className={styles.title}>Fill the generated form</h1>
        </div>
        {submitted ? (
          <p className={styles.successMessage}>
            Submitted successfully. Check the browser console for payload output.
          </p>
        ) : null}
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        {fields.map((field) => {
          const fieldLabel = field.label.trim() || 'Untitled field'
          const fieldName = getFieldName(field.label, field.id)
          const fieldValue = values[fieldName] ?? ''

          return (
            <label key={field.id} className={styles.field}>
              <span className={styles.label}>{fieldLabel}</span>

              {field.type === 'textarea' ? (
                <textarea
                  className={styles.textarea}
                  value={fieldValue}
                  onChange={(event) => onValueChange(fieldName, event.target.value)}
                  rows={5}
                  placeholder={field.placeholder}
                />
              ) : null}

              {field.type === 'select' ? (
                <select
                  className={styles.select}
                  value={fieldValue}
                  onChange={(event) => onValueChange(fieldName, event.target.value)}
                >
                  <option value="">Choose an option</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}

              {field.type === 'text' ? (
                <input
                  className={styles.input}
                  type="text"
                  value={fieldValue}
                  onChange={(event) => onValueChange(fieldName, event.target.value)}
                  placeholder={field.placeholder}
                />
              ) : null}
            </label>
          )
        })}

        <button type="submit" className={styles.submitButton}>
          Submit Form
        </button>
      </form>
    </section>
  )
}
