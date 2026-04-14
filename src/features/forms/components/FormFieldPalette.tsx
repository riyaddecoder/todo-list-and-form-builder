import type { DragEvent } from 'react'
import { draggableFieldTypes, type FormFieldType } from '../types.ts'
import styles from './FormFieldPalette.module.css'

type FormFieldPaletteProps = {
  onAddField: (type: FormFieldType) => void
}

export function FormFieldPalette({ onAddField }: FormFieldPaletteProps) {
  function handleDragStart(
    event: DragEvent<HTMLButtonElement>,
    type: FormFieldType,
  ) {
    event.dataTransfer.setData('application/form-field-type', type)
    event.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <p className={styles.kicker}>Builder Tools</p>
        <h2 className={styles.title}>Add field</h2>
        <p className={styles.description}>
          Drag a field into the form canvas, or click to add it instantly.
        </p>
      </div>

      <div className={styles.list}>
        {draggableFieldTypes.map((item) => (
          <button
            key={item.value}
            type="button"
            draggable
            className={styles.paletteButton}
            onClick={() => onAddField(item.value)}
            onDragStart={(event) => handleDragStart(event, item.value)}
          >
            <span className={styles.buttonTitle}>{item.label}</span>
            <span className={styles.buttonDescription}>{item.description}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
