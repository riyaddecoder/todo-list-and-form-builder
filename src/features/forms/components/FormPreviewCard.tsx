import type { SubmitEventHandler } from 'react'
import type { FormField } from '../types.ts'
import { DropdownElement } from './elements/DropdownElement.tsx'
import { TextAreaElement } from './elements/TextAreaElement.tsx'
import { TextFieldElement } from './elements/TextFieldElement.tsx'
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
          <h1 className={styles.title}>Fill up the form</h1>
        </div>
        {submitted ? (
          <p className={styles.successMessage}>
            Submitted successfully.
          </p>
        ) : null}
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        {fields.map((field) => {
          const fieldLabel = field.label.trim() || 'Untitled field'
          const fieldValue = values[field.id] ?? ''

          return (
            <label key={field.id} className={styles.field}>
              <span className={styles.label}>{fieldLabel}</span>

              {field.type === 'textarea' ? (
                <TextAreaElement
                  value={fieldValue}
                  onChange={(event) => onValueChange(field.id, event.target.value)}
                  placeholder={field.placeholder}
                />
              ) : null}

              {field.type === 'select' ? (
                <DropdownElement
                  value={fieldValue}
                  onChange={(event) => onValueChange(field.id, event.target.value)}
                  options={field.options}
                />
              ) : null}

              {field.type === 'text' ? (
                <TextFieldElement
                  value={fieldValue}
                  onChange={(event) => onValueChange(field.id, event.target.value)}
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
