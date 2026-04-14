import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FormField, FormFieldType } from '../types.ts'

type FormBuilderStore = {
  fields: FormField[]
  selectedFieldId: string | null
  addField: (type?: FormFieldType) => void
  addFieldAt: (type: FormFieldType, index: number) => void
  removeField: (fieldId: string) => void
  selectField: (fieldId: string | null) => void
  updateField: (
    fieldId: string,
    patch: Partial<Pick<FormField, 'label' | 'placeholder' | 'type' | 'options'>>,
  ) => void
}

function createEmptyField(type: FormFieldType = 'text'): FormField {
  const label =
    type === 'textarea'
      ? 'Untitled textarea'
      : type === 'select'
        ? 'Untitled dropdown'
        : 'Untitled text field'

  return {
    id: crypto.randomUUID(),
    label,
    placeholder: 'Add a helpful placeholder',
    type,
    options: type === 'select' ? ['Option 1', 'Option 2'] : [],
  }
}

function normalizeFieldType(type: FormFieldType, currentOptions: string[]) {
  return type === 'select' ? currentOptions : []
}

export const useFormBuilderStore = create<FormBuilderStore>()(
  persist(
    (set) => ({
      fields: [],
      selectedFieldId: null,
      addField: (type = 'text') => {
        const nextField = createEmptyField(type)

        set((state) => ({
          fields: [...state.fields, nextField],
          selectedFieldId: nextField.id,
        }))
      },
      addFieldAt: (type, index) => {
        const nextField = createEmptyField(type)

        set((state) => {
          const safeIndex = Math.max(0, Math.min(index, state.fields.length))

          return {
            fields: [
              ...state.fields.slice(0, safeIndex),
              nextField,
              ...state.fields.slice(safeIndex),
            ],
            selectedFieldId: nextField.id,
          }
        })
      },
      removeField: (fieldId) => {
        set((state) => ({
          fields: state.fields.filter((field) => field.id !== fieldId),
          selectedFieldId:
            state.selectedFieldId === fieldId ? null : state.selectedFieldId,
        }))
      },
      selectField: (fieldId) => {
        set({ selectedFieldId: fieldId })
      },
      updateField: (fieldId, patch) => {
        set((state) => ({
          fields: state.fields.map((field) => {
            if (field.id !== fieldId) {
              return field
            }

            const nextType = patch.type ?? field.type

            return {
              ...field,
              ...patch,
              type: nextType,
              options: normalizeFieldType(nextType, patch.options ?? field.options),
            }
          }),
        }))
      },
    }),
    {
      name: 'dynamic-form-builder-store',
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as Partial<FormBuilderStore> | undefined

        return {
          fields:
            state?.fields?.map((field) => ({
              id: field.id ?? crypto.randomUUID(),
              label: field.label ?? 'Untitled field',
              placeholder:
                'placeholder' in field && typeof field.placeholder === 'string'
                  ? field.placeholder
                  : 'Add a helpful placeholder',
              type: field.type ?? 'text',
              options: Array.isArray(field.options) ? field.options : [],
            })) ?? [],
          selectedFieldId: null,
        }
      },
    },
  ),
)
