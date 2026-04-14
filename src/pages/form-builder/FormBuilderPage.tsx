import { startTransition } from 'react'
import { FormBuilderHeader } from '../../features/forms/components/FormBuilderHeader.tsx'
import { FormCanvas } from '../../features/forms/components/FormCanvas.tsx'
import { FormFieldPalette } from '../../features/forms/components/FormFieldPalette.tsx'
import { FormFieldSettings } from '../../features/forms/components/FormFieldSettings.tsx'
import { useFormBuilderStore } from '../../features/forms/store/useFormBuilderStore.ts'
import type { FormFieldType } from '../../features/forms/types.ts'
import styles from './FormBuilderPage.module.css'

export function FormBuilderPage() {
  const fields = useFormBuilderStore((state) => state.fields)
  const addFieldAt = useFormBuilderStore((state) => state.addFieldAt)
  const removeField = useFormBuilderStore((state) => state.removeField)
  const selectedFieldId = useFormBuilderStore((state) => state.selectedFieldId)
  const selectField = useFormBuilderStore((state) => state.selectField)
  const updateField = useFormBuilderStore((state) => state.updateField)
  const selectedField =
    fields.find((field) => field.id === selectedFieldId) ?? null

  function handleAddField(type: FormFieldType) {
    startTransition(() => {
      addFieldAt(type, fields.length)
    })
  }

  return (
    <div className={styles.page}>
      <FormBuilderHeader onAddField={handleAddField} />
      <div className={styles.workspace}>
        <FormFieldPalette onAddField={handleAddField} />
        <FormCanvas
          fields={fields}
          selectedFieldId={selectedFieldId}
          onAddFieldAt={addFieldAt}
          onSelectField={selectField}
        />
        <FormFieldSettings
          field={selectedField}
          onRemove={removeField}
          onUpdate={updateField}
        />
      </div>
    </div>
  )
}
