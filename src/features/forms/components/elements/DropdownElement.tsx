import type { ChangeEventHandler } from 'react'
import styles from './FormElements.module.css'

type DropdownElementProps = {
  value: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  disabled?: boolean
  options: string[]
}

export function DropdownElement({
  value,
  onChange,
  disabled = false,
  options,
}: DropdownElementProps) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">Choose an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
