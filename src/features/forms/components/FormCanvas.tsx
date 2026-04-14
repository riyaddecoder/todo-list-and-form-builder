import type { DragEvent } from 'react'
import type { FormField, FormFieldType } from '../types.ts'
import styles from './FormCanvas.module.css'

type FormCanvasProps = {
  fields: FormField[]
  selectedFieldId: string | null
  onAddField: (type: FormFieldType) => void
  onSelectField: (fieldId: string) => void
}

export function FormCanvas({
  fields,
  selectedFieldId,
  onAddField,
  onSelectField,
}: FormCanvasProps) {
  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const type = event.dataTransfer.getData(
      'application/form-field-type',
    ) as FormFieldType

    if (type === 'text' || type === 'textarea') {
      onAddField(type)
    }
  }

  return (
    <section
      className={styles.canvas}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.canvasHeader}>
        <p className={styles.kicker}>Form Interface</p>
        <h2 className={styles.title}>Drop fields into the canvas</h2>
      </div>

      {fields.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>Start building visually</p>
          <p className={styles.emptyText}>
            Drag a field from the left panel into this area to create your form
            layout.
          </p>
        </div>
      ) : (
        <div className={styles.fieldStack}>
          {fields.map((field) => {
            const isSelected = field.id === selectedFieldId

            return (
              <button
                key={field.id}
                type="button"
                className={isSelected ? styles.fieldCardActive : styles.fieldCard}
                onClick={() => onSelectField(field.id)}
              >
                <span className={styles.fieldLabel}>{field.label}</span>
                <span className={styles.fieldMeta}>
                  {field.type === 'textarea' ? 'Text Area' : 'Text Field'}
                </span>
                <span className={styles.fieldPreview}>
                  {field.placeholder || 'No placeholder yet'}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}
