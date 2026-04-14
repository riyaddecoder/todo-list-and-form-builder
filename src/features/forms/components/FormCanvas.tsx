import { useState, type DragEvent } from 'react'
import { TrashIcon } from '../../../shared/ui/icons/TrashIcon.tsx'
import type { FormField, FormFieldType } from '../types.ts'
import styles from './FormCanvas.module.css'

type FormCanvasProps = {
  fields: FormField[]
  selectedFieldId: string | null
  onAddFieldAt: (type: FormFieldType, index: number) => void
  onSelectField: (fieldId: string) => void
  onDeleteField: (fieldId: string) => void
}

export function FormCanvas({
  fields,
  selectedFieldId,
  onAddFieldAt,
  onSelectField,
  onDeleteField,
}: FormCanvasProps) {
  const [isDraggingOverCanvas, setIsDraggingOverCanvas] = useState(false)
  const [dropIndex, setDropIndex] = useState<number | null>(null)

  function isSupportedFieldType(value: string): value is FormFieldType {
    return value === 'text' || value === 'textarea' || value === 'select'
  }

  function getDropIndexFromPointer(
    event: DragEvent<HTMLDivElement>,
    totalFields: number,
  ) {
    const fieldCards = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[data-field-card="true"]'),
    )

    for (const [index, card] of fieldCards.entries()) {
      const rect = card.getBoundingClientRect()
      const midpoint = rect.top + rect.height / 2

      if (event.clientY < midpoint) {
        return index
      }
    }

    return totalFields
  }

  function handleStackDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    setIsDraggingOverCanvas(true)
    setDropIndex(getDropIndexFromPointer(event, fields.length))
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget

    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setIsDraggingOverCanvas(false)
      setDropIndex(null)
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const type = event.dataTransfer.getData('application/form-field-type')
    const index = getDropIndexFromPointer(event, fields.length)

    if (isSupportedFieldType(type)) {
      onAddFieldAt(type, index)
    }

    setIsDraggingOverCanvas(false)
    setDropIndex(null)
  }

  function handleCanvasDragEnter(event: DragEvent<HTMLElement>) {
    const type = event.dataTransfer.getData('application/form-field-type')

    if (isSupportedFieldType(type)) {
      setIsDraggingOverCanvas(true)
    }
  }

  function handleDragEnd() {
    setIsDraggingOverCanvas(false)
    setDropIndex(null)
  }

  return (
    <section
      className={styles.canvas}
      onDragEnter={handleCanvasDragEnter}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.canvasHeader}>
        <p className={styles.kicker}>Form Interface</p>
        <h2 className={styles.title}>Drop fields into the canvas</h2>
      </div>

      {fields.length === 0 ? (
        <div
          className={
            isDraggingOverCanvas ? styles.emptyStateActive : styles.emptyState
          }
          onDragOver={(event) => handleStackDragOver(event)}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className={styles.emptyTitle}>Start building visually</p>
          <p className={styles.emptyText}>
            Drag a field from the left panel into this area to create your form
            layout.
          </p>
        </div>
      ) : (
        <div
          className={styles.fieldStack}
          onDragOver={handleStackDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {fields.map((field, index) => {
            const isSelected = field.id === selectedFieldId

            return (
              <div key={field.id} className={styles.fieldGroup}>
                <div
                  className={dropIndex === index ? styles.dropZoneActive : styles.dropZone}
                >
                  <span className={styles.dropZoneLine} />
                </div>

                <div className={styles.cardWrapper}>
                  <button
                    data-field-card="true"
                    type="button"
                    className={isSelected ? styles.fieldCardActive : styles.fieldCard}
                    onClick={() => onSelectField(field.id)}
                  >
                    <span className={styles.fieldLabel}>{field.label}</span>
                    <span className={styles.fieldMeta}>
                      {field.type === 'textarea'
                        ? 'Text Area'
                        : field.type === 'select'
                          ? 'Dropdown'
                          : 'Text Field'}
                    </span>
                    <span className={styles.fieldPreview}>
                      {field.type === 'select'
                        ? `${field.options.length} option${field.options.length === 1 ? '' : 's'}`
                        : field.placeholder || 'No placeholder yet'}
                    </span>
                  </button>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => onDeleteField(field.id)}
                    aria-label="Delete field"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            )
          })}

          <div
            className={
              dropIndex === fields.length ? styles.dropZoneActive : styles.dropZone
            }
          >
            <span className={styles.dropZoneLine} />
          </div>
        </div>
      )}
    </section>
  )
}
