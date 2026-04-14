import type { ChangeEventHandler } from 'react'
import styles from './FormElements.module.css'

type TextFieldElementProps = {
  value: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  disabled?: boolean
}

export function TextFieldElement({
  value,
  onChange,
  placeholder,
  disabled = false,
}: TextFieldElementProps) {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
