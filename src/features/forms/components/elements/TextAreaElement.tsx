import type { ChangeEventHandler } from 'react'
import styles from './FormElements.module.css'

type TextAreaElementProps = {
  value: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  disabled?: boolean
  rows?: number
}

export function TextAreaElement({
  value,
  onChange,
  placeholder,
  disabled = false,
  rows = 5,
}: TextAreaElementProps) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
    />
  )
}
