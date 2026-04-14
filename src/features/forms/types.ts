export type FormFieldType = 'text' | 'textarea' | 'select'

export type FormField = {
  id: string
  label: string
  placeholder: string
  type: FormFieldType
  options: string[]
}

export const formFieldTypeOptions: Array<{
  label: string
  value: FormFieldType
}> = [
  { label: 'Text Input', value: 'text' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Dropdown', value: 'select' },
]

export const draggableFieldTypes: Array<{
  description: string
  label: string
  value: FormFieldType
}> = [
  {
    description: 'Single-line input for short answers.',
    label: 'Text Field',
    value: 'text',
  },
  {
    description: 'Pick one option from a custom dropdown list.',
    label: 'Dropdown',
    value: 'select',
  },
  {
    description: 'Multi-line input for longer responses.',
    label: 'Text Area',
    value: 'textarea',
  },
]
