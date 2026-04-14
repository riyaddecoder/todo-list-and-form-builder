import type { FormFieldType } from '../types.ts'
import { Link } from 'react-router-dom'
import styles from './FormBuilderHeader.module.css'

type FormBuilderHeaderProps = {
  onAddField: (type: FormFieldType) => void
}

export function FormBuilderHeader({ onAddField }: FormBuilderHeaderProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.kicker}>Dynamic Form Builder</p>
        <p className={styles.description}>
          Drag fields into the canvas, then select them to edit their settings.
        </p>
      </div>

      <div className={styles.actions}>
        <div className={styles.buttonRow}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => onAddField('text')}
          >
            Add Field
          </button>
          <Link to="/form-preview" className={styles.secondaryButton}>
            Preview Form
          </Link>
        </div>
      </div>
    </section>
  )
}
