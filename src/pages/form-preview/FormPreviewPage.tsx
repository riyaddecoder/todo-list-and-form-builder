import { useState } from 'react'
import { FormPreviewCard } from '../../features/forms/components/FormPreviewCard.tsx'
import { getFieldName } from '../../features/forms/utils/getFieldName.ts'
import { TodoFeedback } from '../../features/todos/components/TodoFeedback.tsx'
import { useFormBuilderStore } from '../../features/forms/store/useFormBuilderStore.ts'
import styles from './FormPreviewPage.module.css'

export function FormPreviewPage() {
  const fields = useFormBuilderStore((state) => state.fields)
  const [values, setValues] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function handleValueChange(fieldId: string, value: string) {
    setSubmitted(false)
    setValues((currentValues) => ({
      ...currentValues,
      [fieldId]: value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const usedKeys = new Map<string, number>()
    const payload = fields.reduce<Record<string, string>>((accumulator, field) => {
      const baseKey = getFieldName(field.label, field.id)
      const occurrence = usedKeys.get(baseKey) ?? 0
      const key = occurrence === 0 ? baseKey : `${baseKey}-${occurrence + 1}`

      usedKeys.set(baseKey, occurrence + 1)
      accumulator[key] = values[field.id] ?? ''
      return accumulator
    }, {})

    console.log('Submitted form data:', payload)
    setSubmitted(true)
  }

  if (fields.length === 0) {
    return (
      <TodoFeedback
        title="No form configuration yet"
        message="Add some fields in the form builder before previewing the form."
      />
    )
  }

  return (
    <div className={styles.page}>
      <FormPreviewCard
        fields={fields}
        values={values}
        submitted={submitted}
        onValueChange={handleValueChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
